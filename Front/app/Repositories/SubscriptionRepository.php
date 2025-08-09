<?php

namespace App\Repositories;

use App\Models\Subscription;
use App\Repositories\Contracts\SubscriptionRepositoryInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SubscriptionRepository implements SubscriptionRepositoryInterface
{

    public function getAll()
    {
        return Subscription::all();
    }

    public function findById(int $id)
    {
        return Subscription::query()->find($id);
    }
}
