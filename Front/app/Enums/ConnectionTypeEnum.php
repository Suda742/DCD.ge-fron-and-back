<?php

namespace App\Enums;

enum ConnectionTypeEnum :int
{
    case Rejected = 0;

    case Pending = 1;

    case Accepted = 2;

    case FinishPending = 3;
    
    case Finished = 4;
}
