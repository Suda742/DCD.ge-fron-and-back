<?php

namespace App\Http\Controllers;

use App\Actions\ReportRatings\ChangeReportRatingStatusAction;
use App\Actions\ReportRatings\StoreReportRatingAction;
use App\Http\Requests\ChangeReportRatingRequest;
use App\Http\Requests\StoreReportRatingRequest;
use App\Http\Resources\ReportRatingResource;
use App\Repositories\Contracts\ReportRatingRepositoryInterface;
use Illuminate\Http\Request;

class ReportRatingController extends Controller
{
    public function __construct(
        protected readonly ReportRatingRepositoryInterface $repository
    ){}

    public function index()
    {
        return ReportRatingResource::collection($this->repository->getAll());
    }

    public function store(StoreReportRatingAction $storeReportRatingAction, StoreReportRatingRequest $request)
    {
        $storeReportRatingAction->execute($request);

        return response()->json([], 201);
    }

    public function updateStatus(ChangeReportRatingStatusAction $changeReportRatingStatus, ChangeReportRatingRequest $request)
    {
        $changeReportRatingStatus->execute($request);

        return response()->noContent();
    }

    
}
