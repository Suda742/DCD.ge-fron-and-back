<?php

namespace App\Services;

use Illuminate\Support\Str;

class RandomNumberService
{
    public function getNumber()
    {
        return Str::random(6);
    }
}
