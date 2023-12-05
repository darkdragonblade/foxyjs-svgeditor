# foxyjs

![](https://darkdragonblade.github.io/foxyjs-svgeditor/static/demo.png)

A **simple and powerful Javascript HTML5 SVG library**.

- [online demo][onlineDemo]
- [中文官网][website]

---

## Features

- Out of the box interactions such as scale, move, rotate, skew, group...
- Built in shapes, controls, animations, image filters, gradients, patterns, brushes...
- `JPG`, `PNG`, `JSON` and `CANVAS` , `PDF` , `DXF` , `AI(adobe illustrator)`

#### Supported Browsers/Environments

|   Context   | Supported Version | Notes                           |
| :---------: | :---------------: | ------------------------------- |
|   Firefox   |        ✔️         | modern version (tbd)            |
|   Safari    |        ✔️         | version >= 10.1                 |
|    Opera    |        ✔️         | chromium based                  |
|   Chrome    |        ✔️         | modern version (tbd)            |
|    Edge     |        ✔️         | chromium based                  |
| Edge Legacy |        ❌         |
|    IE11     |        ❌         |
|   Node.js   |        ✔️         | [Node.js installation](#nodejs) |

## Installation

```bash
$ npm install foxyjs --save
// or
$ yarn add foxyjs
```

#### Browser

See [browser modules][mdn_es6] for using es6 imports in the browser or use a dedicated bundler.

## Quick Start

```js
<template>
  <div id="container" width="100vw" height="100vh"></div>
</template>;

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

[mdn_es6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[onlineDemo]: https://darkdragonblade.github.io/foxyjs-svgeditor/demo
[document]: https://darkdragonblade.github.io/foxyjs-svgeditor/document
[website]: https://darkdragonblade.github.io/foxyjs-website
