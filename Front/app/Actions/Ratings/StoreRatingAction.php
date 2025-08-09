<?php

namespace App\Actions\Ratings;

use App\Http\Requests\StoreRatingRequest;
use App\Models\Rating;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\RatingService;

class StoreRatingAction
{
    public function __construct(
        protected readonly UserRepositoryInterface $userRepository,
        protected readonly RatingService $ratingService,
    ){}

    public function execute(StoreRatingRequest $request)
    {
        $userTo = $this->userRepository->getById($request->user_to);

        $userTo->rating()->create([
            'user_from' => $request->user()->id,
            'score' => $request->score,
            'comment' => $request->comment,
        ]);

        $this->ratingService->updateUserRating($userTo);
    }
}
