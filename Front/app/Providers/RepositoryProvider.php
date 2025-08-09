<?php

namespace App\Providers;

use App\Models\Feature;
use App\Repositories\Contracts\FeatureRepositoryInterface;
use App\Repositories\Contracts\RatingRepositoryInterface;
use App\Repositories\Contracts\ReportRatingRepositoryInterface;
use App\Repositories\Contracts\SubscriptionRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\FeatureRepository;
use App\Repositories\RatingRepository;
use App\Repositories\ReportRatingRepository;
use App\Repositories\SubscriptionRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(
            UserRepositoryInterface::class,
            UserRepository::class
        );
        $this->app->singleton(
            RatingRepositoryInterface::class,
            RatingRepository::class
        );
        $this->app->singleton(
            ReportRatingRepositoryInterface::class,
            ReportRatingRepository::class
        );
        $this->app->singleton(
            SubscriptionRepositoryInterface::class,
            SubscriptionRepository::class
        );
        $this->app->singleton(
            FeatureRepositoryInterface::class,
            FeatureRepository::class
        );
        $this->app->singleton(
            \App\Repositories\Contracts\ConnectionRepositoryInterface::class,
            \App\Repositories\ConnectionRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
