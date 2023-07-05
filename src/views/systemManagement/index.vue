<script setup lang="ts">
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

defineOptions({
  name: "systemManagement"
});

const { dataTheme, layoutTheme } = useDataThemeChange();

const { VITE_SUB_APP_HOST } = import.meta.env;
const page = "/#/redirect/welcome";
const info = {
  userName: "admin",
  roles: "admin",
  accessToken: "eyJhbGciOiJIUzUxMiJ9.admin"
};
const params = new URLSearchParams(info).toString();
const url = `${VITE_SUB_APP_HOST}${page}?${params}`;
const props = {
  dataTheme,
  layoutTheme
};
</script>

<template>
  <WujieVue name="systemManagement" :url="url" :props="props" />
</template>
