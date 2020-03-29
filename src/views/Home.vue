<template>
  <div class="home">
    <div class="navbar">
      <navbar>
        <p slot="center">vue商城项目</p>
      </navbar>
    </div>

    <div class="content">
      <!-- <img alt="Vue logo" src="../assets/logo.png" />
      <h2>this is the home page</h2>-->
      <swiperSection :homedata="homedata" />
      <recommend :homedata="homedata" />
      <tab-control
        :recommendTitles="recommendTitles"
        :recommendData="$store.state.home.recommendData"
      />
      <!-- 这里将vuex中的recommendData作为参数传入，也可不传入，由子组件自行获取 -->
      <!-- <button @click="btnclick">点击显示推荐列表数据</button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from "vuex";

import navbar from "components/navbar";
import swiperSection from "components/home/swipe";
import recommend from "components/home/recommend";
import TabControl from "components/home/tabbarcontrol";
import { getHomeMultidata, getHomeGoods } from "@/network/home.js";

export default {
  name: "Home",
  components: {
    // HelloWorld
    navbar,

    swiperSection,
    recommend,
    TabControl
  },
  data() {
    return {
      homedata: { data: { banner: {}, recommend: {} } },
      //这里如果直接写一个空对象会有警告出现：cannot read banner属性从一个undefined
      //猜测原因为homedata数据是created中通过axios获取得到，为异步操作，因此写好结构，虽然数据仍为空，但可不报错
      recommendTitles: ["sell", "new", "pop"] //该属性是用于设置tabcontrol的标题，标题名称及数量自定义。若修改这里需要同步检查修改created中传入的初始数据和vuex中的recommendData数据及
      //fortesting: {type:'sell',page:0}
      //这里做了重构 现做一下记录：
      //1.home组件中设置一个默认的属性给recommendData，在created钩子中调用并且用于发送初始化的请求。得到数据后会更新位于vuex中的recommendData.
      //2.在tabcontrol中设置点击事件 点击后切换activeItem并更新显示数据 这里也需要进行检查 如果是初次点击则需要发送请求获取数据，否则不用
    };
  },
  // computed:{
  //   recommendData:function (){
  //     return this.$store.home.recommendData
  //   }
  // },
  computed: mapState({
    //recommendData: state => state.home.recommendData
    //测试可行
    recommendData: function() {
      return this.$store.getters.getActiveRecommend;
    }
  }),

  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(data => {
        this.homedata = data;
        // console.log("got data");
        // console.log(this.homedata);
      });
    }
    // getHomeGoods(type, page) {
    //   getHomeGoods(type, page + 1).then(data => {
    //     //console.log(data.data.list);
    //     // this.recommendData[type].page++;
    //     // this.recommendData[type].list.push(...data.data.list);
    //   });
    // }
  },
  created() {
    // this.recommendData = this.$store.home.recommendData
    //console.log(this.recommendData);
    //console.log(this.recommendTitles);
    this.$store.dispatch("updateRecommendData", { type: "sell", page: 0 });
    //这里用于设置初次载入页面时需要获取的数据，默认为sell 若要修改 需要同时修改1. 此处   2.tabcontrol处  3.vuex的对应recommendData处
    this.getHomeMultidata();
    // this.getHomeGoods(
    //   // this.recommendData.activeItem,
    //   // this.recommendData[this.recommendData.activeItem].page

    // );
  }
};
</script>


<style scoped>
.content {
  background-color: #eee;
  margin-top: 44px;
}

.navbar {
  font-size: 14px;
  background-color: orange;
}
navbar {
  background-color: orange;
}
</style>