<?php

namespace App\Actions\connections;

use App\Enums\ConnectionTypeEnum;
use App\Enums\UserTypeEnum;
use App\Http\Requests\UpdateConnectionRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\Contracts\ConnectionRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use Dba\Connection;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\DB;

class UpdateConnectionAction
{
    public function __construct(
        protected readonly ConnectionRepositoryInterface $connectionRepository,
        protected readonly UserRepositoryInterface $userRepository
    ) {
    }

    public function execute(UpdateConnectionRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $connection = $this->connectionRepository->findById($id);

            $driver = $this->userRepository->getById($connection->driver_id);

            $driver->update([
                'status' => 1,
            ]);
            
            $data = [
                'status' => $request->input('status', $connection->status),
            ];

            if($request->status !== $connection->status){
                $data['driver_seen'] = 0;
                $data['dispatcher_seen'] = 0;
            }

            if($request->column && $request->has('seen_value')){
                $data[$request->column] = $request->input('seen_value');
            }

            if($request->status === ConnectionTypeEnum::FinishPending->value){
                $data['finish_requester_id'] = $request->user()->id;
            }

            if($request->status === ConnectionTypeEnum::Finished->value && $connection->finish_requester_id === $request->user()->id){
                return throw new \Exception('You cannot finish this connection as you are the requester.');
            }

            $connection->update($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e; 
        }
        
    }
}
