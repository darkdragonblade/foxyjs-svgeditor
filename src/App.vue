<template>
  <div class="app">
    <Toolbar v-if="stage" />
    <div class="container">
      <Left v-if="stage" />
      <main></main>
      <Right v-if="stage" />
    </div>
  </div>
</template>

<script>
import Toolbar from "./layout/toolbar.vue";
import Left from "./layout/left.vue";
import Right from "./layout/right.vue";
import { Stage } from "./foxyjs";
import "./foxyjs/style.css";

export default {
  components: {
    Toolbar,
    Left,
    Right,
  },
  data() {
    return {
      stage: void 0,
    };
  },
  methods: {
    initStage() {
      this.stage = self.stage = new Stage(document.querySelector("main"), {
        manualGuides: true,
        smartGuides: true,
        showGrid: true,
        showRulers: true,
        crosshair: true,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initStage();
    });
  },
};
</script>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.container {
  display: flex;
  height: 100%;
}

main {
  flex: 1;
}
</style>
