<template>
  <div
    class="fill-picker"
    style="margin-bottom: 12px"
    :disabled="!canUse"
  ></div>
  <div style="margin-bottom: 12px"><b>Opacity</b></div>
  <div class="flex flex-align-center" style="gap: 10px">
    <a-slider
      :disabled="!canUse"
      @change="changeFillOpacity"
      style="width: 80%"
      :step="0.01"
      :min="0"
      :max="1"
      v-model:value="fillOpacity"
    />
    <a-input-number
      @keydown.stop
      :disabled="!canUse"
      style="width: 80px"
      v-model:value="fillOpacity"
      :step="0.01"
      :min="0"
      :max="1"
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
      fill: "",
      fillOpacity: 0,
      canUse: false,
    };
  },
  methods: {
    init() {
      ColorPicker = new iro.ColorPicker(".fill-picker", {
        width: 232,
        color: this.fill,
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
          flag && self.stage.styleManager.set("fill", color.hexString);
        })
      );
    },
    getStyle() {
      const nodes = Array.from(self.stage.selectedObjectElements.keys());
      if (!nodes?.[0]) return;
      const aD = document.createNodeIterator(nodes[0], NodeFilter.SHOW_ELEMENT);
      let aE = null;
      flag = false;

      for (; (aE = aD.nextNode()); ) {
        if (aE.localName !== "g") {
          const { fill, fillOpacity } = getComputedStyle(aE);
          this.fill = fill === "none" ? "rgb(0,0,0)" : fill;
          ColorPicker && (ColorPicker.color.rgbString = this.fill);
          this.fillOpacity = Number(fillOpacity);
          setTimeout(() => {
            flag = true;
          });
          break;
        }
      }
    },
    changeFillOpacity() {
      self.stage.styleManager.set("fill-opacity", this.fillOpacity);
    },
  },
  mounted() {
    this.init();
    this.canUse = stage.selectedObjectElements.size > 0x0;
    this.getStyle();
    self.stage.board.addEventListener("selectedelementschange", () => {
      this.canUse = stage.selectedObjectElements.size > 0x0;
      this.getStyle();
    });
  },
  beforeUnmount() {
    self.stage.board.removeEventListener("selectedelementschange", event);
    ColorPicker.on("color:change", colorEvent);
  },
};
</script>
<style scoped></style>
