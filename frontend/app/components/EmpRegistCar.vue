<template>
  <div>
    <Header></Header>
    <p>車両登録</p>
    <Footer></Footer>
  </div>
</template>

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