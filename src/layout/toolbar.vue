<template>
  <div class="toolbar flex flex-algin-center flex-justify-between">
    <div class="toolbar-item flex flex-align-center">
      <a-dropdown>
        <div class="menu-item" @click.prevent>File</div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="openSvg">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Open" />
                </svg>
                <span>Open</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="importImage" disabled>
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Import" />
                </svg>
                <span>Import Svg</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="importImage">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Import" />
                </svg>
                <span>Import Image</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="importPdf">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Import" />
                </svg>
                <span>Import Pdf</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="importPdf" disabled>
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Import" />
                </svg>
                <span>Import Dxf</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="exportSvg">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Export" />
                </svg>
                <span>Export Svg</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="exportImage">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Export" />
                </svg>
                <span>Export Image</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="exportImage" disabled>
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Export" />
                </svg>
                <span>Export Pdf</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="exportImage" disabled>
              <div class="flex flex-align-center" style="gap: 6px">
                <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
                  <use xlink:href="#Export" />
                </svg>
                <span>Export Dxf</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown>
        <div class="menu-item" @click.prevent>Edit</div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="undo" :disabled="!canUndo">
              <div
                class="flex flex-align-center flex-justify-between"
                style="gap: 60px"
              >
                <span>Undo</span>
                <span>CTRL + Z</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="redo" :disabled="!canRedo">
              <div
                class="flex flex-align-center flex-justify-between"
                style="gap: 60px"
              >
                <span>Redo</span>
                <span>CTRL + SHIFT + Z</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="cut">
              <div
                class="flex flex-align-center flex-justify-between"
                style="gap: 60px"
              >
                <span>Cut</span>
                <span>CTRL + X</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="copy">
              <div
                class="flex flex-align-center flex-justify-between"
                style="gap: 60px"
              >
                <span>Copy</span>
                <span>CTRL + C</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="paste">
              <div
                class="flex flex-align-center flex-justify-between"
                style="gap: 60px"
              >
                <span>Paste</span>
                <span>CTRL + V</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="remove">
              <div
                class="flex flex-align-center flex-justify-between"
                style="gap: 60px"
              >
                <span>Delete</span>
                <span>DELETE</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown @visibleChange="visibleChange">
        <div class="menu-item" @click.prevent>View</div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="toggleManualGuides">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg
                  :style="{ color: manualGuides ? '#000000' : '#cccccc' }"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <use xlink:href="#Check" />
                </svg>
                <span>Manual Guides</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="toggleGrid">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg
                  :style="{ color: showGrid ? '#000000' : '#cccccc' }"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <use xlink:href="#Check" />
                </svg>
                <span>Grid</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="toggleSmartGuides">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg
                  :style="{ color: smartGuides ? '#000000' : '#cccccc' }"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <use xlink:href="#Check" />
                </svg>
                <span>Smart Guides</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="toggleCrosshair">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg
                  :style="{ color: crosshair ? '#000000' : '#cccccc' }"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <use xlink:href="#Check" />
                </svg>
                <span>Crosshair</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="toggleRulers">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg
                  :style="{ color: rulers ? '#000000' : '#cccccc' }"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <use xlink:href="#Check" />
                </svg>
                <span>Rulers</span>
              </div>
            </a-menu-item>
            <a-menu-item @click="toggleTransparency">
              <div class="flex flex-align-center" style="gap: 6px">
                <svg
                  :style="{ color: transparency ? '#000000' : '#cccccc' }"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <use xlink:href="#Check" />
                </svg>
                <span>transparency</span>
              </div>
            </a-menu-item>
            <!-- <a-menu-divider /> -->
            <!-- <a-menu-item>
            <a href="javascript:;">Zoom In</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">Zoom Out</a>
          </a-menu-item> -->
          </a-menu>
        </template>
      </a-dropdown>
      <!-- <a-dropdown>
      <div class="menu-item" @click.prevent>Help</div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown> -->
    </div>
    <div class="toolbar-item flex flex-align-center">
      <a-popover placement="bottomLeft">
        <template #content>
          <div class="theme-wrapper flex flex-align-center">
            <div
              v-for="color in colors"
              :key="color"
              class="theme-item"
              @click="changeTheme(color)"
              :style="{
                background: color === colorPrimary ? 'none' : color,
                border: color === colorPrimary ? `6px solid ${color}` : 'none',
              }"
            ></div>
          </div>
        </template>
        <div class="menu-item">
          <svg width="16" height="16" fill="none" viewBox="0 0 48 48">
            <use xlink:href="#Setting" />
          </svg>
        </div>
      </a-popover>
    </div>
  </div>
