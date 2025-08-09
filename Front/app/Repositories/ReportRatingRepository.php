<?php

namespace App\Repositories;

use App\Models\ReportRating;
use App\Repositories\Contracts\ReportRatingRepositoryInterface;

class ReportRatingRepository implements ReportRatingRepositoryInterface
{

    public function getAll()
    {
        return ReportRating::query()->orderBy('id', 'DESC')->get();
    }

    public function findById(int $id)
    {
        return ReportRating::query()->find($id);
    }
}
