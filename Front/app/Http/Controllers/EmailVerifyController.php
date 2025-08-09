<?php

namespace App\Http\Controllers;

use Error;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;

class EmailVerifyController extends Controller
{
    public function emailVerify(Request $request)
    {
        if($request->verify_code === $request->user()->verify_code){
            $request->user()->markEmailAsVerified();
            $request->user()->update(['verified' => true]);
            return response()->noContent(201);
        }

        throw new Error('კოდი არასწორია');
    }
}
