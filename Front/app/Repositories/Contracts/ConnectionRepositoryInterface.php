<?php

namespace App\Repositories\Contracts;

interface ConnectionRepositoryInterface
{
    public function getAll();

    public function getLatest();

    public function findById($id);
}
