<template>
  <div class="geometry">
    <div class="flex flex-align-center" style="gap: 12px; margin-bottom: 12px">
      <div style="width: 50%">
        <div style="margin-bottom: 12px"><b>X</b></div>
        <a-input-number
          @keydown.stop
          :disabled="!isSelected"
          @blur="blur($event, 'x')"
          style="width: 100%"
          v-model:value="x"
          :step="1"
          :min="0"
          :max="100"
        />
      </div>
      <div style="width: 50%">
        <div style="margin-bottom: 12px"><b>Y</b></div>
        <a-input-number
          @keydown.stop
          :disabled="!isSelected"
          @blur="blur($event, 'y')"
          style="width: 100%"
          v-model:value="y"
        />
      </div>
    </div>
    <div class="flex flex-align-center" style="gap: 12px; margin-bottom: 12px">
      <div style="width: 50%">
        <div style="margin-bottom: 12px"><b>Width</b></div>
        <a-input-number
          @keydown.stop
          :disabled="!isSelected"
          @blur="blur($event, 'width')"
          style="width: 100%"
          v-model:value="width"
          :min="0"
        />
      </div>
      <div style="width: 50%">
        <div style="margin-bottom: 12px"><b>Height</b></div>
        <a-input-number
          @keydown.stop
          :disabled="!isSelected"
          @blur="blur($event, 'height')"
          style="width: 100%"
          v-model:value="height"
          :min="0"
        />
      </div>
    </div>
    <!-- <div>
      <div style="margin-bottom: 12px"><b>Rotation</b></div>
      <div class="flex flex-algin-center">
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
          @blur="setFontSize"
          style="width: 80px"
          v-model:value="roate"
          :step="1"
          :min="12"
          :max="120"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
let ev;
let ev2;
export default {
  data() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isSelected: true,
    };
  },
  methods: {
    init() {
      const { x, y, width, height, isSelected } =
        self.stage.elementsGeometryManager.get();
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.isSelected = isSelected;
    },
    blur(event, type) {
      const stage = self.stage;
      switch (type) {
        case "x":
          stage.elementsGeometryManager.coordsX(event.target.value);
          break;
        case "y":
          stage.elementsGeometryManager.coordsY(event.target.value);
          break;
        case "width":
          stage.elementsGeometryManager.width(event.target.value);
          break;
        case "height":
          stage.elementsGeometryManager.height(event.target.value);
          break;
        default:
      }
    },
  },
  mounted() {
    this.init();
    const stage = self.stage;
    stage.board.addEventListener(
      "selectedelementschange",
      (ev = () => {
        this.init();
      })
    );

    stage.board.addEventListener(
      "workspacemutation",
      (ev2 = () => {
        this.init();
      })
    );
  },
  beforeUnmount() {
    self.stage.board.removeEventListener("selectedelementschange", ev);
    self.stage.board.removeEventListener("workspacemutation", ev2);
  },
};
</script>
