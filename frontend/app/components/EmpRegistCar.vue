<template>
  <article>
    <Header></Header>
    <div class="car_info">
      <form action="" method="post">
        <section class="input_area">
          <h2>車両情報</h2>
          <table class="car_name">
            <tr>
              <td>メーカー名</td>
              <td><input type="text" name="" value="" /></td>
              <td>車名</td>
              <td><input type="text" name="" value="" /></td>
            </tr>
            <tr>
              <td>グレード</td>
              <td><input type="text" name="" value="" /></td>
              <td>形状</td>
              <td><input type="text" name="" value="" /></td>
            </tr>
          </table>
          <table class="car_detail">
            <tr>
              <td>登録年式</td>
              <td><input type="text" name="" value="" /></td>
              <td>モデル年式</td>
              <td><input type="text" name="" value="" /></td>
              <td>車検</td>
              <td><input type="text" name="" value="" /></td>
            </tr>
            <tr>
              <td>型式</td>
              <td><input type="text" name="" value="" /></td>
              <td>ミッション</td>
              <td><input type="text" name="" value="" /></td>
              <td>燃料</td>
              <td><input type="text" name="" value="" /></td>
            </tr>
            <tr>
              <td>外装色</td>
              <td><input type="text" name="" value="" /></td>
              <td>内装色</td>
              <td><input type="text" name="" value="" /></td>
              <td>排気量</td>
              <td><input type="number" />c.c.</td>
            </tr>
            <tr>
              <td>走行距離</td>
              <td><input type="number" />km</td>
              <td>車歴</td>
              <td><input type="number" name="" value="" /></td>
              <td>車台番号</td>
              <td><input type="text" name="" value="" /></td>
            </tr>
            <tr>
              <td>NOX</td>
              <td><input type="number" name="" value="" /></td>
              <td>所有者歴</td>
              <td><input type="text" name="" value="" /></td>
            </tr>
          </table>

          <h2>車両詳細</h2>
          <table class="car_detail">
            <tr>
              <td>ドア数</td>
              <td><input type="number" name="" value="" /></td>
              <td>乗車定員</td>
              <td><input type="number" name="" value="" /></td>
              <td>ハンドル</td>
              <td><input type="number" name="" value="" /></td>
            </tr>
            <tr>
              <td>メーター交換歴</td>
              <td><input type="number" name="" value="" /></td>
              <td>色替</td>
              <td><input type="number" name="" value="" /></td>
              <td>室内シート</td>
              <td><input type="number" name="" value="" /></td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: right; padding-right: 10px">
                リサイクル料金受託済み金額
              </td>
              <td colspan="2"><input type="number" name="" value="" />円</td>
            </tr>
          </table>

          <h2>装備品</h2>
          <table class="car_equip">
            <tr>
              <td>エアコン</td>
              <td><input type="number" name="" value="" /></td>
              <td>パワーウィンドウ</td>
              <td><input type="number" name="" value="" /></td>
              <td>パワステ</td>
              <td><input type="number" name="" value="" /></td>
              <td>サンルーフ</td>
              <td><input type="number" name="" value="" /></td>
            </tr>
            <tr>
              <td>本革シート</td>
              <td><input type="number" name="" value="" /></td>
              <td>エアバッグ</td>
              <td><input type="number" name="" value="" /></td>
              <td>純正アルミホイール</td>
              <td><input type="number" name="" value="" /></td>
              <td>ナビゲーション</td>
              <td><input type="number" name="" value="" /></td>
            </tr>
            <tr>
              <td>新車保証書</td>
              <td><input type="number" name="" value="" /></td>
              <td>取扱説明書</td>
              <td><input type="number" name="" value="" /></td>
            </tr>
          </table>
          <h2>備考</h2>
          <div class="price_area">
            <table class="price_area">
              <tr>
                <td>オークション<span>希望</span>価格</td>
                <td><input type="number" name="" value="" />000円</td>
                <td>オークション<span>スタート</span>価格</td>
                <td><input type="number" name="" value="" />000円</td>
              </tr>
            </table>
            <table class="point_area">
              <tr>
                <td>評価点 <input type="number" name="" value="" />点</td>
                <td>内装点 <input type="number" name="" value="" />点</td>
                <td>外装点 <input type="number" name="" value="" />点</td>
              </tr>
            </table>
          </div>

          <div class="text_container">
            <div class="text_area">
              <p>注意事項</p>
              <textarea name="" id="" cols="80" rows="8"></textarea>
            </div>
            <div class="text_area">
              <p>セールスポイント</p>
              <textarea name="" id="" cols="80" rows="8"></textarea>
            </div>
          </div>
          <div class="text_container">
            <div class="text_area">
              <p>検査員記入欄</p>
              <textarea name="" id="" cols="80" rows="8"></textarea>
            </div>
            <div class="text_area">
              <p>コメント</p>
              <textarea name="" id="" cols="80" rows="8"></textarea>
            </div>
          </div>
        </section>
        <section class="image_area">
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
          <p><input type="file" /></p>
        </section>
      </form>
    </div>
    <Footer></Footer>
  </article>
</template>

<style lang="scss" scoped>
$input_area-input_width: 70%;
$input_border: solid #d6d6d6 2px;
article {
  width: 100%;
  border: 1px solid #000;
}

h2 {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: solid #000000 1px;
}

.image_area,
.input_area {
  width: 80%;
  margin: 0 auto;
}

.image_area {
  display: flex;
  flex-wrap: wrap;
  p {
    width: 33.3%;
  }
}

.input_area {
  $tr_height: 32px;
  table {
    width: 100%;
    margin-bottom: 16px;
  }
  tr {
    height: $tr_height;
    line-height: $tr_height;
  }
  td {
    height: $tr_height;
    padding: 8px 0;
    // border: solid #000000 1px;
  }
  input {
    width: 90%;
    height: $tr_height;
    font-size: 1.2rem;
    text-align: right;
    border: $input_border;
    border-radius: 8px;
  }
}

.car_name {
  td:nth-child(odd) {
    width: 15%;
    text-align: center;
  }
  td:nth-child(even) {
    width: 35%;
  }
}

.car_detail {
  td:nth-child(odd) {
    width: 11.1%;
    text-align: center;
  }
  td:nth-child(even) {
    width: 22.2%;
  }
}

.car_equip {
  td {
    width: 10%;
    text-align: center;
  }
}

.text_container {
  padding: 8px;
  display: flex;
  justify-content: space-between;
}

.text_area {
  width: 48%;
  p {
    padding-bottom: 4px;
  }
  textarea {
    width: 100%;
    padding: 4px;
    border: $input_border;
    border-radius: 8px;
  }
}

.price_area {
  text-align: center;
  td:nth-child(odd) {
    width: 20%;
    text-align: center;
  }
  td:nth-child(even) {
    width: 30%;
  }
  input {
    width: 80%;
    border: $input_border;
    border-radius: 8px;
  }
  span {
    color: brown;
    font-weight: 700;
  }
}

.point_area {
  td {
    width: 16.6% !important;
  }
}
</style>

<script>
import Header from "./EmpHeader";
import Footer from "./EmpFooter";

export default {
  data() {
    return {
      values: [],
    };
  },
  mounted() {
    const axiosBase = this.axiosBase();
    axiosBase
      .get("/")
      .then((response) => {
        this.values = response.data.values;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error");
        }
      });
  },
  components: {
    Header,
    Footer,
  },
};
</script>