<?php

namespace App\Repositories\Contracts;

interface UserRepositoryInterface
{
    public function getAll();

    public function getById($id);

    public function getLimitedByPosition($type);
}
