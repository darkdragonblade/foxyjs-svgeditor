import { fs, to } from "../utils/common";
class SVGImage {
  constructor(params) {
    const { x, y, width, height, href } = params;
    return fs`<image
      x="${x - width / 2}"
      y="${y - height / 2}"
      width="${width}"
      height="${height}"
      href="${href}">
    </image>
  `;
  }
}
class SVGPath {
  constructor(params) {
    const { d, fill, stroke, strokeWidth } = params;
    return fs`<path  fill="${fill}" d="${d} stroke="${stroke}" stroke-width="${strokeWidth}"></path>
    `;
  }
}
class SVGForeignObject {
  constructor(params) {
    const { x, y, width, height } = params;
    return fs`<foreignObject  x="${x}" y="${y} width="${width}" height="${height}"></foreignObject>
    `;
  }
}
class SVGText {
  constructor(params) {
    const { x, y, fontSize, fontFamily, textContent, fill } = params;
    return fs`<text 
      x="${x}" 
      y="${y}" 
      font-size="${fontSize}" 
      font-family="${fontFamily || "Arial"}" 
      fill="${fill}">${textContent}</text>
    `;
  }
}
class SVGRect {
  constructor(params) {
    const { x, y, width, height, rx, fill, stroke, strokeWidth } = params;
    return fs`<rect
      x="${x - width / 2}"
      y="${y - height / 2}"
      width="${width}"
      height="${height}"
      rx="${rx || 0}"
      fill="${fill}"
      stroke="${stroke}"
      stroke-width="${strokeWidth}">
      </rect>
    `;
  }
}
class SVGCircle {
  constructor(params) {
    const { cx, cy, r, fill, stroke, strokeWidth } = params;
    return fs`<circle
        cx="${cx}"
        cy="${cy}"
        r="${r}"
        fill="${fill}"
        stroke="${stroke}"
        stroke-width="${strokeWidth}">
      </circle>
      `;
  }
}
class SVGEllipse {
  constructor(params) {
    const {
      cx,
      cy,
      rx,
      ry,
      fill,
      stroke,
      strokeWidth,
    } = params;
    return fs`<ellipse
      cx="${cx}"
      cy="${cy}"
      rx="${rx}"
      ry="${ry}"
      fill="${fill}"
      stroke="${stroke}"
      stroke-width="${strokeWidth}">
    </ellipse>
    `;
  }
}
class SVGRing {
  constructor(params) {
    const {
      x,
      y,
      outerRx,
      outerRy,
      innerRx,
      innerRy,
      fill,
      stroke,
      strokeWidth,
    } = params;
    const $ = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const a = { type: "ring", values: [x, y, innerRx, innerRy, outerRx, outerRy] };
    to($, a, 3);
    return $;
  }
}
class SVGPie {
  constructor(params) {
    const {
      x,
      y,
      outerRadius,
      innerRadius,
      fill,
      stroke,
      strokeWidth,
    } = params;
    const n = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const h = { type: "pie", values: [x, y, innerRadius, outerRadius, 90, 360] };
    to(n, h, 3);
    return n;
  }
}
class SVGCrescent {
  constructor(params) {
    const {
      x,
      y,
      r,
      arch,
      hollow,
      fill,
      stroke,
      strokeWidth,
    } = params;
    const h = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const $ = { type: "crescent", values: [x, y, r, arch || 300, hollow || 0.7] };
    to(h, $, 3);
    return h;
  }
}
class SVGTriangle {
  constructor(params) {
    const {
      x,
      y,
      width,
      height,
      fill,
      stroke,
      strokeWidth,
      shift,
      cornerRadius,
    } = params;
    const $ = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const a = {
      type: "triangle",
      values: [x - width / 2, y - height / 2, width, height, shift || 0.5, cornerRadius || 0],
    };
    to($, a, 3);
    return $;
  }
}

class SVGNGon {
  constructor(params) {
    const {
      x,
      y,
      rx,
      ry,
      arms,
      fill,
      stroke,
      strokeWidth,
      cornerRadius,
    } = params;
    const $ = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const a = { type: "n-gon", values: [x, y, rx, ry, arms || 5, cornerRadius || 0] };
    to($, a, 3);
    return $;
  }
}
class SVGStar {
  constructor(params) {
    const {
      x,
      y,
      rx,
      ry,
      arms,
      depth,
      fill,
      stroke,
      strokeWidth,
    } = params;
    const $ = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const a = { type: "star", values: [x, y, rx, ry, depth || 0.4, arms || 5] };
    to($, a, 3);
    return $;
  }
}

class SVGCog {
  constructor(params) {
    const { x, y, fill, stroke, strokeWidth } = params;
    const i = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const c = {
      type: "cog",
      values: [x, y, (1 / 3) * 50, (2 / 3) * 50, 50, 0.375, 8],
    };
    to(i, c, 3);
    return i;
  }
}

class SVGCross {
  constructor(params) {
    const {
      x,
      y,
      width,
      height,
      fill,
      shift,
      stroke,
      strokeWidth,
    } = params;
    const h = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const $ = {
      type: "cross",
      values: [x - width / 2, y - height / 2, width, height, 20, 20, shift || 0.5],
    };
    to(h, $, 3);
    return h;
  }
}

class SVGSpiral {
  constructor(params) {
    const { x, y, r, fill, stroke, strokeWidth } = params;
    const c = fs`<path fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>`;
    const n = { type: "spiral", values: [x, y, 0, r, 0, 1080] };
    to(c, n, 3);
    return c;
  }
}

class SVGLine {
  constructor(params) {
    const {
      x,
      y,
      width,
      height,
      fill,
      stroke,
      strokeWidth,
    } = params;
    return fs`<line
      fill="${fill}" 
      stroke="${stroke}"
      stroke-width="${strokeWidth}"
      x1="${x - width / 2}"
      y1="${y - height / 2}"
      x2="${x + width / 2}"
      y2="${y + height / 2}">
    </line>`;
  }
}

class SVGPolyline {
  constructor(params) {
    const {
      x,
      y,
      width,
      height,
      fill,
      stroke,
      strokeWidth,
    } = params;
    return fs`<polyline 
    fill="${fill}"
    stroke="${stroke}" 
    stroke-width="${strokeWidth}"
    points="
    ${x - width / 2} 
    ${y - height / 2} 
    ${x + width / 2} 
    ${y + height / 2}">
    </polyline>`;
  }
}

class SVGPolygon {
  constructor(params) {
    const {
      x,
      y,
      width,
      height,
      fill,
      stroke,
      strokeWidth,
    } = params;
    return fs`<polygon 
    fill="${fill}"
    stroke="${stroke}" 
    stroke-width="${strokeWidth}"
    points="
    ${x - width / 2} 
    ${y - height / 2} 
    ${x + width / 2} 
    ${y + height / 2}">
    </polygon>`;
  }
}

export {
  SVGImage,
  SVGPath,
  SVGForeignObject,
  SVGText,
  SVGRect,
  SVGCircle,
  SVGEllipse,
  SVGRing,
  SVGPie,
  SVGCrescent,
  SVGTriangle,
  SVGNGon,
  SVGStar,
  SVGCog,
  SVGCross,
  SVGSpiral,
  SVGLine,
  SVGPolyline,
  SVGPolygon,
};
