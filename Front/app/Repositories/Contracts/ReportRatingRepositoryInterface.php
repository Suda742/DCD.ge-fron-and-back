<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

interface ReportRatingRepositoryInterface
{
    public function getAll();

    public function findById(int $id);

}
