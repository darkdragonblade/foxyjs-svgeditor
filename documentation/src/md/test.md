## 快速开始

```js
import { Stage, SVGStar } from 'foxyjs'
```

<summary><b>Plain HTML</b></summary>

```html
<div id="container" width="100vw" height="100vh"></div>
<script>
  const container = document.getElementById('container')
  const stage = new Stage(container)
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: 'red',
  })
  stage.addGraph(star)
  stage.selectedElements.set(star)
  stage.toggleTool('transform-tool')
</script>
```

<summary><b>ReactJS</b></summary>

```js
import React, { useRef } from 'react'
import { Stage, SVGStar } from 'foxyjs'

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    const board = document.querySelector('#board')
    const stage = new Stage(board)
    const star = new SVGStar({
      x: 100,
      y: 100,
      width: 60,
      height: 70,
      fill: 'red',
    })
    stage.addGraph(star)
    stage.selectedElements.set(star)
    stage.toggleTool('transform-tool')
  }

  render = () => {
    return (
      <div className='App'>
        <div id='board'></div>
      </div>
    )
  }
}

export default App
```

<summary><b>Vue2</b></summary>

```js
;<template>
  <div id='container'></div>
</template>

import { Stage, SVGStar } from 'foxyjs'

mounted(() => {
  const container = document.getElementById('container')
  const stage = new Stage(container)
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: 'red',
  })
  stage.addGraph(star)
  stage.selectedElements.set(star)
  stage.toggleTool('transform-tool')
})
```

<summary><b>Vue3</b></summary>

```js
;<template>
  <div id='container'></div>
</template>

import { computed, onMounted, ref } from 'vue'
import { Stage, SVGStar } from 'foxyjs'

onMounted(() => {
  const container = document.getElementById('container')
  const stage = new Stage(container)
  const star = new SVGStar({
    x: 100,
    y: 100,
    width: 60,
    height: 70,
    fill: 'red',
  })
  stage.addGraph(star)
  stage.selectedElements.set(star)
  stage.toggleTool('transform-tool')
})
```

<!-- See our ready to use [templates](./.codesandbox/templates/). -->

---
