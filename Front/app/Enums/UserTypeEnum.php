<?php

namespace App\Enums;

enum UserTypeEnum :int
{
    case DRIVER = 0;

    case DISPATCHER = 1;

    case ADMIN = 2;
}
