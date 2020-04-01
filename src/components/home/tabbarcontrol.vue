<!--  -->
<template>
  <div class="mytabcontrol">
    <tab-control :titles="recommendTitles"></tab-control>
    <div
      class="recommenditem"
      v-for="item in recommendData[recommendData.activeItem].list"
      :key="item.iid"
    >
      <img :src="item.show.img" @load="imgload" />
      <p>{{item.title}} {{item.price}}</p>
    </div>
  </div>
</template>

<script>
import tabControl from "components/tabcontrol";
export default {
  data() {
    return {
      timer:"",
    };
  },
  props: {
    recommendTitles: {
      type: Array
    },
    recommendData: {
      type: Object,
      default: {}
    }
  },
  methods:{
    imgload(){
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.$bus.$emit('refresh');
      },200)
    }
  },
  components: {
    tabControl
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    setTimeout(() => {
      //console.log(this.recommendData[this.recommendData.activeItem].list);
    }, 3000);
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.mytabcontrol {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
  background-color: #fff;
}
.recommenditem {
  margin-top: 20px;
  width: 48%;
  height: 15rem;
  font-size: 0.5rem;
  overflow: hidden;
}
/* .recommenditem:nth-child(2n) {
  
  margin-left: 5px;
}
.recommenditem:nth-child(2n + 1) {
  float: right;
  margin-right: 5px;
} */
.recommenditem img {
  width: 100%;
  border-radius: 10px 10px 10px 10px;
  object-fit: cover;
  height: 12rem;
}
/* p {
  position: relative;
  line-height: 1rem;
  max-height: 3rem;
  overflow: hidden;
}
p::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 0rem;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
} */

p {
  text-overflow: -o-ellipsis-lastline;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
/* @import url(); 引入css类 */
</style>