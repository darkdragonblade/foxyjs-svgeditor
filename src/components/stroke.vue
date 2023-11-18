<template>
  <div
    class="stroke-picker"
    style="margin-bottom: 12px"
    :disabled="!canUse"
  ></div>
  <div style="margin-bottom: 12px"><b>Opacity</b></div>
  <div class="flex flex-align-center" style="gap: 10px; margin-bottom: 12px">
    <a-slider
      :disabled="!canUse"
      @change="changeStrokeOpacity"
      style="width: 80%"
      :step="0.01"
      :min="0"
      :max="1"
      v-model:value="strokeOpacity"
    />
    <a-input-number
      @keydown.stop
      :disabled="!canUse"
      style="width: 80px"
      v-model:value="strokeOpacity"
      :step="0.01"
      :min="0"
      :max="1"
    />
  </div>
  <div style="margin-bottom: 12px"><b>Width</b></div>
  <div class="flex flex-align-center" style="gap: 10px">
    <a-slider
      :disabled="!canUse"
      @change="changeStrokeWidth"
      style="width: 80%"
      :step="1"
      :min="0"
      :max="50"
      v-model:value="strokeWidth"
    />
    <a-input-number
      @keydown.stop
      :disabled="!canUse"
      style="width: 80px"
      v-model:value="strokeWidth"
      :step="1"
      :min="0"
      :max="50"
    />
  </div>
</template>

<script>
let ColorPicker;
let event;
let colorEvent;
let flag = false;
export default {
  data() {
    return {
      stroke: "",
      strokeOpacity: 0,
      strokeWidth: 1,
      canUse: false,
    };
  },
  methods: {
    init() {
      ColorPicker = new iro.ColorPicker(".stroke-picker", {
        width: 232,
        color: this.stroke,
        borderWidth: 1,
        borderColor: "#fff",
        layout: [
          {
            component: iro.ui.Slider,
            options: {
              id: "hue-slider",
              sliderType: "hue",
            },
          },
          {
            component: iro.ui.Box,
          },
        ],
      });

      ColorPicker.on(
        "color:change",
        (colorEvent = (color) => {
          flag && self.stage.styleManager.set("stroke", color.hexString);
        })
      );
    },
    getStyle() {
      const stage = self.stage;
      const nodes = Array.from(stage.selectedObjectElements.keys());
      flag = false;

      if (!nodes?.[0]) return;
      const aD = document.createNodeIterator(nodes[0], NodeFilter.SHOW_ELEMENT);
      let aE = null;
      for (; (aE = aD.nextNode()); ) {
        if (aE.localName !== "g") {
          const { stroke, strokeOpacity, strokeWidth } = getComputedStyle(aE);

          this.stroke = stroke === "none" ? "rgb(0,0,0)" : stroke;
          ColorPicker && (ColorPicker.color.rgbString = this.stroke);
          this.strokeOpacity = Number(strokeOpacity);
          this.strokeWidth = parseInt(strokeWidth);
          setTimeout(() => {
            flag = true;
          });

          break;
        }
      }
    },
    changeStrokeOpacity() {
      self.stage.styleManager.set("stroke-opacity", this.strokeOpacity);
    },
    changeStrokeWidth() {
      self.stage.styleManager.set("stroke-width", this.strokeWidth);
    },
  },
  mounted() {
    this.init();
    this.canUse = stage.selectedObjectElements.size > 0x0;
    this.getStyle();
    self.stage.board.addEventListener(
      "selectedelementschange",
      (event = () => {
        this.canUse = stage.selectedObjectElements.size > 0x0;
        this.getStyle();
      })
    );
  },
  beforeUnmount() {
    self.stage.board.removeEventListener("selectedelementschange", event);
    ColorPicker.on("color:change", colorEvent);
  },
};
</script>
<style scoped></style>
