<!--  -->
<template>
  <div>
    <navbar>
      <p slot="center">搜索导航</p>
    </navbar>
    <div class="content">
      <p>this is the category page</p>
      <button @click="sendrequest">点击发送网络请求</button>
      <p>{{content}}</p>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    sendrequest() {
      request({ url: "/home/multidata" }).then(data => {
        return (this.content = data);
      });
    }
  },
  components: {
    navbar
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.content {
    margin-top: 50px;
}
/* @import url(); 引入css类 */
</style>