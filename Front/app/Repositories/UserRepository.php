<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Container\Attributes\Auth;

class UserRepository implements UserRepositoryInterface
{

    public function getAll()
    {
        return User::query()
        ->whereHas('subscriptions', function ($q) {
            $q->where('status', 2);
        })->where('id', '!=', request()->user()->id)
        ->orderBy('total_rating', 'DESC')
        ->get();
    }

    public function getById($id)
    {
        return User::query()->findOrFail($id);
    }

    public function getLimitedByPosition($type)
    {
        return User::query()
        ->where('type', $type)
        ->where('id', '!=', request()->user()->id)
        ->whereHas('subscriptions', function ($q) {
            $q->where('status', 2);
        })
        // ->where(function ($query) {
        //     $query->where(function ($q) {
        //         $q->where('type', 0)
        //           ->where('status', 0);
        //     })
        //     ->orWhere('type', 1);
        // })
        ->orderBy('total_rating', 'desc')
        ->limit(10)
        ->get();
    }
}
