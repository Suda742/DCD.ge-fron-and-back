<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Observers\UserMailObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Kra8\Snowflake\HasShortflakePrimary;


/**
 * @property-read integer $id
 * @property string $first_name
 * @property string $last_name
 * @property string $phone
 * @property string $email
 * @property string $password
 * @property integer $type
 * @property string $verify_code
 * @property string $experience
 * @property string $avatar
 * @property string $last_email
 * @property string $about
 * @property bool $verified
 * @property string $color
*/

class User extends Authenticatable
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'whatsapp',
        'email',
        'password',
        'type',
        'verify_code',
        'avatar',
        'last_email',
        'about',
        'verified',
        'color',
        'total_rating',
        'status',
    ];

    use HasFactory, Notifiable, HasApiTokens, HasShortflakePrimary;

    public function rating()
    {
        return $this->hasMany(Rating::class, 'user_to', 'id')->with('userFrom')->orderBy('id', 'desc');
    }

    public function subscriptions()
    {
        return $this->hasMany(UserSubscription::class, 'user_id', 'id');
    }

    public function connectionsAsDriver()
    {
        return $this->hasMany(Connection::class, 'driver_id', 'id')->orderBy('updated_at', 'desc');
    }

    public function connectionsAsDispatcher()
    {
        return $this->hasMany(Connection::class, 'dispatcher_id', 'id')->orderBy('updated_at', 'desc');
    }

    public function getConnectionsAttribute()
    {
        return $this->connectionsAsDriver->merge($this->connectionsAsDispatcher);
    }

    // public function connections()
    // {
    //     return $this->connectionsAsDriver->merge($this->connectionsAsDispatcher);
    // }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function totalRating(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value / 100,
            set: fn($value) => $value * 100,
        );
    }
}
