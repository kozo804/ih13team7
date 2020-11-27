<template>
  <header>
    <p class="header_icon"><img src="/images/logo.png" alt="" /></p>
    <ul>
      <li class="header_link"><a href="">車両管理</a></li>
      <li class="header_link"><a href="">オークション一覧</a></li>
      <li class="header_link"><a href="">顧客管理</a></li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
header {
  $height: 60px;
  width: 100%;
  height: $height;
  background-color: #ddeaf6;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  ul {
    width: 50%;
    height: $height;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    width: 20%;
    text-align: center;
    border: solid #000000 1px;
  }
  img {
    width: auto;
    height: $height;
  }
}
.header_link {
  $height: 40px;
  width: 33.3%;
  height: $height;
  line-height: $height;
  a {
    width: 150px;
    height: 100%;
    color: #000;
    margin: 0 auto;
    border-radius: 5px;
    text-align: center;
    display: block;
    background-color: #f0ccb9;
  }
}
</style>

<script>
export default {};
</script>