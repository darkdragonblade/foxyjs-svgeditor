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
import { Stage, SVGStar } from "foxyjs";
```

<details><summary><b>Plain HTML</b></summary>

```html
<div id="container" width="100vw" height="100vh"></div>
<script>
  const container = document.getElementById("container");
  const stage = new Stage(container);
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.addGraph(star);
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
    stage.addGraph(star);
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

import { Stage, SVGStar } from "foxyjs";

mounted(() => {
  const container = document.getElementById("container");
  const stage = new Stage(container);
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.addGraph(star);
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
import { Stage, SVGStar } from "foxyjs";

onMounted(() => {
  const container = document.getElementById("container");
  const stage = new Stage(container);
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: "red",
  });
  stage.addGraph(star);
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

## Doc Api

### Shape

##### Class: SVGText

```
stage.addGraph(new SVGText(config));
```

##### SVGText config

| NAME        | TYPE   | DEFAULT | DESCRIBE     |
| ----------- | ------ | ------- | ------------ |
| x           | number | 0       | X-axis       |
| y           | number | 0       | Y-axis       |
| fontSize    | string | 100     | 28px         |
| fontFamily  | string | 100     | Arial        |
| fill        | string | blue    | fill color   |
| stroke      | string | #000000 | stroke color |
| textContent | string | foxyjs  | textContent  |

##### Class: SVGImage

```
stage.addGraph(new SVGImage(config));
```

##### SVGImage config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| href   | string | empty   | url          |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGRect

```
stage.addGraph(new SVGRect(config));
```

##### SVGRect config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |              |
| height | number | 100     |              |
| rx     | number | 0       | fillet       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGCircle

```
stage.addGraph(new SVGCircle(config));
```

##### SVGCircle config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| r      | number | 100     | radius       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGEllipse

```
stage.addGraph(new SVGEllipse(config));
```

##### SVGEllipse config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| rx     | number | 100     | X-radius     |
| ry     | number | 100     | Y-radius     |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGRing

```
stage.addGraph(new SVGRing(config));
```

##### SVGRing config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| rx     | number | 100     | X-radius     |
| ry     | number | 100     | Y-radius     |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGPie

```
stage.addGraph(new SVGPie(config));
```

##### SVGPie config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGCrescent

```
stage.addGraph(new SVGCrescent(config));
```

##### SVGCrescent config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGTriangle

```
stage.addGraph(new SVGTriangle(config));
```

##### SVGTriangle config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGNGon

```
stage.addGraph(new SVGNGon(config));
```

##### SVGNGon config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| nums   | number | 5       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGStar

```
stage.addGraph(new SVGStar(config));
```

##### SVGStar config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| nums   | number | 5       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGCog

```
stage.addGraph(new SVGCog(config));
```

##### SVGCog config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGCross

```
stage.addGraph(new SVGCross(config));
```

##### SVGCross config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGSpiral

```
stage.addGraph(new SVGSpiral(config));
```

##### SVGSpiral config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| r      | number | 50      | radius       |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGLine

```
stage.addGraph(new SVGLine(config));
```

##### SVGLine config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGPolyline

```
stage.addGraph(new SVGPolyline(config));
```

##### SVGPolyline config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

##### Class: SVGPolygon

```
stage.addGraph(new SVGPolygon(config));
```

##### SVGPolygon config

| NAME   | TYPE   | DEFAULT | DESCRIBE     |
| ------ | ------ | ------- | ------------ |
| x      | number | 0       | X-axis       |
| y      | number | 0       | Y-axis       |
| width  | number | 100     |
| height | number | 100     |
| fill   | string | blue    | fill color   |
| stroke | string | #000000 | stroke color |

### Tools

###### transformTool

```
const type = 'transform-tool';
stage.toogleTool(type);
```

###### How to get selectedElements？

```
const elements = Array.from(stage.selectedElements.keys());
console.log(elements);
```

###### How to get selectedelementschange？

```
stage.board.addEventListener('selectedelementschange',()=>{
//do something
});
```

###### How to delete selectedelements

```
stage.commands.delete();
```

![example](https://darkdragonblade.github.io/foxyjs-svgeditor/static/transform-tool.gif)
