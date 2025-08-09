<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportRating extends Model
{
    protected $table = 'report_ratings';

    protected $fillable = [
        'rating_id', 
        'reason',
        'status'
    ];

    public function rating(){
        return $this->belongsTo(Rating::class, 'rating_id', 'id');
    }
}
