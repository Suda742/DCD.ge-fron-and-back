<?php

namespace App\Http\Controllers;

use App\Actions\Ratings\StoreRatingAction;
use App\Http\Requests\DeleteTrainingRequest;
use App\Http\Requests\ShowRatingRequest;
use App\Http\Requests\StoreRatingRequest;
use App\Repositories\Contracts\RatingRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function __construct(
        protected RatingRepositoryInterface $ratingRepository,
    ){}

    public function store(StoreRatingRequest $request, StoreRatingAction $storeRatingAction): JsonResponse
    {
        $storeRatingAction->execute($request);

        return response()->json([], 201);
    }

    public function destroy($id)
    {
        $this->ratingRepository->deleteRating($id);

        return response()->noContent();
    }
}
