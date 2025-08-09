<?php

namespace App\Observers;

use App\Mail\EmailVerification;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class UserMailObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        Mail::to($user->email)->send(new EmailVerification($user));
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
