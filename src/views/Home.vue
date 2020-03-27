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
      <div id="swipesection">
        <mt-swipe :auto="3000" :show-indicators="true">
          <mt-swipe-item v-for="item in homedata.data.banner.list" :key="item.image">
            <img :src="item.image" alt />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="recommend">
        <ul>
          <li v-for="item in homedata.data.recommend.list" :key="item.title">
            <img :src="item.image" alt />
            <div>{{item.title}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import "mint-ui/lib/style.css";
//这里引用了mint-ui的css文件 因为该组件的css进行了私有化：scoped
import navbar from "@/components/navbar";
import { getHomeMultidata, getHomeGoods } from "@/network/home";
export default {
  name: "Home",
  components: {
    // HelloWorld
    navbar
  },
  data() {
    return {
      homedata: { data: { banner: {}, recommend: {} } }
      //这里如果直接写一个空对象会有警告出现：cannot read banner属性从一个undefined
      //猜测原因为homedata数据是created中通过axios获取得到，为异步操作，因此
    };
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(data => {
        this.homedata = data;
        console.log("got data");
        console.log(this.homedata);
      });
    },
    getHomeGoods(type, page) {
      getHomeGoods(type, page + 1).then(data => {
        console.log(data);
      });
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("sell", 1);
  }
};
</script>


<style scoped>
.content {
  background-color: #eee;
  margin-top: 44px;
}
#swipesection {
  /* margin: 0 auto; */
  overflow: hidden;
  width: 100%;
  height: 8rem;
  /* height: 100%; */
  /* border: 1px solid black; */
}
.mint-swipe {
  height: 100%;
  width: 100%;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.navbar {
  font-size: 14px;
  background-color: orange;
}
navbar {
  background-color: orange;
}
.recommend {
  background-color: #fff;
  margin-top: 15px;
  height: 5.5rem;
  width: 100%;
}
.recommend ul {
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
}
.recommend li {
  flex: 1;
}
.recommend img {
  width: 100%;
  height: 90%;
  /* object-fit: cover;  */
}
</style>