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
<style>
html {
    font-size : 20px;
}
@media only screen and (min-width: 401px){
    html {
        font-size: 25px !important;
    }
}
@media only screen and (min-width: 428px){
    html {
        font-size: 26.75px !important;
    }
}
@media only screen and (min-width: 481px){
    html {
        font-size: 30px !important; 
    }
}
@media only screen and (min-width: 569px){
    html {
        font-size: 35px !important; 
    }
}
@media only screen and (min-width: 641px){
    html {
        font-size: 40px !important; 
    }
}
/* @import url(); 引入css类 */
@import './assets/css/normalize.css';
@import './assets/css/base.css';

</style>
