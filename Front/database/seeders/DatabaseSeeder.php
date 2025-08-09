<?php

namespace Database\Seeders;

use App\Enums\UserTypeEnum;
use App\Models\Feature;
use App\Models\Features;
use App\Models\Subscription;
use App\Models\SubscriptionFeature;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $subscription =Subscription::create([
            'name' => 'საწყისი',
            'description' => 'ტესტ',
            'price' => 1499,
        ]);

        $feature1 = Feature::create([
            'name' => 'ვებსაიტის გამოყენება',
        ]);

        $feature2 = Feature::create([
            'name' => 'მძღოლის ან დისპეტჩერის ძებნა',
        ]);

        $feature3 = Feature::create([
            'name' => 'შეფასებების დაწერა და მიღება',
        ]);

        $feature4 = Feature::create([
            'name' => 'დაქონექთება მძღოლთან/დისპეჩერთან',
        ]);

        $subscription->features()->attach($feature1->id);
        $subscription->features()->attach($feature2->id);
        $subscription->features()->attach($feature3->id);
        $subscription->features()->attach($feature4->id);
        
        User::factory()->create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'email' => 'admin@gmail.com',
            'phone' => 123123123,
            'type' => UserTypeEnum::ADMIN->value,
            'verify_code' => 123,
            'verified' => true,
            'password' => Hash::make(1),
        ]);

        User::factory()->create([
            'first_name' => 'user',
            'last_name' => 'user',
            'email' => 'user@gmail.com',
            'phone' => 123123124,
            'type' => UserTypeEnum::DISPATCHER->value,
            'verify_code' => 123,
            'verified' => true,
            'password' => Hash::make(1),
        ]);

        User::factory(20)->create();
    }
}
