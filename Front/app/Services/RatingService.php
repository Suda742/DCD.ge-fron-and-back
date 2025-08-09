<?php

namespace App\Services;

class RatingService
{
    public function calculateRating($ratings){
        $result = 0;
        foreach($ratings as $rating){
            $result += $rating->score;
        }

        return $result / count($ratings);
    }

    public function updateUserRating($user){
        $scores = $user->rating()
        ->where(function ($query) {
            $query->whereDoesntHave('ratingReport')
            ->orWhereHas('ratingReport', function ($query) { 
              $query->where('status', '!=', 0);
          });
        })
        ->pluck('score')
        ->toArray();


        if (count($scores) > 0) {
            $user->update([
                'total_rating' => array_sum($scores) / count($scores),
            ]);
        } else {
            $user->update([
                'total_rating' => 0,
            ]);
        }
    }
}
