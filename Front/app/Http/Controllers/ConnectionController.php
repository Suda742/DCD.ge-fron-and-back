<?php

namespace App\Http\Controllers;

use App\Actions\connections\StoreConnectionAction;
use App\Actions\connections\UpdateConnectionAction;
use App\Enums\ConnectionTypeEnum;
use App\Http\Requests\StoreConnectionRequest;
use App\Http\Requests\UpdateConnectionRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\ConnectionResource;
use App\Repositories\Contracts\ConnectionRepositoryInterface;

class ConnectionController extends Controller
{
    public function __construct(
        protected readonly ConnectionRepositoryInterface $connectionRepository
    ) {}

    public function index()
    {
        return ConnectionResource::collection(
            $this->connectionRepository->getAll()
        );
    }

    public function store(StoreConnectionAction $storeConnectionAction,StoreConnectionRequest $request)
    {
        $storeConnectionAction->execute($request);

        return response()->json(['message' => 'Connection request sent successfully.'], 201);
    }

    public function update(UpdateConnectionAction $updateConnectionAction, UpdateConnectionRequest $request, $id)
    {
        $updateConnectionAction->execute($request, $id);

        return response()->json(['data' => new ConnectionResource($this->connectionRepository->findById($id))]);
    }
}
