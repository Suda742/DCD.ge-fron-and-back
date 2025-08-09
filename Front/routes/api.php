<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\EmailVerifyController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReportRatingController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserIndexResource;
use App\Http\Resources\UserShowResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return UserShowResource::make($request->user());
});

require __DIR__.'/auth.php';

Route::middleware('auth:sanctum')->group(function(){
    Route::post('email-verify', [EmailVerifyController::class, 'emailVerify']);

    Route::patch('update/user', [UserController::class, 'update']);
    Route::patch('update/user/password', [UserController::class, 'updatePassword']);

    Route::controller(UserController::class)->middleware(['payment_access'])->group(function(){
        Route::get('/users', 'index');
        Route::get('/users/limited/{type}', 'getLimitedUsers');
        Route::get('/user/{id}', 'show');
    });

    Route::controller(RatingController::class)->middleware(['payment_access'])->group(function(){
        Route::post('/ratings/store', 'store');
        Route::delete('/rating/delete/{id}', 'destroy');
    });

    Route::controller(ReportRatingController::class)->group(function() {
        Route::get('/reports', 'index');
        Route::post('/report/store', 'store');
        Route::patch('/report/update', 'updateStatus');
    });

    Route::controller(SubscriptionController::class)->group(function() {
        Route::get('/subscriptions', 'index')->withoutMiddleware(['auth:sanctum']);
        Route::get('/subscription/{id}', 'show');
        Route::post('/checkout/url', 'getCheckoutUrl');
        Route::get('/check/user/status', 'checkStatus');
    });

    Route::controller(ConnectionController::class)->group(function() {
        Route::get('/auth/connections', 'index');
        Route::post('/connection/store', 'store');
        Route::patch('/connection/update/{id}', 'update');
    });

    Route::get('/features', [FeatureController::class, 'index'])->withoutMiddleware(['auth:sanctum']);
});




