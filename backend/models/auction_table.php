<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuctionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auction', function (Blueprint $table) {
            $table->integer('id')->comment('id')->autoIncrement();
            $table->string('auction_name')->comment('オークション名');
            $table->dateTime('start_time')->comment('開催時間');
            $table->dateTime('end_time')->comment('終了時間');
            $table->integer('rep_id')->comment('担当者id')->nullable();
            $table->integer('vehicle_count')->comment('車両台数')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auction');
    }
}
