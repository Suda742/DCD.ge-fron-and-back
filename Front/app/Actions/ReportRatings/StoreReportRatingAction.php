<?php

namespace App\Actions\ReportRatings;

use App\Http\Requests\StoreReportRatingRequest;
use App\Models\ReportRating;

class StoreReportRatingAction
{
    public function execute(StoreReportRatingRequest $request): void
    {
        ReportRating::create([
            'rating_id' => $request->rating_id,
            'reason' => $request->reason,
            'status' => 1,
        ]);
    }
}
