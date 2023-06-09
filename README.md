# foxy.js

<a href="http://foxy.com/kitchensink" target="_blank"><img align="right" src="/lib/screenshot.png" style="width:400px"></a>

A **simple and powerful Javascript HTML5 SVG library**.

- [**Website**][website]
- [**中文网站**][websiteCN]
- [**Contributing, Developing and More**](CONTRIBUTING.md)

---

<!-- build/coverage status, climate -->

[![🩺](../../actions/workflows/build.yml/badge.svg)](../../actions/workflows/build.yml) [![🧪](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml) [![CodeQL](../../actions/workflows/codeql-analysis.yml/badge.svg)](../../actions/workflows/codeql-analysis.yml)

---

[![NPM](https://badge.fury.io/js/fabric.svg)](http://badge.fury.io/js/fabric) [![Downloads per month](https://img.shields.io/npm/dm/fabric.svg)](https://www.npmjs.org/package/fabric) [![Bower](https://badge.fury.io/bo/fabric.svg)](http://badge.fury.io/bo/fabric)

---

[![Sponsor asturur](https://img.shields.io/static/v1?label=Sponsor%20asturur&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/asturur) [![Sponsor melchiar](https://img.shields.io/static/v1?label=Sponsor%20melchiar&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/melchiar)

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
$ npm install foxy --save
// or
$ yarn add foxy
```

#### Browser

[![cdnjs](https://img.shields.io/cdnjs/v/fabric.js.svg)][cdnjs] [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/fabric/badge)][jsdelivr]

See [browser modules][mdn_es6] for using es6 imports in the browser or use a dedicated bundler.

## Quick Start

```js
import { stage, svgStar } from "foxy";
```

<details><summary><b>Plain HTML</b></summary>

```html
<div id="container" width="100vw" height="100vh"></div>

<script src="https://cdn.jsdelivr.net/npm/foxy"></script>
<script>
  const container = document.getElementById("container");
  const stage = new stage(container);
  const star = new svgStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.add(star);
</script>
```

</details>

<details><summary><b>ReactJS</b></summary>

```js
import React, { useRef } from "react";
import { Stage, svgStar } from "foxy";

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const board = document.querySelector("#board");
    const stage = new Stage(board);
    const star = new svgStar({
      x: 100,
      y: 100,
      width: 60,
      height: 70,
      fill: "red",
    });
    stage.add(star);
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
import { stage, svgStar } from "foxy";

mounted(() => {
  const container = document.getElementById("container");
  const stage = new stage(container);
  const star = new svgStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.add(star);
});
```

</details>

<details><summary><b>Vue3</b></summary>

```js
<template>
  <div id="container"></div>
</template>;

import { computed, onMounted, ref } from "vue";
import { stage, svgStar } from "foxy";

onMounted(() => {
  const container = document.getElementById("container");
  const stage = new stage(container);
  const star = new svgStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.add(star);
});
```

</details>

See our ready to use [templates](./.codesandbox/templates/).

---

## More Resources

- [Demos on `foxyjs.com`][demos]

[demos]: http://foxyjs.com/demos/
[mdn_es6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[melchiar]: https://github.com/melchiar
[website]: http://foxyjs.com/
[websiteCN]: http://foxyjs.com/
