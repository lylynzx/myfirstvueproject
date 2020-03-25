<!--  -->
<template>
<div>
  <!-- <p>嘿嘿嘿 这是app.vue中的内容</p>  -->
<router-view/>
<tabbar></tabbar>
</div>

</template>

<script>
import tabbar from '@/components/tabbar';
export default {
data() {
return {

}

},
components: {
  tabbar,
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
@import './assets/css/normalize.css';
@import './assets/css/base.css';

</style>
