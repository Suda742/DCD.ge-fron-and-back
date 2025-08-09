<?php

namespace App\Repositories;

use App\Http\Requests\ShowRatingRequest;
use App\Models\Feature;
use App\Models\Rating;
use App\Repositories\Contracts\FeatureRepositoryInterface;
use App\Repositories\Contracts\RatingRepositoryInterface;
use App\Services\RatingService;

class FeatureRepository implements FeatureRepositoryInterface
{
    public function getAll()
    {
        return Feature::all();
    }
}
