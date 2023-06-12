### Shape

##### Class: SVGText

```
stage.addGraph(new SVGText(config));
```

##### SVGText config

| NAME        | TYPE   | DEFAULT  | DESCRIBE    |
| ----------- | ------ | -------- | ----------- |
| x           | number | REQUIRED | X-axis      |
| y           | number | REQUIRED | Y-axis      |
| fontSize    | string | REQUIRED | 28px        |
| fill        | string | REQUIRED | rgb         |
| fontFamily  | string | Arial    | font-family |
| textContent | string | foxyjs   | textContent |

##### Class: SVGImage

```
stage.addGraph(new SVGImage(config));
```

##### SVGImage config

| NAME   | TYPE   | DEFAULT  | DESCRIBE |
| ------ | ------ | -------- | -------- |
| x      | number | REQUIRED | X-axis   |
| y      | number | REQUIRED | Y-axis   |
| width  | number | REQUIRED |
| height | number | REQUIRED |
| href   | string | REQUIRED | url      |

##### Class: SVGRect

```
stage.addGraph(new SVGRect(config));
```

##### SVGRect config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| width       | number | REQUIRED |          |
| height      | number | REQUIRED |          |
| fill        | string | REQUIRED | rgb      |
| rx          | number | 0        | fillet   |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGCircle

```
stage.addGraph(new SVGCircle(config));
```

##### SVGCircle config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| cx          | number | REQUIRED | X-axis   |
| cy          | number | REQUIRED | Y-axis   |
| r           | number | REQUIRED | radius   |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGEllipse

```
stage.addGraph(new SVGEllipse(config));
```

##### SVGEllipse config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| cx          | number | REQUIRED | X-axis   |
| cy          | number | REQUIRED | Y-axis   |
| rx          | number | REQUIRED | X-radius |
| ry          | number | REQUIRED | Y-radius |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGRing

```
stage.addGraph(new SVGRing(config));
```

##### SVGRing config

| NAME        | TYPE   | DEFAULT  | DESCRIBE      |
| ----------- | ------ | -------- | ------------- |
| x           | number | REQUIRED | X-axis        |
| y           | number | REQUIRED | Y-axis        |
| outerRx     | number | REQUIRED | X-outerRadius |
| outerRy     | number | REQUIRED | Y-outerRadius |
| innerRx     | number | REQUIRED | X-innerRadius |
| innerRy     | number | REQUIRED | Y-innerRadius |
| fill        | string | REQUIRED | rgb           |
| stroke      | string | none     | rgb           |
| strokeWidth | string | none     |               |

##### Class: SVGPie

```
stage.addGraph(new SVGPie(config));
```

##### SVGPie config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| innerRadius | number | REQUIRED | radius   |
| outerRadius | number | REQUIRED | radius   |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGCrescent

```
stage.addGraph(new SVGCrescent(config));
```

##### SVGCrescent config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| r           | number | REQUIRED | radius   |
| fill        | string | REQUIRED | rgb      |
| arch        | number | 300      |          |
| hollow      | number | 0.7      |          |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGTriangle

```
stage.addGraph(new SVGTriangle(config));
```

##### SVGTriangle config

| NAME         | TYPE   | DEFAULT  | DESCRIBE |
| ------------ | ------ | -------- | -------- |
| x            | number | REQUIRED | X-axis   |
| y            | number | REQUIRED | Y-axis   |
| width        | number | REQUIRED |
| height       | number | REQUIRED |
| fill         | string | REQUIRED | rgb      |
| shift        | number | 0.5      |
| cornerRadius | number | 0        |
| stroke       | string | none     | rgb      |
| strokeWidth  | string | none     |          |

##### Class: SVGNGon

```
stage.addGraph(new SVGNGon(config));
```

##### SVGNGon config

| NAME         | TYPE   | DEFAULT  | DESCRIBE |
| ------------ | ------ | -------- | -------- |
| x            | number | REQUIRED | X-axis   |
| y            | number | REQUIRED | Y-axis   |
| width        | number | REQUIRED |
| height       | number | REQUIRED |
| fill         | string | REQUIRED | rgb      |
| arms         | number | 5        |
| cornerRadius | number | 0        |
| stroke       | string | none     | rgb      |
| strokeWidth  | string | none     |          |

##### Class: SVGStar

```
stage.addGraph(new SVGStar(config));
```

##### SVGStar config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| rx          | number | REQUIRED | X-radius |
| ry          | number | REQUIRED | Y-radius |
| fill        | string | REQUIRED | rgb      |
| arms        | number | 5        |
| depth       | number | 0.4      |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGCog

```
stage.addGraph(new SVGCog(config));
```

##### SVGCog config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGCross

```
stage.addGraph(new SVGCross(config));
```

##### SVGCross config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| width       | number | REQUIRED |
| height      | number | REQUIRED |
| fill        | string | REQUIRED | rgb      |
| shift       | number | 0.5      |
| stroke      | string | none     | rgb      |
| strokeWidth | string | none     |          |

##### Class: SVGSpiral

```
stage.addGraph(new SVGSpiral(config));
```

##### SVGSpiral config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| r           | number | REQUIRED | radius   |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | #000000  | rgb      |
| strokeWidth | string | 1        |          |

##### Class: SVGLine

```
stage.addGraph(new SVGLine(config));
```

##### SVGLine config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| width       | number | REQUIRED |
| height      | number | REQUIRED |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | #000000  | rgb      |
| strokeWidth | string | 1        |          |

##### Class: SVGPolyline

```
stage.addGraph(new SVGPolyline(config));
```

##### SVGPolyline config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| width       | number | REQUIRED |
| height      | number | REQUIRED |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | #000000  | rgb      |
| strokeWidth | string | 1        |          |

##### Class: SVGPolygon

```
stage.addGraph(new SVGPolygon(config));
```

##### SVGPolygon config

| NAME        | TYPE   | DEFAULT  | DESCRIBE |
| ----------- | ------ | -------- | -------- |
| x           | number | REQUIRED | X-axis   |
| y           | number | REQUIRED | Y-axis   |
| width       | number | REQUIRED |
| height      | number | REQUIRED |
| fill        | string | REQUIRED | rgb      |
| stroke      | string | #000000  | rgb      |
| strokeWidth | string | 1        |          |
