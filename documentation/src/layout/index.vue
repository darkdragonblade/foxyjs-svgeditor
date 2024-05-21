<template>
  <div class="layout flex">
    <Header />
    <div class="flex" style="width: 100%; height: 100%; overflow: hidden">
      <Slider />
      <div class="workspace">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "./header.vue";
import Slider from "./side.vue";
</script>
<style scoped>
.layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  flex-direction: column;
}

.main {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.workspace {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
