<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car', function (Blueprint $table) {
            $table->string('maker')->comment('メーカー名');
            $table->string('car_name')->comment('車名');
            $table->string('grade')->comment('グレード');
            $table->string('shape')->comment('形状');
            $table->string('registed_model_year')->comment('登録年式');
            $table->string('model_year')->comment('モデル年式');
            $table->string('inspection')->comment('車検')->nullable();
            $table->string('model')->comment('型式');
            $table->string('mission')->comment('ミッション');
            $table->string('fuel')->comment('燃料');
            $table->string('outer_color')->comment('外装色');
            $table->string('inner_color')->comment('内装色');
            $table->integer('engine_size')->comment('排気量');
            $table->integer('mileage')->comment('走行距離');
            $table->string('car_history')->comment('車歴');
            $table->string('undercarriage_number')->comment('車台番号');
            $table->string('NOX')->comment('NOX')->nullable();
            $table->string('owner')->comment('所有者歴');

            $table->number('door')->comment('ドア');
            $table->number('riding_capacity')->comment('乗車定員');
            $table->string('handle')->comment('ハンドル');
            $table->string('meter_exchange_history')->comment('メーター交換歴')->nullable();
            $table->string('color_change')->comment('色替')->nullable();
            $table->string('in_room_sheet')->comment('室内シート')->nullable();
            $table->number('recycleing_amount')->comment('リサイクル料金受託済み金額');
            $table->integer('air_conditioning')->comment('エアコン')->nullable();
            $table->integer('powor_window')->comment('パワーウィンドウ')->nullable();
            $table->integer('powor_steering')->comment('パワーステアリング')->nullable();
            $table->integer('sunroof')->comment('サンルーフ')->nullable();
            $table->integer('leather_seet')->comment('レザーシート')->nullable();
            $table->integer('airbag')->comment('エアバッグ')->nullable();
            $table->integer('aliminium_foil')->comment('純正アルミホイール')->nullable();
            $table->integer('navigation')->comment('ナビゲーション')->nullable();
            $table->integer('warranty')->comment('新車保証書有無')->default(0);
            $table->integer('guide')->comment('取扱説明書有無')->default(0);

            $table->integer('auction_desired_price')->comment('オークション希望価格')->nullable()->default(null);
            $table->integer('auction_start_price')->comment('オークションスタート価格')->nullable()->default(null);
            $table->string('considerations')->comment('注意事項')->nullable();
            $table->string('sales_point')->comment('セールポイント')->nullable();
            $table->string('entries_field')->comment('検査員記入欄')->nullable();
            $table->string('comment')->comment('コメント')->nullable();
            $table->string('evaluation_point')->comment('評価点')->nullable()->default(null);
            $table->string('interior_point')->comment('内装点')->nullable()->default(null);
            $table->string('exterior_point')->comment('外装点')->nullable()->default(null);
            // $table->string('shift_lever')->comment('シフトレバー')->nullable();
            // $table->integer('color_no')->comment('カラーNO');
            // $table->string('tag')->comment('タグ')->nullable()->default(null);
            // $table->integer('support')->comment('サポートフラグ')->nullable()->default(null);
            // ---------------------- 出品に関するカラム --------------------------------- 
            // $table->integer('auction_id')->comment('オークションid')->nullable()->default(null);
            // $table->string('listing_number')->comment('出品番号')->nullable()->default(null);
            // ---------------------- 落札に関するカラム --------------------------------- 
            // $table->integer('successful_bid_member_id')->comment('落札会員id')->nullable()->default(null);
            // $table->integer('hammer_price')->comment('落札価格')->nullable()->default(null);
            // $table->integer('payment_flg')->comment('入金フラグ')->default(0);
            // $table->integer('car_delivery_flg')->comment('納車フラグ')->default(0);
            // ---------------------- 制約 --------------------------------- 
            // $table->primary('model');
            // $table->foreign('auction_id')->references('id')->on('auction');
            // $table->foreign('successful_bid_member_id')->references('id')->on('member');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car');
    }
}
