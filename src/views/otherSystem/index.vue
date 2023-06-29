<script setup lang="ts">
defineOptions({
  name: "otherSystem"
});
// const host = "http://localhost:8099";
const host = "http://120.78.186.60:8162";
const page = "/#/Layout/dashboard";
const info = {
  // userName: "admin",
  // roles: "admin",
  // accessToken: "eyJhbGciOiJIUzUxMiJ9.admin"
};
const params = new URLSearchParams(info).toString();
const url = `${host}${page}?${params}`;
const degrade = true;
</script>

<template>
  <WujieVue name="otherSystem" :url="url" :degrade="degrade" />
</template>
