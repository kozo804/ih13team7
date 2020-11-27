import axios from "axios";

/**
 * バックエンドへアクセスする際の共通処理
 * 送信先やhttpヘッダなどを定義
 */
export default {
  methods: {
    axiosBase: function () {
      return axios.create({
        baseURL: "http://localhost:9000", // バックエンドのURL:port を指定する
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        responseType: "json",
        // withCredentials: true
      });
    }
  }
}
