<!--该组件是tabcontrol的title部分 用于进行点击切换vuex中的activeItem 属于通用组件  -->
<template>
  <transition-group name="tbControl" tag="div" class="tabControl">
    <span
      v-for="(item,index) in titles"
      :key="item"
      :class="{active:index == activeIndex}"
      @click="itemClick(index)"
    >{{item}}</span>
  </transition-group>
</template>

<script>
export default {
  data() {
    return {
       
    };
  },
  computed:{
    activeIndex (){
      return this.$store.state.home.activeIndex
    }
  },
  props: {
    titles: {
      type: Array
    }
  },
  methods: {
    itemClick(data) {
      //console.log(data);
      //console.log(this.titles[data]);
      this.$store.dispatch("updateRecommendData", this.titles[data]);
      //this.activeIndex = data;
      this.$store.commit('changeIndex',data)
      this.$bus.$emit('itemclick',this.activeIndex)
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.active {
  color: pink;
  border-bottom: pink 3px solid;
}
.tabControl {
width: 100%;
  position: sticky;
  top: 42px;
  display: flex;
  background-color: #fff;
  height: 1.6rem;
  padding-bottom: 5px;
}
.tabControl span {
  flex: 1;
  margin: 0 1.5rem;
}
</style>