<template>
  <div class="right">
    <div class="right-bar">
      <a-popover placement="left" v-for="(item, index) in tools" :key="index">
        <template #content>
          <b>{{ item.text }}</b>
        </template>
        <button
          :class="{ active: currentTool === item.type }"
          @click="changeTool(item)"
        >
          <svg width="17.5" height="17.5" fill="none" viewBox="0 0 48 48">
            <use :xlink:href="`#${item.type}`" />
          </svg>
        </button>
      </a-popover>
    </div>

    <div style="position: absolute; right: 37px; height: 100%">
      <a-drawer
        :width="280"
        :title="title"
        placement="right"
        :closable="false"
        :mask="false"
        :open="openDrawer"
        :get-container="false"
        @close="openDrawer = false"
      >
        <Fill v-if="currentTool === 'Fill'" />
        <Stroke v-if="currentTool === 'Stroke'" />
        <Arrangement v-if="currentTool === 'Arrangement'" />
        <Geometry v-if="currentTool === 'Ruler'" />
        <FontVue v-if="currentTool === 'Text'" />
        <History v-if="currentTool === 'History'" />
      </a-drawer>
    </div>
  </div>
</template>
<script>
import Fill from "../components/fill.vue";
import Stroke from "../components/stroke.vue";
import Geometry from "../components/geo.vue";
import Arrangement from "../components/arrangement.vue";
import History from "../components/history.vue";
import FontVue from "../components/font.vue";
export default {
  components: {
    Fill,
    Stroke,
    Geometry,
    Arrangement,
    History,
    FontVue,
  },
  data() {
    return {
      openDrawer: false,
      currentTool: "",
      title: "",
      tools: [
        { type: "Fill", text: "Fill" },
        { type: "Stroke", text: "Stroke" },
        { type: "Arrangement", text: "Arrangement" },
        { type: "Ruler", text: "Geometry" },
        // { type: "Layers", text: "Layers" },
        { type: "Text", text: "Text" },
        { type: "History", text: "History" },
      ],
      fill: "",
      fillOpacity: 1,
      stroke: "",
      strokeWidth: 1,
      strokeOpacity: 1,
    };
  },
  methods: {
    changeTool(item) {
      if (this.currentTool === item.type) {
        this.openDrawer = false;
        this.currentTool = "";
      } else {
        this.currentTool = item.type;
        this.openDrawer = true;
      }
      this.title = item.text;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.right {
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
  height: 100%;
}

.right .right-bar {
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 100%;
  background-color: #fcfcfc;
  position: relative;
  z-index: 8999;
  padding: 3px;
  border-left: 1px solid #d1d1d1;
}

.right button {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
  gap: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right button:hover {
  background: #ededed;
}

.right button:active {
  box-shadow: inset 0 0px 4px #b9b9b9;
}

.right button.active {
  background: var(--fx-color-primary);
  color: #fff;
}

.right button.active:hover {
  box-shadow: none;
}

.fill-picker,
.stroke-picker {
  margin-bottom: 16px;
}
</style>
