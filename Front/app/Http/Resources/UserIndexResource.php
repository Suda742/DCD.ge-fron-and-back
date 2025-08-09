<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Services\RatingService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * @property-read User $resource
*/
class UserIndexResource extends JsonResource
{

    protected $withConnections;

    public function __construct($resource, $withConnections = true)
    {
        parent::__construct($resource);
        $this->withConnections = $withConnections;
    }

    public function toArray(Request $request): array
    {

        $data = [
            'id' => $this->resource->id,
            'avatar' => $this->resource->avatar,
            'email' => $this->resource->email,
            'first_name' => $this->resource->first_name,
            'last_name' => $this->resource->last_name,
            'phone' => $this->resource->phone,
            'whatsapp' => $this->resource->whatsapp,
            'type' => $this->resource->type,
            'verified' => $this->resource->verified,
            'color' => $this->resource->color,
            'totalRating' => $this->resource->total_rating,
            'subscriptions' => $this->resource->subscriptions,
        ];

        if ($this->withConnections) {
            $data['connections'] = ConnectionResource::collection($this->connections);
        }

        return $data;
    }
}
