<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    protected $table = 'connections';

    protected $fillable = [
        'driver_id',
        'dispatcher_id',
        'sender_id',
        'status',
        'driver_seen',
        'dispatcher_seen',
        'finish_requester_id',
    ];

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id', 'id');
    }

    public function dispatcher()
    {
        return $this->belongsTo(User::class, 'dispatcher_id', 'id');
    }

}
