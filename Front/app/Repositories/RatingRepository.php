<?php

namespace App\Repositories;

use App\Http\Requests\ShowRatingRequest;
use App\Models\Rating;
use App\Repositories\Contracts\RatingRepositoryInterface;
use App\Services\RatingService;

class RatingRepository implements RatingRepositoryInterface
{

    public function __construct(
        protected readonly RatingService $ratingService
    ){}

    public function findById(int $id)
    {
        return Rating::query()->find($id);
    }

    public function deleteRating(int $id)
    {
        $rating = $this->findById($id);
        $user = $this->findById($id)->userTo;

        $rating->delete();

        $this->ratingService->updateUserRating($user);
    }
}
