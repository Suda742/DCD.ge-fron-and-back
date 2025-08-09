<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table = 'subscriptions';
    
    protected $fillable = [
        'name', 
        'description', 
        'price',
    ];

    public function features(){
        return $this->belongsToMany(Feature::class, 'subscription_features', 'subscription_id', 'feature_id');
    }
}
