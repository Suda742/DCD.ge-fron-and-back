<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('subscription_id')->index();
            $table->string('order_id');
            $table->integer('status')->default(0);
            $table->integer('price')->nullable();
            $table->string('currency')->default('USD');
            
            $table->timestamps();

            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->cascadeOnDelete();

            $table->foreign('subscription_id')
            ->references('id')
            ->on('subscriptions')
            ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_subscriptions');
    }
};
