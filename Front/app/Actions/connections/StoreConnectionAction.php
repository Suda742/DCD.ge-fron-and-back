<?php

namespace App\Actions\connections;

use App\Enums\ConnectionTypeEnum;
use App\Http\Requests\StoreConnectionRequest;
use App\Models\Connection;

class StoreConnectionAction
{
    public function execute(StoreConnectionRequest $request)
    {
        $user = $request->user();
        $data = [
            'sender_id' => $user->id,
        ];
        
        if($user->type === 0){
            $data['driver_id'] = $user->id;
            $data['dispatcher_id'] = $request->receiver_id;
        } else {
            $data['driver_id'] = $request->receiver_id;
            $data['dispatcher_id'] = $user->id;
        }

        $existingConnection = Connection::query()
            ->where(function ($query) use ($data) {
                $query->where('driver_id', $data['driver_id'])
                    ->where('dispatcher_id', $data['dispatcher_id']);
            })->whereNotIn('status', [ConnectionTypeEnum::Finished->value, ConnectionTypeEnum::Rejected->value])
            ->orderByDesc('updated_at')
            ->first();

        if (!$existingConnection)
        {
            Connection::query()->create($data);
        }
    }
}
