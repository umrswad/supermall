<template>
  <div id="home">
<!--    首页导航-->
    <nav-bar  class="home-nav">
      <template v-slot:center><div>购物街</div></template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick = 'tabClick' ref="tabControl1" v-show=" isTabFixed"></tab-control>

    <scorll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <!--    轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--    小导航栏-->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick = 'tabClick' ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scorll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

  import HomeSwiper from "./ChildComps/HomeSwiper";
  import RecommendView from "./ChildComps/RecommendView";
  import FeatureView from "./ChildComps/FeatureView";
  import GoodsList from "../../components/content/goods/Goodslist";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import Scorll from "../../components/common/scroll/Scorll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";



  export default {
    name:"Home",
    data(){
      return {
        banners : [],
        recommends : [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType : 'pop',
        isShowBackTop: false,
        tabOffsetTop:0,
        isTabFixed: false,
        saveY:0

      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY,0)

    },
    deactivated() {
      // console.log(this.saveY);
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods: {
      //事件监听相关
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      // 首页滚动监听
      contentScroll(opsition){
        // console.log(opsition);
        //判断backtop是否显示
        this.isShowBackTop = (-opsition.y) > 1000
      //  决定tabcontrol是否吸顶（posution：fixed）
        this.isTabFixed = (-opsition.y)>this.tabOffsetTop
      },

      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.refresh()
        this.$refs.scroll.finishPullUp()

      },
      swiperImageLoad(){
        //  获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
      },
      //网络请求相关
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list

        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res =>{
          // console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
        })
      }
    },

    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,

      NavBar,
      TabControl,
      Scorll,
      BackTop,
    }
  }

</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color:#fff ;
  /*position: sticky;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
  .content {
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  #home {
    height: 100vh;
    position: relative;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
