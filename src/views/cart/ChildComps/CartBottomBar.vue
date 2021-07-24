<template>
  <div class="bottom-bar">
    <div class="check-content" >
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span class="all">全选</span>
    </div>

    <div class="price">
      合计:{{ totalPrice}}
    </div>

    <div class="caculate" @click="calcClick">
      <span>去计算({{checkLength}})</span>
    </div>

  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar.vue",
    components:{
      CheckButton
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if (!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    },
    computed:{
      totalPrice(){
        return '¥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        if(this.$store.state.cartList.length === 0) return false
        return  !this.$store.state.cartList.find(item => !item.checked)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 15px ;

  }
  .check-content{
    display: flex;
    margin-left: 5px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .price {
    margin-left: 14px;
    color: #666;
    /*line-height: 20px;*/
    padding-top: -2px;
    flex: 1;
  }
  .all{
    font-size: 16px;
    color: #666;
    padding-top: 1px;
  }
  .caculate{
    width: 90px;
    height: 100%;
    text-align: center;
    background-color: red;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
