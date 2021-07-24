<template>
<div id="detail">
<!--  //导航-->
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scorll class="content" :pull-up-load="true" ref="scroll" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :param-info=" paramInfo" ref="param"></detail-param-info>
    <detail-comment-info :comment-info="  commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommend"></goods-list>
  </scorll>
  <detail-button-bar  @addCart="addToCart"></detail-button-bar>
  <back-top
    @click.native="backClick"
    v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import DetailNavBar from "./ChildComps/DetailNavBar";
import DetailSwiper from "./ChildComps/DetailSwiper";
import DetailBaseInfo from "./ChildComps/DetailBaseInfo";
import DetailShopInfo from "./ChildComps/DetailShopInfo";
import DetailGoodsInfo from "./ChildComps/DetailGoodsInfo";
import DetailParamInfo from "./ChildComps/DetailParamInfo";
import DetailCommentInfo from "./ChildComps/DetailCommentInfo";
import DetailButtonBar from "./ChildComps/DetailButtonBar";


import Scorll from "../../components/common/scroll/Scorll";
import GoodsList from "../../components/content/goods/Goodslist";
import BackTop from "../../components/content/backTop/BackTop";

import {getDetail,Goods,Shop,GoodsParam,getRecommend } from "../../network/detail";

export default {
    name: "Detail",
    data(){
      return{
        iid: null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        currentIndex:4,
        isShowBackTop: false,


      }
    },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      // console.log(this.themeTopYs)
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0 , -this.themeTopYs[index] ,300)
    },
    //监听滚动
    contentScroll(position){
      // console.log(position)
      const positionY = -position.y
      //positionY和主题中的值进行对比
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++){
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
        //   console.log(i)
        // }
        if (this.currentIndex !== i &&((i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i === length-1 && positionY >= this.themeTopYs[i]))){
          // console.log(i)
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex


        }

      }

      this.isShowBackTop = positionY > 1000

    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product)
      //将商品添加到购物车中
      this.$store.dispatch('addCart',product).then(res => {
        console.log(res);
        this.$toast.show(res,2000)
      })
    }

  },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        const data = res.result
        // console.log(res);
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //  创建店铺信息
        this.shop = new Shop(data.shopInfo)
        //保存商品的详情数据
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论信息
        if (data.rate.cRate!==0) {
          this.commentInfo = data.rate.list[0]
        }
        // //第一次获取，值不对
        // //this.$refs.param.$el压根没有渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
        // this.$nextTick(() =>{
        //   //第二次获取值不对
        //   //图片没有计算在内
        //   //根据最新的数据，对应的dom已经渲染出来
        //   //但图片依旧没有加载完（目前获取的offsettop不包含图片）
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      })

      //请求推荐数据
      getRecommend().then(res =>{
        // console.log(res) ;
        this.recommends = res.data.list
        // console.log(this.recommends)
      })

    },
  components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailButtonBar,

      Scorll,
      GoodsList,
      BackTop
    }

  }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
  .content{
    height: calc(100% - 44px - 49px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
