<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods"  :goods-item="item" :key="index"></goods-list-item>
<!--    {{goods}}-->
  </div>
</template>

<script>
  import GoodsListItem from "./Goodslistitem";
  export default {
    name: "Goodslist",
    components: {
      GoodsListItem,
    },
    props :{
      goods :{
        type: Array,
        default() {
          return []
        }
      }

    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
