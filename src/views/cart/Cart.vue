<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
<!--    商品列表-->
    <cart-list></cart-list>
<!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./ChildComps/Cartlist";
  import CartBottomBar from "./ChildComps/CartBottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name:"Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters([
        'cartLength'
      ])
    }

  }

</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
  .cart{
    height: 100vh;
  }
</style>
