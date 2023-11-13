<template>
  <div class="toolbar">
    <a-dropdown>
      <div class="menu-item" @click.prevent>File</div>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="openSvg">
            <span>Open Svg</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="importImage">
            <span>Import Image</span>
          </a-menu-item>
          <a-menu-item @click="importPdf">
            <span>Import Pdf</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="exportSvg">
            <span>Export Svg</span>
          </a-menu-item>
          <a-menu-item @click="exportImage">
            <span>Export Image</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-dropdown>
      <div class="menu-item" @click.prevent>Edit</div>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="undo" :disabled="!canUndo">
            <span>Undo</span>
          </a-menu-item>
          <a-menu-item @click="redo" :disabled="!canRedo">
            <span>Redo</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="cut">
            <span>Cut</span>
          </a-menu-item>
          <a-menu-item @click="copy">
            <span>Copy</span>
          </a-menu-item>
          <a-menu-item @click="paste">
            <span>Paste</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="remove">
            <span>Delete</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- <a-dropdown>
      <div class="menu-item" @click.prevent>View</div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">Grid</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">Smart Guides</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">Rulers</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item>
            <a href="javascript:;">Zoom In</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">Zoom Out</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown> -->
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
</template>
<script>
import * as pdfjs from "pdfjs-dist";
export default {
  data() {
    return {
      canUndo: false,
      canRedo: false,
      scale: 100,
    };
  },
  methods: {
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
              self.stage.addGraph(cloneNode);
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
  },
  mounted() {
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
</style>