</template>
<script>
import * as pdfjs from "pdfjs-dist";
export default {
  data() {
    return {
      colors: [
        "#1677ff",
        "#00b9e3",
        "blueviolet",
        "orange",
        "#ff56ac",
        "red",
        "#03be03",
      ],
      canUndo: false,
      canRedo: false,
      scale: 100,
      manualGuides: false,
      showGrid: false,
      smartGuides: false,
      crosshair: false,
      rulers: false,
      transparency: false,
      colorPrimary: "",
    };
  },
  methods: {
    visibleChange() {
      this.manualGuides = self.stage.manualManager.enabled;
      this.showGrid = self.stage.gridManager.enabled;
      this.smartGuides = self.stage.smartManager.enabled;
      this.crosshair = self.stage.crosshairHud.enabled;
      this.rulers = self.stage.rulerManager.enabled;
      this.transparency = self.stage.viewTool.transparency;
    },
    toggleManualGuides() {
      if (self.stage.manualManager.enabled) {
        self.stage.manualManager.disable();
      } else {
        self.stage.manualManager.enable();
      }
    },
    toggleGrid() {
      if (self.stage.gridManager.enabled) {
        self.stage.gridManager.disable();
      } else {
        self.stage.gridManager.enable();
      }
    },
    toggleSmartGuides() {
      if (self.stage.smartManager.enabled) {
        self.stage.smartManager.disable();
      } else {
        self.stage.smartManager.enable();
      }
    },
    toggleCrosshair() {
      if (self.stage.crosshairHud.enabled) {
        self.stage.crosshairHud.disable();
      } else {
        self.stage.crosshairHud.enable();
      }
    },
    toggleRulers() {
      if (self.stage.rulerManager.enabled) {
        self.stage.rulerManager.disable();
      } else {
        self.stage.rulerManager.enable();
      }
    },
    async openSvg() {
      const config = {
        types: [
          {
            description: "Svg",
            accept: {
              "Svg/*": [".svg"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      };
      try {
        const res = await self.showOpenFilePicker(config);
        const f = await res[0].getFile();
        const reader = new FileReader();
        reader.readAsText(f);
        reader.onload = (res) => {
          // const { height: h } = self.stage.board.getBoundingClientRect();
          const domparser = new DOMParser();
          const doc = domparser.parseFromString(res.target.result, "text/html");
          const svg = doc.querySelector("svg");
          // const { width, height } = svg.viewBox.baseVal;
          self.stage.currentWorkspace.innerHTML = svg.innerHTML;
          self.stage.undoManager.clear();
        };
      } catch (error) {}
    },

    async importSvg() {
      self.stage.importManager.svg();
    },

    async importImage() {
      self.stage.importManager.image();
    },

    async importPdf() {
      const config = {
        types: [
          {
            description: "Pdf&Ai",
            accept: {
              "Pdf&Ai/*": [".pdf", ".ai"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      };
      try {
        const res = await self.showOpenFilePicker(config);
        const f = await res[0].getFile();
        const reader = new FileReader();
        reader.readAsArrayBuffer(f);
        reader.onload = async (res) => {
          pdfjs.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";
          const CMAP_URL = "./cmaps/";
          const loadingTask = pdfjs.getDocument({
            data: res.target.result,
            cMapUrl: CMAP_URL,
            cMapPacked: true,
            fontExtraProperties: true,
          });
          const pdfDocument = await loadingTask.promise;

          const numPages = pdfDocument.numPages;
          for (let i = 1; i <= numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const opList = await page.getOperatorList();

            const svgGfx = new pdfjs.SVGGraphics(
              page.commonObjs,
              page.objs,
              /* forceDataSchema = */ true
            );
            svgGfx.embedFonts = true;
            const svg = await svgGfx.getSVG(
              opList,
              page.getViewport({ scale: 1 })
            );
            // let curNode = null;
            // let node = document.createNodeIterator(svg, NodeFilter.SHOW_ELEMENT);
            // for (; curNode = node.nextNode();) {
            //     if (curNode.localName !== 'svg') {
            //         const cloneNode = curNode.cloneNode(true);
            //     }
            // }
            svg.childNodes.forEach((item) => {
              if (item.nodeType === 3) return;
              const cloneNode = item.cloneNode(true);
              self.stage.add(cloneNode);
            });

            page.cleanup();
          }
        };
      } catch (error) {}
    },

    async exportSvg() {
      self.stage.exportManager.svg();
    },

    async exportImage() {
      self.stage.exportManager.image("image/png");
    },

    undo() {
      self.stage.undoManager.undo();
    },
    redo() {
      self.stage.undoManager.redo();
    },
    cut() {
      self.stage.clipboardManager.cut();
    },
    copy() {
      self.stage.clipboardManager.copy();
    },
    paste() {
      self.stage.clipboardManager.paste();
    },
    remove() {
      self.stage.commands.delete();
    },
    toggleTransparency() {
      self.stage.viewTool.transparency = !self.stage.viewTool.transparency;
    },
    changeTheme(color) {
      const el = document.documentElement;
      getComputedStyle(el).getPropertyValue("--fx-color-primary");
      el.style.setProperty("--fx-color-primary", color);
      window.localStorage.colorPrimary = color;
      this.colorPrimary = color;
    },
  },
  mounted() {
    this.colorPrimary = window.localStorage.getItem("colorPrimary");
    this.colorPrimary && this.changeTheme(this.colorPrimary);
    const stage = self.stage;
    stage.board.addEventListener("undochange", () => {
      this.canUndo = stage.undoManager.canUndo();
      this.canRedo = stage.undoManager.canRedo();
    });

    stage.board.addEventListener("zoomchange", () => {
      this.scale = Math.ceil(stage.scale * 100);
    });
  },
};
</script>
<style scoped>
.toolbar {
  align-items: center;
  background-color: #fcfcfc;
  border-bottom: 1px solid #d1d1d1;
  box-sizing: border-box;
  display: flex;
  min-height: 36px;
  padding: 6px;
  width: 100%;
  position: relative;
  z-index: 99;
}

.toolbar .menu-item {
  font-size: 13px;
  padding: 8px 13px;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
}

.toolbar .menu-item:hover {
  background: #ededed;
}

.theme-wrapper {
  background: #ffffff;
  border-radius: 4px;
  padding: 16px;
  gap: 10px;
}

.theme-item {
  border-radius: 18px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: 4px;
  /* box-shadow: inset 0 0 2px #cccccc; */
}

.theme-item:hover {
  opacity: 0.76;
}

.theme-item:active {
  opacity: 0.66;
}
</style>
