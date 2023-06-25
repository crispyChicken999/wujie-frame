<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <div class="p-[10px] md:p-[20px] flex flex-col">
    <h1
      class="w-auto text-[24px] bg-gradient-to-br from-teal-400 to-cyan-500 bg-clip-text text-transparent"
      v-for="i in 50"
      :key="i"
    >
      Powered by 无界[Wujie] - 极致的微前端框架
    </h1>
  </div>
</template>
