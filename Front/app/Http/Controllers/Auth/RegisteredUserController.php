<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Mail\EmailVerification;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;



class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request)
    {
        DB::beginTransaction();
        /** @var User $user */
        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type' => $request->type,
                'verify_code' => Str::random(6),
            ]);

            Mail::to($user->email)->send(new EmailVerification($user));

            event(new Registered($user));
            Auth::login($user);
            $token = $user->createToken('main')->plainTextToken;
            DB::commit();

            return response()->json(['token' => $token, 'user' => $user]);
        } catch(\Exception $e){
            DB::rollBack();
            return response()->json($e->getMessage());
        }
    }
}
