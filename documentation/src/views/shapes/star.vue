<template>
  <div class="star flex">
    <div id="editor"></div>
    <div id="container"></div>
  </div>
</template>
<script>
import ace from "brace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import { Stage, SVGStar } from "foxyjs";

window.SVGStar = SVGStar;

const editCode = `
//import { Stage, SVGStar } from "foxyjs";
//const container = document.getElementById("container");
//const stage = new Stage(container);

for (let i = 0; i < 10; i++) {
  const box = container.getBoundingClientRect();
  const x = Math.random() * box.width;
  const y = Math.random() * box.height;

  const rx = Math.random() * 100 + 10;
  const ry = Math.random() * 100 + 10;

  const depth = Math.random() * 0.8 + 0.1;

  const arms = Math.floor(Math.random() * 8) + 3;

  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  const fill = colors[Math.floor(Math.random() * colors.length)];

  const star = new SVGStar({
    x: x,
    y: y,
    rx: rx,
    ry: ry,
    depth: depth,
    arms: arms,
    fill: fill,
  });

  stage.add(star);
}`;

export default {
  data() {
    return {};
  },
  methods: {
    initScript() {
      const editor = ace.edit("editor");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
      editor.setValue(editCode);
      editor.getSession().getSelection().clearSelection();
      editor.getSession().on("change", () => {
        try {
          const code = editor.getValue();
          const fn = new Function(code);
          stage.currentContainer.innerHTML = "";
          fn();
        } catch (e) {
          console.error(e);
        }
      });
    },
    initEditor() {
      const container = document.getElementById("container");
      const stage = (window.stage = new Stage(container));
      for (let i = 0; i < 10; i++) {
        const box = container.getBoundingClientRect();
        const x = Math.random() * box.width;
        const y = Math.random() * box.height;

        const rx = Math.random() * 100 + 10;
        const ry = Math.random() * 100 + 10;

        const depth = Math.random() * 0.8 + 0.1;

        const arms = Math.floor(Math.random() * 8) + 3;

        const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
        const fill = colors[Math.floor(Math.random() * colors.length)];

        const star = new SVGStar({
          x: x,
          y: y,
          rx: rx,
          ry: ry,
          depth: depth,
          arms: arms,
          fill: fill,
        });

        stage.add(star);
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initScript();
      this.initEditor();
    });
  },
};
</script>
<style scoped>
.star {
  height: 100%;
  width: 100%;
}

#editor {
  height: 100%;
  min-width: 400px;
  max-width: 560px;
  width: 50%;
}

#container {
  display: flex;
  flex: 1;
  height: 100%;
}
</style>
