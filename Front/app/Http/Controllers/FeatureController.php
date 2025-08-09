<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Repositories\Contracts\FeatureRepositoryInterface;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    public function __construct(
        protected readonly FeatureRepositoryInterface $featureRepository
    ){}

    public function index()
    {
        return FeatureResource::collection($this->featureRepository->getAll());
    }
}
