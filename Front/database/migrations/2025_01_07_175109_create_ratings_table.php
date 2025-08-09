<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_to')->index();
            $table->unsignedBigInteger('user_from')->index();
            $table->integer('score');
            $table->text('comment');
            $table->timestamps();

            $table->foreign('user_to')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('user_from')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
