<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<style scoped>
.app {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  --fx-color-primary: #F7B26A;
}

.menus {
  width: 200px;
  height: 100%;
}

#editor {
  flex: 1;
  height: 100%;
}
</style>
