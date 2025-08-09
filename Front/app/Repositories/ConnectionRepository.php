<?php

namespace App\Repositories;

use App\Enums\ConnectionTypeEnum;
use App\Models\Connection;
use App\Repositories\Contracts\ConnectionRepositoryInterface;

class ConnectionRepository implements ConnectionRepositoryInterface
{
    public function getAll()
    {
        return request()->user()->connections
            ->sortByDesc('updated_at')
            // ->where('status', '!=', ConnectionTypeEnum::Finished->value)
            ->values();
    }

    public function findById($id)
    {
        return Connection::query()->find($id);
    }

    public function getLatest()
    {
        return request()->user()->connections
            ->sortByDesc('id')
            ->first();
    }
}
