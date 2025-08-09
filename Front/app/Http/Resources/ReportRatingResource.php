<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportRatingResource extends JsonResource
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
            'rating_id' => $this->resource->rating_id,
            'reason' => $this->resource->reason,
            'status' => $this->resource->status,
            'rating' => RatingResource::make($this->resource->rating),
        ];
    }
}
