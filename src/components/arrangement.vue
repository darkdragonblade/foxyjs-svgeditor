<template>
  <div class="arrangement">
    <div style="margin-bottom: 12px"><b>Alignment</b></div>
    <div class="flex flex-align-center" style="margin-bottom: 6px; gap: 6px">
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('move-top-inside')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Align top" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('move-right-inside')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Align right" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('move-bottom-inside')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Align bottom" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('move-left-inside')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Align left" />
        </svg>
      </a-button>
    </div>
    <div class="flex flex-align-center" style="margin-bottom: 12px; gap: 6px">
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('vertical-center')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Center horizontally" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('horizontal-center')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Center vertically" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('horizontal-stretch')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Stretch horizontally" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canAlign"
        class="flex-1"
        style="text-align: center"
        @click="align('vertical-stretch')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Stretch vertically" />
        </svg>
      </a-button>
    </div>

    <div style="margin-bottom: 12px"><b>Transform</b></div>
    <div class="flex flex-align-center" style="gap: 6px; margin-bottom: 12px">
      <a-button
        :disabled="!canFlip"
        class="flex-1"
        style="text-align: center"
        @click="transform('flipY')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Flip X" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canFlip"
        class="flex-1"
        style="text-align: center"
        @click="transform('flipX')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Flip Y" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canRotate"
        class="flex-1"
        style="text-align: center"
        @click="transform('rotate', 15)"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Rotate +" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canRotate"
        class="flex-1"
        style="text-align: center"
        @click="transform('rotate', -15)"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Rotate -" />
        </svg>
      </a-button>
    </div>

    <div style="margin-bottom: 12px"><b>Order</b></div>

    <div class="flex flex-align-center" style="gap: 6px; margin-bottom: 12px">
      <a-button
        :disabled="!canRaise"
        class="flex-1"
        style="text-align: center"
        @click="order('raise')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Arrow up" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canLower"
        class="flex-1"
        style="text-align: center"
        @click="order('lower')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Arrow down" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canRaise"
        class="flex-1"
        style="text-align: center"
        @click="order('raiseToFront')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Arrow double up" />
        </svg>
      </a-button>
      <a-button
        :disabled="!canLower"
        class="flex-1"
        style="text-align: center"
        @click="order('lowerToBack')"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Arrow double down" />
        </svg>
      </a-button>
    </div>

    <div style="margin-bottom: 12px"><b>Group</b></div>
    <div class="flex flex-align-center" style="gap: 6px">
      <a-button
        :disabled="!canGroup"
        class="flex-1"
        style="text-align: center"
        @click="group(true)"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Group" />
        </svg>
      </a-button>

      <a-button
        :disabled="!canUnGroup"
        class="flex-1"
        style="text-align: center"
        @click="group(false)"
      >
        <svg
          style="margin-top: 2px"
          width="17.5"
          height="17.5"
          fill="none"
          viewBox="0 0 48 48"
        >
          <use xlink:href="#Ungroup" />
        </svg>
      </a-button>
    </div>
  </div>
</template>

<script>
let ev;
export default {
  data() {
    return {
      canFlip: false,
      canRotate: false,
      canAlign: false,
      canGroup: false,
      canUnGroup: false,
      canRaise: false,
      canLower: false,
    };
  },
  methods: {
    init() {
      this.canFlip = self.stage.transformManager.canFlip();
      this.canRotate = self.stage.transformManager.canRotate();
      this.canAlign = self.stage.selectedObjectElements.size > 0x0;
      this.canGroup = self.stage.groupManager.canGroup();
      this.canUnGroup = self.stage.groupManager.canUnGroup();
      this.canRaise = self.stage.orderManager.canRaise();
      this.canLower = self.stage.orderManager.canLower();
    },
    align(type) {
      self.stage.alignManager.align(type);
    },
    transform(type, deg) {
      const stage = self.stage;
      switch (type) {
        case "flipX":
          stage.transformManager.flipX();
          break;
        case "flipY":
          stage.transformManager.flipY();
          break;
        case "rotate":
          stage.transformManager.rotate(deg || 0);
          break;
        default:
      }
      this.init();
    },
    group(flag = true) {
      if (flag) {
        self.stage.groupManager.group();
      } else {
        self.stage.groupManager.unGroup();
      }
      this.init();
    },
    order(type) {
      switch (type) {
        case "raise":
          stage.orderManager.raise();
          break;
        case "raiseToFront":
          stage.orderManager.raiseToFront();
          break;
        case "lower":
          stage.orderManager.lower();
          break;
        case "lowerToBack":
          stage.orderManager.lowerToBack();
          break;
      }
      this.init();
    },
  },
  mounted() {
    this.init();
    self.stage.board.addEventListener(
      "selectedelementschange",
      (ev = () => {
        this.init();
      })
    );
  },
  beforeUnmount() {
    self.stage.board.removeEventListener("selectedelementschange", ev);
  },
};
</script>
