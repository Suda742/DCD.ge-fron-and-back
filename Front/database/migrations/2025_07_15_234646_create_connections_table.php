<?php

use App\Enums\ConnectionTypeEnum;
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
        Schema::create('connections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('driver_id');
            $table->unsignedBigInteger('dispatcher_id');
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('finish_requester_id')->nullable();
            $table->integer('status')->default(ConnectionTypeEnum::Pending->value);
            $table->boolean('driver_seen')->default(0);
            $table->boolean('dispatcher_seen')->default(0);
            $table->timestamps();

            $table->foreign('driver_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('dispatcher_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('sender_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('finish_requester_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connections');
    }
};
