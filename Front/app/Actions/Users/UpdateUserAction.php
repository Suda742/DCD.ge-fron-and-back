<?php

namespace App\Actions\Users;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Log;


class UpdateUserAction
{
    public function execute($data, UpdateUserRequest $request): void
    {
        $request->user()->update([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'whatsapp' => $data['whatsapp'],
            'about' => $data['about'],
            'avatar' => $data['avatar'] ? $data['avatar'] : null,
        ]);
    }
}
