<template>
  <article>
    <Header></Header>
    <p>test</p>
    <Footer></Footer>
  </article>
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
  mounted() {
    console.log('ok');
  },
  components: {
    Header,
    Footer,
  },
};
</script>