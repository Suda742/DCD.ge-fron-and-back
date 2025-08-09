<?php

namespace App\Http\Middleware;

use App\Enums\SubscriptionStatusEnum;
use App\Enums\UserTypeEnum;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
    if ($request->user() && $request->user()->type === UserTypeEnum::ADMIN->value) {
        return $next($request);
    }

    if (
        !$request->user()->subscriptions->last() ||
        $request->user()->subscriptions->last()->status !== SubscriptionStatusEnum::APPROVED->value
    ) {
        return response()->json(['message' => 'You must be a subscribed user to access this resource.'], 403);
    }
        return $next($request);
    }
}
