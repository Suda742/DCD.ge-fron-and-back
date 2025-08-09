<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Services\RatingService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read User $resource
*/
class UserShowResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            $this->merge(UserIndexResource::make($this->resource)),
            'about' => $this->resource->about,
            'ratings' => RatingResource::collection(
                $this->resource->rating->filter(function ($rating) {
                    return !$rating->ratingReport || $rating->ratingReport->status != 0;
                })
            ),            
        ];
    }
}
