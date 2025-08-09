<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConnectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'driver_id' => $this->resource->driver_id,
            'dispatcher_id' => $this->resource->dispatcher_id,
            'sender_id' => $this->resource->sender_id,
            'finish_requester_id' => $this->resource->finish_requester_id,
            'status' => $this->resource->status,
            'driver_seen' => $this->resource->driver_seen,
            'dispatcher_seen' => $this->resource->dispatcher_seen,
            'driver' => new UserIndexResource($this->resource->driver, false),
            'dispatcher' => new UserIndexResource($this->resource->dispatcher, false),
        ];
    }
}
