<?php

namespace App\Http\Controllers;

use App\Enums\SubscriptionStatusEnum;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;
use App\Models\User;
use App\Repositories\Contracts\SubscriptionRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\CurrencyService;
use App\Services\FlittService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SubscriptionController extends Controller
{
    public function __construct(
        protected readonly SubscriptionRepositoryInterface $subscriptionRepository,
        protected readonly UserRepositoryInterface $userRepository,
        protected readonly FlittService $flittService,
        protected readonly CurrencyService $currencyService
    ){}

    public function index(){
        return SubscriptionResource::collection($this->subscriptionRepository->getAll());
    }

    public function show(int $id){
        return SubscriptionResource::make($this->subscriptionRepository->findById($id));
    }

    public function getCheckoutUrl(Request $request)
    {   
        if ($request->user()->subscriptions->last() && $request->user()->subscriptions->last()->status === SubscriptionStatusEnum::APPROVED->value) {
            return response()->json(['message' => 'You already have an active subscription.'], 400);
        }

        DB::beginTransaction();
        try {
            $subscription = $this->subscriptionRepository->findById($request->subscription_id);
            $orderId = str_replace(' ', '_', "Order_" . $request->user()->created_at .'_'. time());
            $merchantId = env('MERCHANT_ID_' . strtoupper($request->currency));

            $price = $request->currency === 'GEL' ? (int)$this->currencyService->getExchangeRate($subscription->price) : $subscription->price;

            $data = [
                'response_url' => env('FRONTEND_URL'). '/payment/status',
                'order_id' => $orderId,
                'currency' => $request->currency,
                'merchant_id' => $merchantId,
                'order_desc' => $subscription->name,
                'amount' => $price,
            ];

            $response = $this->flittService->getData($data, $request->currency, 'https://pay.flitt.com/api/checkout/url', 'post');

            $request->user()->subscriptions()->create([
                'subscription_id' => $subscription->id,
                'order_id' => $orderId,
                'status' => SubscriptionStatusEnum::PENDING->value,
                'price' => $price,
                'currency' => $request->currency,
            ]);

            DB::commit();
            return response($response);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating subscription: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create subscription'], 500);
        }

    }

    public function checkStatus(Request $request)
    {
        $user = $this->userRepository->getById($request->user()->id);
        $lastSubscription = $user->subscriptions->last();

        $lastMerchant = env('MERCHANT_ID_' . strtoupper($lastSubscription->currency));

        $data = [
            "order_id"=> $lastSubscription->order_id,
            "merchant_id"=> $lastMerchant,
        ];

        $response =  $this->flittService->getData($data, $lastSubscription->currency, 'https://pay.flitt.com/api/status/order_id', 'post');

        $lastSubscription = $user->subscriptions()->orderByDesc('id')->first();

        if (!$lastSubscription) {
            return response()->json(['status' => 'not_found', 'message' => 'No subscription found for this user.'], 404);
        }

        $status = null;

        $orderStatus = $response['response']['order_status'] ?? null;

        if ($orderStatus === 'approved') {
            $lastSubscription->update([
                'status' => SubscriptionStatusEnum::APPROVED->value
            ]);
            $status = 'success';
        } else {
            $lastSubscription->update([
                'status' => SubscriptionStatusEnum::CENCELED->value
            ]);
            $status = 'failed';
        }

        return response(['status' => $status, 'message' => 'Subscription status updated successfully.']);
    }
}
