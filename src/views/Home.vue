<template>
  <div class="home">
    <div class="navbar">
      <navbar>
        <p slot="center">vue商城项目</p>
      </navbar>
      <div class="tab-controlori" ref="mytabcontrolbackup"><tab-controlori :titles="recommendTitles"></tab-controlori></div>
      
      <back-top class="homeBackTop" ref="mybacktop" @click.native="backTopClick" />
    </div>
    <better-scroll
      :probeType="3"
      class="myhomescroll"
      @scrolling="myscroll"
      ref="myhomescroll"
      :pullUpLoad="true"
      @pullUpLoad="pullUpLoad"
    >
      <div class="homecontent">
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
    </better-scroll>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from "vuex";

import betterScroll from "components/better-scroll";
import navbar from "components/navbar";
import backTop from "components/back-top";
import swiperSection from "components/home/swipe";
import recommend from "components/home/recommend";
import TabControl from "components/home/tabbarcontrol";
import tabControlori from "components/tabcontrol";
import { getHomeMultidata, getHomeGoods } from "@/network/home.js";

export default {
  name: "Home",
  components: {
    // HelloWorld
    navbar,
    betterScroll,
    backTop,
    tabControlori,
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
    },
    myscroll(res) {
      //console.log(res);
      if (res.y < -1000) {
        //console.log(this.$refs.mybacktop.$el);
        this.$refs.mybacktop.$el.classList.add("active");

        // console.log('display');
      } else {
        this.$refs.mybacktop.$el.classList.remove("active");
      }
      if(res.y < -575) {
        this.$refs.mytabcontrolbackup.classList.add("active")
      }else{
        this.$refs.mytabcontrolbackup.classList.remove("active")
      }
    },
    backTopClick() {
      //console.log('back top clicked');
      this.$refs.myhomescroll.scrollTo(0, 0, 500);
    },
    pullUpLoad() {
      let obj = {};
      obj.type = this.$store.state.home.recommendData.activeItem;
      obj.page = this.$store.state.home.recommendData[
        this.$store.state.home.recommendData.activeItem
      ].page;
      console.log(
        this.$store.state.home.recommendData[
          this.$store.state.home.recommendData.activeItem
        ].page
      );

      this.$store.dispatch("pulltoUpdate", obj);
      setTimeout(() => {
        this.$refs.myhomescroll.finishPullUp();
        this.$refs.myhomescroll.refresh();
        console.log("loading finish ready to refresh the bscroll");
      }, 500);
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
    // console.log(this.$store.state.home.recommendData);

    if (
      this.$store.state.home.recommendData[
        this.$store.state.home.recommendData.activeItem
      ].page == 0
    ) {
      // console.log(123111);

      this.$store.dispatch("updateRecommendData", { type: "sell", page: 0 });
    } else {
      console.log("切换页面 我不再请求啦");
    }
    //这里在切换页面时出现bug 因为vuex中的数据保存好后重复生成该组件导致初始数据重复 。这里用if判断page来做解决 根本解决方法为keep-alive让组件不被销毁即可
    //这里用于设置初次载入页面时需要获取的数据，默认为sell 若要修改 需要同时修改1. 此处   2.tabcontrol处  3.vuex的对应recommendData处
    this.getHomeMultidata();
    // this.getHomeGoods(
    //   // this.recommendData.activeItem,
    //   // this.recommendData[this.recommendData.activeItem].page

    // );
  },
  mounted(){
    this.$bus.$on('refresh', ()=>{
      console.log(11111);
      this.$refs.myhomescroll.refresh();
    })
    // this.$bus.$on('itemclick',(res) => {
    //   console.log('ready to change annother activeindex');
    //   console.log('res=' +res);
      
    //   this.$refs.mytabcontrolbackup1.$refs.roottabcontrol.activeIndex = res;
    //   this.$refs.mytabcontrolbackup.activeIndex = res;
    // })
  }
};
</script>


<style scoped>
.homecontent {
  background-color: #fafbfc;
  margin-top: 44px;
}
.myhomescroll {
  height: calc(100vh - 44px - 2.45rem);
}
.homeBackTop {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  z-index: 999;
}
.navbar {
  font-size: 14px;
  background-color: orange;
}
navbar {
  background-color: orange;
}
.tab-controlori {
  display: none;
  position: fixed;
  top: 43px;
  left: 0;
  right: 0;
  z-index: 999;
  font-size: 1rem;
}
.active {
  display: block;
}
</style>