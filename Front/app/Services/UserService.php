<?php

namespace App\Services;

use App\Actions\Users\UpdateUserAction;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Mail\EmailVerification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

readonly class UserService
{
    public function __construct(
        protected AvatarService $avatarService,
    ){}

    public function updateUser(UpdateUserAction $updateUserAction, UpdateUserRequest $request): void
    {
        $user = $request->user();
        $validated = $request->validated();


        if ($request->avatar && is_file($request->avatar)) {
            if (is_file(public_path() . '/storage/' . $user->avatar)) {
                unlink(public_path() . '/storage/' . $user->avatar);
            }

            $validated['avatar'] = $this->avatarService->uploadImage($request, '/avatars', 'avatar');
        }

        if ($request->email !== $user->email) {
            $validated['last_email'] = $user->email;
            $validated['verified'] = false;
            $newCode = Str::random(6);
            $validated['verify_code'] = $newCode;

            Mail::to($request->email)->send(new EmailVerification($user, $newCode));
        }

        $updateUserAction->execute($validated, $request);
    }
}
