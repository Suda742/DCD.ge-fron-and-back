<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

interface SubscriptionRepositoryInterface
{
    public function getAll();
    
    public function findById(int $id);

}
