<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    protected $table = 'ratings';

    protected $fillable = [
        'user_to',
        'user_from',
        'score',
        'comment',
    ];

    public function userFrom(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_from', 'id');
    }

    public function userTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_to', 'id');
    }

    public function ratingReport()
    {
        return $this->hasOne(ReportRating::class, 'rating_id', 'id');
    }
}
