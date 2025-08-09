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
        Schema::create('report_ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('rating_id');
            $table->string('reason');
            $table->integer('status');
            $table->timestamps();

            $table->foreign('rating_id')
            ->references('id')
            ->on('ratings')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_ratings');
    }
};
