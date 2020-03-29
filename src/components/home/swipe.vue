<!--  -->
<template>

    <div id="swipesection">
        <mt-swipe :auto="3000" :show-indicators="true">
          <mt-swipe-item v-for="item in homedata.data.banner.list" :key="item.image">
            <img :src="item.image" alt />
          </mt-swipe-item>
        </mt-swipe>
      </div>

</template>

<script>
//这里引用了mint-ui的css文件 因为该组件的css进行了私有化：scoped
import "mint-ui/lib/style.css";
export default {
data() {
return {

}
},
props:{
    homedata:{
        type: Object
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
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

</style>