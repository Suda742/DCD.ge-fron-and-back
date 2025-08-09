<?php
declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CurrencyService
{
    public function getExchangeRate($price): float
    {
        $response = Http::get('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json');

        $rates = $response->json();
        $usdRate = collect($rates[0]['currencies'])->firstWhere('code', 'USD')['rate'];

        return $price * $usdRate;
    }
}