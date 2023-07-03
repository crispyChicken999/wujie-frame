<script setup lang="ts">
import { computed, ref } from "vue";
defineOptions({
  name: "dataCenter"
});

const host = "http://data-center.goomaker.com";

const isInFullScreen = ref(document.fullscreenElement !== null);

const handleFullScreen = () => {
  const element = document.documentElement; // 获取整个文档的元素
  if (isInFullScreen.value) {
    document.exitFullscreen();
    isInFullScreen.value = false;
  } else {
    element.requestFullscreen();
    isInFullScreen.value = true;
  }
};

const fullScreenTitle = computed(() => {
  return isInFullScreen.value ? "退出全屏" : "点击全屏";
});
</script>

<template>
  <iframe :src="host" frameborder="0" />
  <el-button @click="handleFullScreen">{{ fullScreenTitle }}</el-button>
  <el-button><router-link to="/welcome">返回主页</router-link></el-button>
</template>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 100%;
  margin: 0;
}

.el-button {
  position: fixed;
  right: 10px;
  bottom: 50px;

  &:last-of-type {
    bottom: 10px;
  }
}
</style>
