<script setup lang="ts">
const name = "otherSystem";
defineOptions({
  name
});
const host = "http://120.78.186.60:8162";
const route = "/#/Layout/dashboard";
</script>

<template>
  <WujieSubApp
    :name="name"
    :entry-host="host"
    :entry-route="route"
    :degrade="true"
    :sso-enable="false"
    :is-integrated-sub-app="false"
  />
</template>
