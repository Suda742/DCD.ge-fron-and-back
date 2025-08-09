<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RatingResource extends JsonResource
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
            'userTo' => $this->resource->userTo,
            'userFrom' => $this->resource->userFrom,
            'score' => $this->resource->score,
            'comment' => $this->resource->comment,
            'report_rating' => $this->resource->ratingReport
        ];
    }
}
