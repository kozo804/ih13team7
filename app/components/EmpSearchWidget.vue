<template>
        <div>

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

form {
  width: 80%;
  margin: 0 auto;
}

button {
  width: 160px;
  height: 40px;
  border: none;
  background-color: #ddeaf6;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 700;
  display: block;
  margin: 0 auto;
}

.image_area,
.input_area {
  width: 100%;
  margin: 0 auto 40px;
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
  margin-bottom: 16px;
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
  }
  input,
  select {
    width: 90%;
    height: $tr_height;
    font-size: 1.2rem;
    text-align: right;
    border: $input_border;
    border-radius: 8px;
  }
  select {
    background-color: #ffffff;
  }
}

.radio {
  display: flex;
  justify-content: space-evenly;
  label {
    width: 50%;
  }
  input {
    width: 16%;
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
