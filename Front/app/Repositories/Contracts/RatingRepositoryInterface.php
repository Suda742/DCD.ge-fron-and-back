<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Http\Requests\ShowRatingRequest;
use App\Models\Rating;

interface RatingRepositoryInterface
{
    public function findById(int $id);

    public function deleteRating(int $id);
}
