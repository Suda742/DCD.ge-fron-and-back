<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function store(RegisterRequest $request)
    {

        /** @var User $user */
        $user = User::create($request->validated());

        $token = $user->createToken('main')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }
}
