## Installation

```bash
$ npm install foxyjs --save
// or
$ yarn add foxyjs
```

## Usage

```html
<div id="container" width="100vw" height="100vh"></div>
```

```js
import { Stage, SVGStar } from "foxyjs";
import "foxyjs/style.css";

const container = document.getElementById("container");
const stage = new Stage(container, {
  manualGuides: true,
  smartGuides: true,
  showGrid: true,
  showRulers: true,
});

const star = new SVGStar({
  x: 100,
  y: 100,
  rx: 60,
  ry: 60,
  depth: 0.4,
  arms: 5,
  fill: "red",
});

stage.add(star);
stage.selectedElements.set(star);
stage.toggleTool("transform-tool");
```
