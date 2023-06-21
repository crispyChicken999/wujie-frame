<script setup lang="ts">
defineOptions({
  name: "systemManagement"
});
const host = "http://192.168.31.40:8080";
const page = "/#/";
const info = {
  userName: "admin",
  roles: "admin",
  accessToken: "eyJhbGciOiJIUzUxMiJ9.admin"
};
const params = new URLSearchParams(info).toString();
const url = `${host}${page}?${params}`;
</script>

<template>
  <WujieVue name="systemManagement" :url="url" />
</template>
