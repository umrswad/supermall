<template>
  <div class="cart-list">
    <scorll class="content" ref="scroll"  :pull-up-load="true">
      <div>
        <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
      </div>
    </scorll>
  </div>
</template>

<script>
  import Scorll from "../../../components/common/scroll/Scorll";
  import CartListItem from './CartListItem';
  import { mapGetters } from 'vuex';

  export default {
    name: "CartList",
    components: {
      Scorll,
      CartListItem
    },
    // props: {
    //   cartList: {
    //     type: Array,
    //     default() {
    //       return []
    //     }
    //   }
    // },
    computed:{
      ...mapGetters(['cartList']),
    },
    activated(){
      // console.log(this.$refs.scroll.scroll);

      this.$refs.scroll.refresh();
      // console.log(this.$refs.scroll.scroll);
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>

