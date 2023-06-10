# foxy.js

# example

![example](https://darkdragonblade.github.io/foxyjs-svgeditor/static/gif.gif)

A **simple and powerful Javascript HTML5 SVG library**.

- [**Website**][website]
- [**中文网站**][websiteCN]
- [**Contributing, Developing and More**](CONTRIBUTING.md)

---

## Features

- Out of the box interactions such as scale, move, rotate, skew, group...
- Built in shapes, controls, animations, image filters, gradients, patterns, brushes...
- `JPG`, `PNG`, `JSON` and `CANVAS` , `PDF` , `DFX` , `AI(adobe illustrator)`
- [Typed and modular](#migrating-to-v6)
- [Unit tested](CONTRIBUTING.md#%F0%9F%A7%AA%20testing)

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
import { stage, SVGStar } from "foxyjs";
```

<details><summary><b>Plain HTML</b></summary>

```html
<div id="container" width="100vw" height="100vh"></div>
<script>
  const container = document.getElementById("container");
  const stage = new stage(container);
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.add(star);
  stage.selectedElements.set(star);
  stage.toggleTool("transform-tool");
</script>
```

</details>

<details><summary><b>ReactJS</b></summary>

```js
import React, { useRef } from "react";
import { Stage, SVGStar } from "foxyjs";

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const board = document.querySelector("#board");
    const stage = new Stage(board);
    const star = new SVGStar({
      x: 100,
      y: 100,
      width: 60,
      height: 70,
      fill: "red",
    });
    stage.add(star);
    stage.selectedElements.set(star);
    stage.toggleTool("transform-tool");
  }

  render = () => {
    return (
      <div className="App">
        <div id="board"></div>
      </div>
    );
  };
}

export default App;
```

</details>

<details><summary><b>Vue2</b></summary>

```js
<template>
  <div id="container"></div>
</template>;

import { stage, SVGStar } from "foxyjs";

mounted(() => {
  const container = document.getElementById("container");
  const stage = new stage(container);
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.add(star);
  stage.selectedElements.set(star);
  stage.toggleTool("transform-tool");
});
```

</details>

<details><summary><b>Vue3</b></summary>

```js
<template>
  <div id="container"></div>
</template>;

import { computed, onMounted, ref } from "vue";
import { stage, SVGStar } from "foxyjs";

onMounted(() => {
  const container = document.getElementById("container");
  const stage = new stage(container);
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.add(star);
  stage.selectedElements.set(star);
  stage.toggleTool("transform-tool");
});
```

</details>

See our ready to use [templates](./.codesandbox/templates/).

---

## More Resources

- [Demos on `foxyjs.com`][demos]

[demos]: https://github.com/darkdragonblade/foxyjs-svgeditor/demos/
[mdn_es6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[website]: https://github.com/darkdragonblade/foxyjs-svgeditor
[websiteCN]: https://github.com/darkdragonblade/foxyjs-svgeditor
