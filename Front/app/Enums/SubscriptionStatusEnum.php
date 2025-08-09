<?php

namespace App\Enums;

enum SubscriptionStatusEnum :int
{
    case CENCELED = 0;

    case PENDING = 1;

    case APPROVED = 2;
}
