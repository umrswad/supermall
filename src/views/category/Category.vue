<template>
  <div id="category">
    <nav-bar class="category-nav"><template #center>商品分类</template></nav-bar>
    <div class="content">
      <tab-menu  @selectItem="selectItem" :categories="categories" class="tab-menu"></tab-menu>
      <scorll id="tab-content" :pull-up-load="true">
        <div><tab-content-category :category-data="categoryData"></tab-content-category></div>
      </scorll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import TabMenu from "./ChildComps/TabMenu";
import TabContentCategory from "./ChildComps/TabContentCategory";

import Scorll from "../../components/common/scroll/Scorll";
import { getCategory, getSubcategory, getCategoryDetail } from 'network/category';
export default {
  name: "Category",
  data(){
    return{
      categories:[],
      currentIndex: -1,
      categoryData: [],
    }
  },
  components: {
    NavBar,
    TabMenu,
    Scorll,
    TabContentCategory
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  methods:{
    _getCategory(){
      getCategory().then( res =>{
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // console.log(this.categories);
        this._getSubcategories(0);
      })
    },
    selectItem(index) {
      this._getSubcategories(index);
    },
    _getSubcategories(index){
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData = res.data
        console.log(this.categoryData)
      });
    }
  },

};
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
</style>
