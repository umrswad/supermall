<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scorll",
    props:{
      probeType:{
        type : Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll :null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM : true,
        observeImage: true,
        click : true,
        keepAlive: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //监听滚动位置
      this.scroll.on('scroll',(opsition) => {
        // console.log(opsition)
        this.$emit('scroll',opsition)
      })
      //监听上拉事件
      this.scroll.on('pullingUp', () =>{
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y , time = 500){
        this.scroll.scrollTo(x, y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }

    }
  }
</script>

<style scoped>

</style>
