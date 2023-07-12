<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <div class="p-[10px] md:p-[20px] flex flex-col">
    <div class="flex gap-2 flex-wrap">
      <el-button>
        <router-link
          :to="{
            path: '/systemManagement',
            query: {
              to: '/welcome'
            }
          }"
          >点击跳转-> [系统管理 / 首页]</router-link
        >
      </el-button>
      <el-button>
        <router-link
          :to="{
            path: '/systemManagement',
            query: {
              to: 'system/user/index'
            }
          }"
          >点击跳转-> [系统管理 / 用户管理]</router-link
        >
      </el-button>
      <el-button>
        <router-link
          :to="{
            path: '/systemManagement',
            query: {
              to: 'system/role/index'
            }
          }"
          >点击跳转-> [系统管理 / 角色管理]</router-link
        >
      </el-button>
      <el-button>
        <router-link
          :to="{
            path: '/systemManagement',
            query: {
              to: 'system/dept/index'
            }
          }"
          >点击跳转-> [系统管理 / 部门管理]</router-link
        >
      </el-button>
    </div>
    <el-divider border-style="dashed" />
    <h1
      class="w-auto text-[24px] bg-gradient-to-br from-teal-400 to-cyan-500 bg-clip-text text-transparent"
      v-for="i in 50"
      :key="i"
    >
      Powered by 无界[Wujie] - 极致的微前端框架
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";

.el-button {
  width: fit-content;
}

h1 {
  width: fit-content;
  background-image: linear-gradient(
    to right,
    $menuHover,
    color.invert($menuHover, 45%)
  );
}
</style>
