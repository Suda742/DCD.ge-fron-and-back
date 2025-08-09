<?php

namespace App\Http\Controllers;

use App\Actions\Users\UpdateUserAction;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserIndexResource;
use App\Http\Resources\UserShowResource;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\RatingService;
use App\Services\UserService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function __construct(
        protected readonly UserRepositoryInterface $userRepository,
        protected readonly UserService $userService,
        protected readonly RatingService $ratingService,
    ){}

    public function index(): AnonymousResourceCollection
    {
        return UserIndexResource::collection($this->userRepository->getAll());
    }

    public function show($id): UserShowResource
    {

        return UserShowResource::make($this->userRepository->getById($id), $this->ratingService);
    }

    public function getLimitedUsers($type): AnonymousResourceCollection
    {
        return UserIndexResource::collection($this->userRepository->getLimitedByPosition($type));
    }

    public function update(UpdateUserAction $updateUserAction, UpdateUserRequest $request): Response
    {
        $this->userService->updateUser($updateUserAction, $request);

        return response()->noContent();
    }
}
