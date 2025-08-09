<?php

namespace App\Actions\ReportRatings;

use App\Http\Requests\ChangeReportRatingRequest;
use App\Repositories\Contracts\ReportRatingRepositoryInterface;
use App\Services\RatingService;

class ChangeReportRatingStatusAction
{
    public function __construct(
        protected readonly ReportRatingRepositoryInterface $reportRatingRepository,
        protected readonly RatingService $ratingService,
    ){}

    public function execute(ChangeReportRatingRequest $request)
    {
        $report = $this->reportRatingRepository->findById($request->id);
        $report->update([
            'status' => $request->status,
        ]);

        $user = $report->rating->userTo;

        $this->ratingService->updateUserRating($user);

    }
}
