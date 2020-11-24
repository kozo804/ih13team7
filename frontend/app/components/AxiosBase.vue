<script>
import axiosBase from "axios";

/**
 * バックエンドへアクセスする際の共通処理
 * 送信先やhttpヘッダなどを定義
 */
export default {
  name: "AxiosBase",
  methods: {
    axiosBase: function () {
      return axiosBase.create({
        baseURL: "http://localhost:9000", // バックエンドB のURL:port を指定する
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        responseType: "json",
        // withCredentials: true
      });
    },
  },
};
</script>