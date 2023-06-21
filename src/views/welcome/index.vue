<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <div class="home">
    <h1>Powered by 无界[Wujie] - 极致的微前端框架</h1>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding: 20px;

  h1 {
    width: fit-content;
    font-size: 24px;
    background-image: linear-gradient(45deg, #42e695, #3bb2b8);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
