<template>
  <div class="flex" style="flex-direction: column; gap: 10px">
    <div>
      <div style="margin-bottom: 8px"><b>Family</b></div>
      <a-select
        :disabled="data.disFontFamily"
        ref="select"
        v-model:value="data.fontFamily"
        style="width: 100%"
        @change="changeFont"
      >
        <a-select-option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          >{{ item.label }}</a-select-option
        >
      </a-select>
    </div>
    <div>
      <div style="margin-bottom: 8px"><b>Face</b></div>
      <div class="flex flex-align-center" style="gap: 6px">
        <a-button
          class="flex flex-align-center flex-justify-center"
          style="width: 50%"
          :disabled="data.disBold"
          :type="data.isBold ? 'primary' : 'dashed'"
          @click="bold"
          ><svg width="16" height="16" fill="none" viewBox="0 0 48 48">
            <use xlink:href="#Text Bold" />
          </svg>
        </a-button>
        <a-button
          class="flex flex-align-center flex-justify-center"
          style="width: 50%"
          :disabled="data.disItalic"
          :type="data.isItalic ? 'primary' : 'dashed'"
          @click="italic"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
            <use xlink:href="#Text Italic" />
          </svg>
        </a-button>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px"><b>Size</b></div>
      <div class="flex flex-align-center" style="gap: 10px">
        <a-slider
          :disabled="data.disFontSize"
          style="width: 80%"
          v-model:value="data.fontSize"
          @change="setFontSize"
          :step="1"
          :min="12"
          :max="999"
        />
        <a-input-number
          @keydown.stop
          @blur="setFontSize"
          :disabled="data.disFontSize"
          style="width: 80px"
          v-model:value="data.fontSize"
          :step="1"
          :min="12"
          :max="999"
        />
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px"><b>Decoration</b></div>
      <div class="flex flex-align-center" style="gap: 6px">
        <a-button
          :disabled="data.disUnderline"
          style="width: 33.33%; text-align: center"
          :type="data.isUnderline ? 'primary' : 'dashed'"
          @click="underline"
        >
          U</a-button
        >
        <a-button
          :disabled="data.disLineThrough"
          style="width: 33.33%; text-align: center"
          :type="data.isLineThrough ? 'primary' : 'dashed'"
          @click="lineThrough"
          >L</a-button
        >
        <a-button
          :disabled="data.disOverline"
          style="width: 33.33%; text-align: center"
          :type="data.isOverline ? 'primary' : 'dashed'"
          @click="overline"
          >O</a-button
        >
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px"><b>Anchor</b></div>
      <div class="flex flex-align-center" style="gap: 6px">
        <a-button
          class="flex flex-align-center flex-justify-center"
          :disabled="data.disAnchor"
          style="width: 33.33%"
          :type="data.anchor === 'start' ? 'primary' : 'dashed'"
          @click="anchor('start')"
          ><svg width="16" height="16" fill="none" viewBox="0 0 48 48">
            <use xlink:href="#Text Align Left" />
          </svg>
        </a-button>
        <a-button
          class="flex flex-align-center flex-justify-center"
          :disabled="data.disAnchor"
          style="width: 33.33%"
          :type="data.anchor === 'middle' ? 'primary' : 'dashed'"
          @click="anchor('middle')"
          ><svg width="16" height="16" fill="none" viewBox="0 0 48 48">
            <use xlink:href="#Text Align Center" />
          </svg>
        </a-button>
        <a-button
          :disabled="data.disAnchor"
          class="flex flex-align-center flex-justify-center"
          style="width: 33.33%"
          :type="data.anchor === 'end' ? 'primary' : 'dashed'"
          @click="anchor('end')"
          ><svg width="16" height="16" fill="none" viewBox="0 0 48 48">
            <use xlink:href="#Text Align Right" />
          </svg>
        </a-button>
      </div>
    </div>
    <div>
      <div style="margin-bottom: 8px"><b>Letter</b></div>
      <a-slider
        :min="-20"
        :max="20"
        :step="0.1"
        :disabled="data.disLetterSpacing"
        v-model:value="data.letterSpacing"
        @change="letterSpacing(data.letterSpacing)"
      />
    </div>
    <div>
      <div style="margin-bottom: 8px"><b>Word</b></div>
      <a-slider
        :min="-100"
        :max="100"
        :step="0.1"
        :disabled="data.disWordSpacing"
        v-model:value="data.wordSpacing"
        @change="wordSpacing(data.wordSpacing)"
      />
    </div>
    <div>
      <div style="margin-bottom: 8px"><b>Line</b></div>
      <a-slider
        :min="-3"
        :max="3"
        :step="0.1"
        :disabled="data.disLineSpacing"
        v-model:value="data.lineSpacing"
        @change="lineSpacing(data.lineSpacing)"
      />
    </div>
  </div>
</template>

<script>
let ev;
export default {
  data() {
    return {
      options: [],
      data: {
        fontFamily: "Arial",
        disFontFamily: false,
        fontSize: 13,
        disFontSize: true,
        isBold: false,
        disBold: true,
        isItalic: false,
        disItalic: true,
        isUnderline: false,
        disUnderline: true,
        isLineThrough: false,
        disLineThrough: true,
        isOverline: false,
        disOverline: true,
        anchor: "",
        disAnchor: true,
        letterSpacing: 0,
        disLetterSpacing: true,
        wordSpacing: 0,
        disWordSpacing: true,
        lineSpacing: 0,
        disLineSpacing: true,
      },
    };
  },
  methods: {
    bold() {
      self.stage.textManager.bold();
      this.info();
    },

    italic() {
      self.stage.textManager.italic();
      this.info();
    },

    underline() {
      self.stage.textManager.underline();
      this.info();
    },

    lineThrough() {
      self.stage.textManager.lineThrough();
      this.info();
    },

    overline() {
      self.stage.textManager.overline();
      this.info();
    },

    anchor(anchor) {
      self.stage.textManager.anchor(anchor);
      this.info();
    },

    letterSpacing(value) {
      self.stage.textManager.letterSpacing(value);
      this.info();
    },

    wordSpacing(value) {
      self.stage.textManager.wordSpacing(value);
      this.info();
    },

    lineSpacing(value) {
      self.stage.textManager.lineSpacing(value);
      this.info();
    },

    setFontSize() {
      self.stage.textManager.fontSize(this.data.fontSize);
      this.info();
    },

    async info() {
      this.data = await self.stage.textManager.get();
    },

    changeFont(f) {
      Array.from(self.stage.selectedObjectElements.keys()).forEach((node) => {
        if (node.localName === "text") {
          node.style.fontFamily = f;
        } else {
          node.querySelectorAll("text").forEach((node) => {
            node.style.fontFamily = f;
          });
        }
      });
      this.data.fontFamily = f;
    },

    changeType(type) {
      this.type = type;
    },

    async queryLocalFonts() {
      const res = await self.queryLocalFonts();
      const fs = [];
      const options = [];
      res.forEach((f) => {
        if (!fs.includes(f.family)) {
          fs.push(f.family);
          options.push(f);
          f.value = f.family;
          f.label = f.family;
        }
      });

      this.options = options;
    },
  },
  mounted() {
    this.info();
    this.queryLocalFonts();
    self.stage.board.addEventListener(
      "selectedelementschange",
      (ev = () => {
        this.info();
      })
    );
  },
  beforeUnmount() {
    self.stage.board.removeEventListener("selectedelementschange", ev);
  },
};
</script>
<style scoped></style>
