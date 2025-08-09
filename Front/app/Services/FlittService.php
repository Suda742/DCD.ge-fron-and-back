<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FlittService
{
    public function getData($data, $currency, $url, $method = 'post')
    {
        $paymentKey = env('MERCHANT_PAYMENT_KEY_' . strtoupper($currency));

        $signature = $this->getSignature($data, $paymentKey);
        $data['signature'] = $signature;

        $body = [
            'request' => $data
        ];

        $response = Http::withOptions([
            'verify' => false,
        ])->withHeaders([
            'Content-Type' => 'application/json',
        ])->{$method}($url, $body);

        return $response->json();
    }

    private function getSignature(array $data, string $secretKey): string
    {
        ksort($data);
        $parts = [$secretKey];
        foreach ($data as $value) {
            if ($value !== null && $value !== '') {
                $parts[] = $value;
            }
        }
        $signatureString = implode('|', $parts);
        return sha1($signatureString);
    }
}
