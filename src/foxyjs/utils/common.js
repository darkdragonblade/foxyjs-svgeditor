import ee from "./ee";
import oe from "./oe";
import An from "./An";
import Xs from "./Xs";
import st from "./st";
import nt from "./nt";
// import paper from 'paper';
const {
    sin: It,
    cos: Bt,
    acos: Ut,
    atan2: _t,
    abs: Ft,
    PI: jt,
    min: Vt,
    max: Ht,
} = Math;
const As =
    ["iPhone", "iPad"].includes(navigator.platform) ||
    navigator.platform.startsWith("Mac");
const vc = [
    [-3, -3],
    [-2, -3],
    [-1, -3],
    [0, -3],
    [1, -3],
    [2, -3],
    [3, -3],
    [-3, -2],
    [-2, -2],
    [-1, -2],
    [0, -2],
    [1, -2],
    [2, -2],
    [3, -2],
    [-3, -1],
    [-2, -1],
    [-1, -1],
    [0, -1],
    [1, -1],
    [2, -1],
    [3, -1],
    [-3, 0],
    [-2, 0],
    [-1, 0],
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [-3, 1],
    [-2, 1],
    [-1, 1],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [-3, 2],
    [-2, 2],
    [-1, 2],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [-3, 3],
    [-2, 3],
    [-1, 3],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
];
const fc = {
    colors: "unpinned",
    gradients: "unpinned",
    patterns: "unpinned",
    markers: "unpinned",
    symbols: "none",
    filters: "unpinned",
    fonts: "unpinned",
    clipPaths: "unpinned",
    masks: "unpinned",
};
const Jn = {
    rect: 1,
    frame: 1,
    ring: 1,
    pie: 1,
    crescent: 1,
    triangle: 1,
    "n-gon": 1,
    star: 1,
    cog: 1,
    arrow: 1,
    cross: 1,
    spiral: 1,
};
const b = [
    "circle",
    "ellipse",
    "line",
    "path",
    "polygon",
    "polyline",
    "rect",
    "text",
    "textPath",
    "tspan",
    "image",
    "svg",
    "g",
    "a",
    "use",
];
const u = {
    bx: "https://foxy-svg.com",
    html: "http://www.w3.org/1999/xhtml",
    svg: "http://www.w3.org/2000/svg",
    xlink: "http://www.w3.org/1999/xlink",
    xmlns: "http://www.w3.org/2000/xmlns/",
};
const _a = [
    "fill",
    "fill-opacity",
    "fill-rule",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "paint-order",
    "vector-effect",
];
const g = [
    "circle",
    "ellipse",
    "line",
    "path",
    "polygon",
    "polyline",
    "rect",
    "text",
    "textPath",
    "tspan",
    "image",
];
const M = [...g, "a", "g"];
const P = [...g, "a", "g", "use"];
const Fa = ["opacity", "mix-blend-mode", "isolation"];
const Ua = ["text", "textPath", "tspan"];
const Ga = [
    "font-family",
    "font-size",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "letter-spacing",
    "word-spacing",
    "text-decoration",
    "text-transform",
];
const xs = document.createElement("template");
const Yt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const x = ["circle", "ellipse", "line", "path", "polygon", "polyline", "rect"];
const m = ["text", "textPath", "tspan"];
const w = [...x, ...m];
const S = [
    "circle",
    "ellipse",
    "line",
    "path",
    "polygon",
    "polyline",
    "rect",
    "text",
    "textPath",
    "tspan",
    "image",
    "clipPath",
    "a",
    "g",
    "use",
];
const L = [
    "rect",
    "circle",
    "ellipse",
    "line",
    "path",
    "polygon",
    "polyline",
    "image",
    "text",
    "tspan",
    "use",
    "svg",
    "a",
    "g",
];
const R = ["path", "line", "polyline", "polygon"];
const U = [
    "fill",
    "stroke",
    "filter",
    "clip-path",
    "mask",
    "marker-mid",
    "marker-start",
    "marker-end",
];
const v = ["solidcolor", "linearGradient", "radialGradient", "pattern"];
const y = ["desc", "bx-title"];
const k = ["svg", "g", "defs", "symbol", "use"];
const D = [
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDropShadow",
    "feFlood",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMorphology",
    "feOffset",
    "feSpecularLighting",
    "feTile",
    "feTurbulence",
];
const z = ["feFuncA", "feFuncB", "feFuncG", "feFuncR"];
const O = ["feDistantLight", "fePointLight", "feSpotLight"];
const E = ["animate", "animateMotion", "animateTransform", "set"];
const T = ["animate", "set"];
const A = ["animate", "animateTransform", "set"];
const $ = ["animate", "set"];
const I = [
    ...g,
    ...v,
    ...y,
    ...k,
    ...D,
    ...z,
    ...O,
    ...E,
    "a",
    "marker",
    "mask",
    "feMergeNode",
    "filter",
    "clipPath",
    "stop",
    "script",
    "style",
    "view",
];
const B = [
    "direction",
    "dominant-baseline",
    "font-family",
    "font-size",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "letter-spacing",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "word-spacing",
    "writing-mode",
];
const N = {
    a: [
        ...E,
        ...y,
        ...v,
        ...x,
        ...k,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
        "#text",
    ],
    animate: [...y, "script"],
    animateMotion: [...y, "script", "mpath"],
    animateTransform: [...y, "script"],
    "bx-title": ["#text"],
    circle: [...E, ...y, ...v, "clipPath", "marker", "mask", "script", "style"],
    clipPath: [...E, ...y, ...x, "text", "use", "script", "style"],
    defs: [
        ...E,
        ...y,
        ...v,
        ...x,
        ...k,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
        "bx-grid",
        "bx-guide",
    ],
    desc: ["#text"],
    ellipse: [...E, ...y, ...v, "clipPath", "marker", "mask", "script", "style"],
    feBlend: [...y, ...T, "script", "style"],
    feColorMatrix: [...y, ...T, "script", "style"],
    feComponentTransfer: [...y, ...z, "script", "style"],
    feComposite: [...y, ...T, "script", "style"],
    feConvolveMatrix: [...y, ...T, "script", "style"],
    feDiffuseLighting: [...y, ...O, "script", "style"],
    feDisplacementMap: [...y, ...T, "script", "style"],
    feDistantLight: [...y, ...T, "script", "style"],
    feDropShadow: [...y, ...T, "script", "style"],
    feFlood: [...y, ...T, "script", "style"],
    feFuncR: [...y, ...T, "script", "style"],
    feFuncG: [...y, ...T, "script", "style"],
    feFuncB: [...y, ...T, "script", "style"],
    feFuncA: [...y, ...T, "script", "style"],
    feGaussianBlur: [...y, ...T, "script", "style"],
    feImage: [...y, ...T, "script", "style"],
    feMerge: [...y, "feMergeNode", "script", "style"],
    feMergeNode: [...y, ...T, "script", "style"],
    feMorphology: [...y, ...T, "script", "style"],
    feOffset: [...y, ...T, "script", "style"],
    fePointLight: [...y, ...T, "script", "style"],
    feSpecularLighting: [
        ...y,
        "feDistantLight",
        "fePointLight",
        "feSpotLight",
        "script",
        "style",
    ],
    feSpotLight: [...y, ...T, "script", "style"],
    feTile: [...y, ...T, "script", "style"],
    feTurbulence: [...y, ...T, "script", "style"],
    filter: [...y, ...D, ...T, "script", "style"],
    g: [
        ...E,
        ...y,
        ...v,
        ...x,
        ...k,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
    ],
    image: [...E, ...y, "clipPath", "mask", "script", "style"],
    line: [...E, ...y, ...v, "clipPath", "marker", "mask", "script", "style"],
    linearGradient: [...y, ...A, "script", "stop", "style"],
    marker: [
        ...E,
        ...y,
        ...v,
        ...x,
        ...k,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
    ],
    mask: [
        ...E,
        ...y,
        ...x,
        ...k,
        ...v,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
        "text",
    ],
    mpath: [...y, "script"],
    path: [...E, ...y, ...v, "clipPath", "marker", "mask", "script", "style"],
    pattern: [
        ...E,
        ...y,
        ...v,
        ...x,
        ...k,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
    ],
    polygon: [...E, ...y, ...v, "clipPath", "marker", "mask", "script", "style"],
    polyline: [...E, ...y, ...v, "clipPath", "marker", "mask", "script", "style"],
    radialGradient: [...y, ...A, "script", "stop", "style"],
    rect: [...E, ...y, ...v, "clipPath", "marker", "mask", "script", "style"],
    script: ["#text"],
    set: [...y, "script"],
    solidcolor: [...y, "script", "style"],
    stop: [...y, "animate", "set", "script", "style"],
    style: ["#text"],
    svg: [
        ...E,
        ...y,
        ...v,
        ...x,
        ...k,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
    ],
    symbol: [
        ...E,
        ...y,
        ...v,
        ...x,
        ...k,
        "a",
        "clipPath",
        "filter",
        "image",
        "marker",
        "mask",
        "script",
        "style",
        "text",
        "view",
    ],
    text: [
        ...E,
        ...y,
        ...v,
        "a",
        "clipPath",
        "marker",
        "mask",
        "script",
        "style",
        "tspan",
        "textPath",
        "#text",
    ],
    textPath: [
        ...y,
        ...v,
        ...$,
        "a",
        "clipPath",
        "marker",
        "mask",
        "script",
        "style",
        "tspan",
        "#text",
    ],
    tspan: [...y, ...v, ...$, "a", "script", "style", "tspan", "#text"],
    use: [...E, ...y, ...v, "clipPath", "mask", "script", "style"],
    view: [...E, ...y, "script", "style"],
};
const G = [
    "none",
    "xMinYMin",
    "xMidYMin",
    "xMaxYMin",
    "xMinYMid",
    "xMidYMid",
    "xMaxYMid",
    "xMinYMax",
    "xMidYMax",
    "xMaxYMax",
];
const kl = {
    100: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    200: ["200", "100", "300", "400", "500", "600", "700", "800", "900"],
    300: ["300", "200", "100", "400", "500", "600", "700", "800", "900"],
    400: ["400", "500", "300", "200", "100", "600", "700", "800", "900"],
    500: ["500", "400", "300", "200", "100", "600", "700", "800", "900"],
    600: ["600", "700", "800", "900", "500", "400", "300", "200", "100"],
    700: ["700", "800", "900", "600", "500", "400", "300", "200", "100"],
    800: ["800", "900", "700", "600", "500", "400", "300", "200", "100"],
    900: ["900", "800", "700", "600", "500", "400", "300", "200", "100"],
};
const Ns = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
};
const j = [
    {
        name: "alignment-baseline",
        presentationAttributeName: "alignment-baseline",
        initialValue: "baseline",
        values: [
            {
                type: "token",
                tokens: [
                    "baseline",
                    "text-bottom",
                    "alphabetic",
                    "ideographic",
                    "middle",
                    "central",
                    "mathematical",
                    "text-top",
                    "bottom",
                    "center",
                    "top",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "tspan", "textPath", "text a"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "baseline-shift",
        presentationAttributeName: "baseline-shift",
        initialValue: "0",
        values: [
            { type: "number" },
            { type: "percentage" },
            { type: "length" },
            {
                type: "token",
                tokens: ["sub", "super", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: ["text", "tspan", "textPath", "text a"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "clip-path",
        presentationAttributeName: "clip-path",
        initialValue: "none",
        values: [
            { type: "url" },
            {
                type: "token",
                tokens: [
                    "fill-box",
                    "stroke-box",
                    "view-box",
                    "none",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: [...g, "svg", "g", "a", "use"],
        animatable: !1,
        inheritable: !1,
    },
    {
        name: "clip-rule",
        presentationAttributeName: "clip-rule",
        initialValue: "nonzero",
        values: [
            {
                type: "token",
                tokens: ["nonzero", "evenodd", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...g, "use"],
        animatable: !1,
        inheritable: !0,
    },
    {
        name: "color",
        presentationAttributeName: "color",
        initialValue: "#000",
        values: [
            { type: "color" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: [...g, "svg", "g", "a", "use"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "color-interpolation",
        presentationAttributeName: "color-interpolation",
        initialValue: "sRGB",
        values: [
            {
                type: "token",
                tokens: ["auto", "sRGB", "linearRGB", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [
            ...g,
            "svg",
            "g",
            "a",
            "use",
            "linearGradient",
            "radialGradient",
        ],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "color-interpolation-filters",
        presentationAttributeName: "color-interpolation-filters",
        initialValue: "linearRGB",
        values: [
            {
                type: "token",
                tokens: ["auto", "sRGB", "linearRGB", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...D],
        animatable: !1,
        inheritable: !0,
    },
    {
        name: "color-rendering",
        presentationAttributeName: "color-rendering",
        initialValue: "auto",
        values: [
            {
                type: "token",
                tokens: [
                    "auto",
                    "optimizeSpeed",
                    "optimizeQuality",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: [
            ...g,
            "svg",
            "g",
            "a",
            "use",
            "linearGradient",
            "radialGradient",
        ],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "cursor",
        presentationAttributeName: "cursor",
        initialValue: "auto",
        values: [
            { type: "url" },
            {
                type: "token",
                tokens: [
                    "context-menu",
                    "help",
                    "pointer",
                    "progress",
                    "wait ",
                    "cell",
                    "crosshair",
                    "text",
                    "vertical-text",
                    "alias",
                    "copy",
                    "move",
                    "no-drop",
                    "not-allowed",
                    "grab",
                    "grabbing",
                    "e-resize",
                    "n-resize",
                    "ne-resize",
                    "nw-resize",
                    "s-resize",
                    "se-resize",
                    "sw-resize",
                    "w-resize",
                    "ew-resize",
                    "ns-resize",
                    "nesw-resize",
                    "nwse-resize",
                    "col-resize",
                    "row-resize",
                    "all-scroll",
                    "zoom-in",
                    "zoom-out",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: [...g, "svg", "g", "a", "use"],
        animatable: !1,
        inheritable: !0,
    },
    {
        name: "direction",
        initialValue: "ltr",
        values: [
            { type: "token", tokens: ["ltr", "rtl", "inherit", "initial", "unset"] },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        presentationAttributeName: "direction",
        animatable: !1,
        inheritable: !0,
    },
    {
        name: "display",
        presentationAttributeName: "display",
        initialValue: "inline",
        values: [
            {
                type: "token",
                tokens: ["none", "inline", "block", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...g, "textPath", "tspan", "svg", "g", "a", "use"],
        animatable: !1,
        inheritable: !1,
    },
    {
        name: "dominant-baseline",
        presentationAttributeName: "dominant-baseline",
        initialValue: "auto",
        values: [
            {
                type: "token",
                tokens: [
                    "auto",
                    "use-script",
                    "no-change",
                    "reset-size",
                    "ideographic",
                    "alphabetic",
                    "hanging",
                    "mathematical",
                    "central",
                    "middle",
                    "text-after-edge",
                    "text-before-edge",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "fill",
        presentationAttributeName: "fill",
        initialValue: "#000",
        values: [
            { type: "color" },
            { type: "url" },
            {
                type: "token",
                tokens: ["none", "currentColor", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "fill-opacity",
        presentationAttributeName: "fill-opacity",
        initialValue: "1",
        values: [
            { type: "number" },
            { type: "percentage" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "fill-rule",
        presentationAttributeName: "fill-rule",
        initialValue: "nonzero",
        values: [
            {
                type: "token",
                tokens: ["nonzero", "evenodd", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "filter",
        presentationAttributeName: "filter",
        initialValue: "none",
        values: [
            { type: "filter-function-list" },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: [...g, "textPath", "tspan", "g", "a", "svg", "use"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "flood-color",
        presentationAttributeName: "flood-color",
        initialValue: "#000",
        values: [
            { type: "color" },
            {
                type: "token",
                tokens: ["currentColor", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: ["feFlood"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "flood-opacity",
        presentationAttributeName: "flood-opacity",
        initialValue: "1",
        values: [
            { type: "number", min: 0 },
            { type: "percentage", min: 0 },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: ["feFlood"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "font",
        presentationAttributeName: "font",
        initialValue: null,
        values: [
            { type: "font" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "font-family",
        presentationAttributeName: "font-family",
        initialValue: null,
        values: [
            { type: "font-family" },
            {
                type: "token",
                tokens: [
                    "cursive",
                    "fantasy",
                    "monospace",
                    "sans-serif",
                    "serif",
                    "system-ui",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "font-size",
        presentationAttributeName: "font-size",
        initialValue: "medium",
        values: [
            {
                type: "token",
                tokens: [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large",
                    "x-large",
                    "xx-large",
                    "larger",
                    "smaller",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
            { type: "number", min: 0 },
            { type: "percentage", min: 0 },
            { type: "length", min: 0 },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "font-stretch",
        presentationAttributeName: "font-stretch",
        initialValue: "normal",
        values: [
            {
                type: "token",
                tokens: [
                    "normal",
                    "wider",
                    "narrower",
                    "ultra-condensed",
                    "extra-condensed",
                    "condensed",
                    "semi-condensed",
                    "semi-expanded",
                    "expanded",
                    "extra-expanded",
                    "ultra-expanded",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "font-style",
        presentationAttributeName: "font-style",
        initialValue: "normal",
        values: [
            {
                type: "token",
                tokens: ["normal", "italic", "oblique", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "font-variant",
        presentationAttributeName: "font-variant",
        initialValue: "normal",
        values: [
            {
                type: "token",
                tokens: ["normal", "small-caps", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "font-weight",
        presentationAttributeName: "font-weight",
        initialValue: "normal",
        values: [
            {
                type: "token",
                tokens: [
                    "normal",
                    "bold",
                    "bolder",
                    "lighter",
                    "100",
                    "200",
                    "300",
                    "400",
                    "500",
                    "600",
                    "700",
                    "800",
                    "900",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "image-rendering",
        presentationAttributeName: "image-rendering",
        initialValue: "auto",
        values: [
            {
                type: "token",
                tokens: [
                    "auto",
                    "optimizeSpeed",
                    "optimizeQuality",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["image"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "isolation",
        presentationAttributeName: null,
        initialValue: "auto",
        values: [
            {
                type: "token",
                tokens: ["isolate", "auto", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [
            ...g,
            "svg",
            "g",
            "a",
            "use",
            "symbol",
            "marker",
            "textPath",
            "tspan",
        ],
        animatable: !1,
        inheritable: !1,
    },
    {
        name: "letter-spacing",
        presentationAttributeName: "letter-spacing",
        initialValue: "normal",
        values: [
            { type: "number" },
            { type: "length" },
            { type: "token", tokens: ["normal", "inherit", "initial", "unset"] },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "lighting-color",
        presentationAttributeName: "lighting-color",
        initialValue: "#fff",
        values: [
            { type: "color" },
            {
                type: "token",
                tokens: ["currentColor", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: ["feDiffuseLighting", "feSpecularLighting"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "line-height",
        presentationAttributeName: "line-height",
        initialValue: "normal",
        values: [
            { type: "number", min: 0 },
            { type: "percentage", min: 0 },
            { type: "length", min: 0 },
            { type: "token", tokens: ["normal", "inherit", "initial", "unset"] },
        ],
        appliesTo: ["text", "tspan", "textPath", "text a"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "marker",
        presentationAttributeName: "marker",
        initialValue: "none",
        values: [
            { type: "url" },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: [...x],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "marker-start",
        presentationAttributeName: "marker-start",
        initialValue: "none",
        values: [
            { type: "url" },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: [...x],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "marker-mid",
        presentationAttributeName: "marker-mid",
        initialValue: "none",
        values: [
            { type: "url" },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: [...x],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "marker-end",
        presentationAttributeName: "marker-end",
        initialValue: "none",
        values: [
            { type: "url" },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: [...x],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "mask",
        presentationAttributeName: "mask",
        initialValue: "none",
        values: [
            { type: "url" },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: [...g, "g", "a", "svg", "use"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "mix-blend-mode",
        presentationAttributeName: null,
        initialValue: "normal",
        values: [
            {
                type: "token",
                tokens: [
                    "normal",
                    "multiply",
                    "screen",
                    "overlay",
                    "darken",
                    "lighten",
                    "color-dodge",
                    "color-burn",
                    "hard-light",
                    "soft-light",
                    "difference",
                    "exclusion",
                    "hue",
                    "saturation",
                    "color",
                    "luminosity",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: [
            ...g,
            "svg",
            "g",
            "a",
            "use",
            "symbol",
            "marker",
            "textPath",
            "tspan",
        ],
        animatable: !1,
        inheritable: !1,
    },
    {
        name: "opacity",
        presentationAttributeName: "opacity",
        initialValue: "1",
        values: [
            { type: "number" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: [
            ...g,
            "svg",
            "g",
            "a",
            "use",
            "symbol",
            "marker",
            "textPath",
            "tspan",
        ],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "overflow",
        presentationAttributeName: "overflow",
        initialValue: "visible",
        values: [
            {
                type: "token",
                tokens: [
                    "visible",
                    "hidden",
                    "scroll",
                    "auto",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["svg", "symbol", "pattern", "marker", "image"],
        inheritable: !1,
        animatable: !0,
    },
    {
        name: "paint-order",
        presentationAttributeName: null,
        initialValue: "normal",
        values: [
            { type: "token", tokens: ["normal"] },
            { type: "token-list", tokens: ["fill", "stroke", "markers"] },
        ],
        appliesTo: [...w],
        inheritable: !0,
        animatable: !0,
    },
    {
        name: "pointer-events",
        presentationAttributeName: "pointer-events",
        initialValue: "auto",
        values: [
            {
                type: "token",
                tokens: [
                    "bounding-box",
                    "visiblePainted",
                    "visibleFill",
                    "visibleStroke",
                    "visible",
                    "painted",
                    "fill",
                    "stroke",
                    "all",
                    "none",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: [...g, "svg", "g", "a", "use"],
        inheritable: !0,
        animatable: !0,
    },
    {
        name: "shape-rendering",
        presentationAttributeName: "shape-rendering",
        initialValue: "auto",
        values: [
            {
                type: "token",
                tokens: [
                    "auto",
                    "optimizeSpeed",
                    "crispEdges",
                    "geometricPrecision",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: [...x],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stop-color",
        presentationAttributeName: "stop-color",
        initialValue: "#000",
        values: [
            { type: "color" },
            {
                type: "token",
                tokens: ["currentColor", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: ["stop"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "stop-opacity",
        presentationAttributeName: "stop-opacity",
        initialValue: "1",
        values: [
            { type: "number" },
            { type: "percentage" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: ["stop"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "stroke",
        presentationAttributeName: "stroke",
        initialValue: "none",
        values: [
            { type: "color" },
            { type: "url" },
            {
                type: "token",
                tokens: ["none", "currentColor", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stroke-dasharray",
        presentationAttributeName: "stroke-dasharray",
        initialValue: "none",
        values: [
            { type: "dasharray" },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stroke-dashoffset",
        presentationAttributeName: "stroke-dashoffset",
        initialValue: "0",
        values: [
            { type: "number" },
            { type: "percentage" },
            { type: "length" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stroke-linecap",
        presentationAttributeName: "stroke-linecap",
        initialValue: "butt",
        values: [
            {
                type: "token",
                tokens: ["butt", "round", "square", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stroke-linejoin",
        presentationAttributeName: "stroke-linejoin",
        initialValue: "miter",
        values: [
            {
                type: "token",
                tokens: ["miter", "round", "bevel", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stroke-miterlimit",
        presentationAttributeName: "stroke-miterlimit",
        initialValue: "4",
        values: [
            { type: "number", min: 1 },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stroke-opacity",
        presentationAttributeName: "stroke-opacity",
        initialValue: "1",
        values: [
            { type: "number" },
            { type: "percentage" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "stroke-width",
        presentationAttributeName: "stroke-width",
        initialValue: "1",
        values: [
            { type: "number" },
            { type: "percentage" },
            { type: "length" },
            { type: "token", tokens: ["inherit", "initial", "unset"] },
        ],
        appliesTo: [...w],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "text-anchor",
        presentationAttributeName: "text-anchor",
        initialValue: "start",
        values: [
            {
                type: "token",
                tokens: ["start", "middle", "end", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "text-decoration",
        presentationAttributeName: "text-decoration",
        initialValue: "none",
        values: [
            { type: "token-list", tokens: ["underline", "overline", "line-through"] },
            { type: "token", tokens: ["none", "inherit", "initial", "unset"] },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "text-rendering",
        presentationAttributeName: "text-rendering",
        initialValue: "auto",
        values: [
            {
                type: "token",
                tokens: [
                    "auto",
                    "optimizeSpeed",
                    "optimizeLegibility",
                    "geometricPrecision",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "text-transform",
        presentationAttributeName: null,
        initialValue: "none",
        values: [
            {
                type: "token",
                tokens: [
                    "capitalize",
                    "uppercase",
                    "lowercase",
                    "none",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !1,
        inheritable: !0,
    },
    {
        name: "unicode-bidi",
        presentationAttributeName: "unicode-bidi",
        initialValue: "normal",
        values: [
            {
                type: "token",
                tokens: [
                    "normal",
                    "embed",
                    "bidi-override",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !1,
        inheritable: !1,
    },
    {
        name: "vector-effect",
        presentationAttributeName: "vector-effect",
        initialValue: "none",
        values: [
            {
                type: "token",
                tokens: ["non-scaling-stroke", "none", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...g, "use"],
        animatable: !0,
        inheritable: !1,
    },
    {
        name: "visibility",
        presentationAttributeName: "visibility",
        initialValue: "visible",
        values: [
            {
                type: "token",
                tokens: ["visible", "hidden", "inherit", "initial", "unset"],
            },
        ],
        appliesTo: [...g, "text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "word-spacing",
        presentationAttributeName: "word-spacing",
        initialValue: "normal",
        values: [
            { type: "number" },
            { type: "length" },
            { type: "token", tokens: ["normal", "inherit", "initial", "unset"] },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "white-space",
        presentationAttributeName: "white-space",
        initialValue: "normal",
        values: [
            {
                type: "token",
                tokens: [
                    "normal",
                    "pre",
                    "nowrap",
                    "pre-wrap",
                    "pre-line",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "textPath", "tspan"],
        animatable: !0,
        inheritable: !0,
    },
    {
        name: "writing-mode",
        presentationAttributeName: "writing-mode",
        initialValue: "horizontal-tb",
        values: [
            {
                type: "token",
                tokens: [
                    "horizontal-tb",
                    "vertical-lr",
                    "vertical-rl",
                    "inherit",
                    "initial",
                    "unset",
                ],
            },
        ],
        appliesTo: ["text", "tspan", "textPath"],
        animatable: !1,
        inheritable: !0,
    },
];
const V = j.map((e) => e.presentationAttributeName).filter((e) => e);
const sleep = (t) =>
    new Promise((e) => {
        setTimeout(() => e(), t);
    });
const H = (a) => {
    let i = null;
    if (S["includes"](a["localName"])) {
        let l = getComputedStyle(a)["clipPath"];
        if (l) {
            let e = l["substring"](6, l.length - 2),
                t = Ki(a)["querySelector"]("#" + CSS["escape"](e)) || null;
            "clipPath" === t?.["localName"] && (i = t);
        }
    }
    return i;
};
const fs = (t, ...l) => {
    let a = [];
    for (let e = 0; e < t.length; e += 1) {
        a.push(t[e]);
        void 0 !== l[e] && a.push(l[e]);
    }
    let e =
        '<svg id="x-stub" xmlns="http://www.w3.org/2000/svg">' +
        a["join"]("") +
        "</svg>";
    xs.innerHTML = e;
    let i = document.importNode(xs.content, !0);
    let n = i.querySelector("svg#x-stub");
    if (1 === n.children.length) return n.firstElementChild;
    for (let e of [...n.childNodes]) i.appendChild(e);
    n.remove();
    return i;
};
function ks(e, t = 500) {
    let l, a, i;
    return () => {
        l = this;
        a = arguments;
        if (!i) {
            i = setTimeout(() => {
                e.apply(l, a);
                i = null;
            }, t);
        }
    };
}


function Cs(ay, az, aA, aB = !0x1) {
    let aC = null;
    let aD = null;
    return (...aE) => {
        let aF = aB && !aC;
        clearTimeout(aC);
        aC = setTimeout(() => {
            aC = null;
            aB || (aD = ay['apply'](aA, aE));
        }, az);
        aF && (aD = ay['apply'](aA, aE));
        return aD;
    };
}

const us = (t, l = "element-") => {
    let a = document;
    for (let e = t.parentNode; e; e = e.parentNode)
        if (
            e.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
            e.nodeType === Node.DOCUMENT_NODE
        ) {
            a = e;
            break;
        }
    for (let t = 0; t < Infinity; t += 1) {
        let e = l + t;
        if (!a.querySelector("#" + e)) return e;
    }
};
const ns = (e, t) => {
    for (; (e = e.parentNode);) if (e.contains && e.contains(t)) return e;
    return null;
};
const os = (t) => {
    let l = [];
    for (let e of t) l.push(e);
    l.sort((e, t) => 3 - (6 & e.compareDocumentPosition(t)));
    return l;
};
const ja = (n, e) => {
    let t = getComputedStyle(n);
    let l = Na(n);
    !1 === n.isConnected &&
        console.warn("setAppearance() called with a disconnected element.");
    for (let i of l) {
        let a = e[i];
        if (void 0 === a) {
            n.style[i] = null;
            n.removeAttribute(i);
        } else {
            if ("fill" === i || "stroke" === i) {
                if (
                    a.startsWith("<linearGradient") ||
                    a.startsWith("<radialGradient")
                ) {
                    let e = Ki(n);
                    let t = e.querySelector("defs");
                    let l = fs`${a}`;
                    l.id = us(e, "gradient-");
                    (t || e).append(l);
                    n.style[i] = "url(#" + l.id + ")";
                } else t[i] !== a && (n.style[i] = a);
            } else t[i] !== a && (n.style[i] = a);
        }
    }
};
const Na = (e) => {
    let t = [];
    w.includes(e.localName) && t.push(..._a);
    g.includes(e.localName) && t.push(...Fa);
    Ua.includes(e.localName) && t.push(...Ga);
    return t;
};
const Pi = (e) => e.replace(/([A-Z])/g, (e) => "-" + e.toLowerCase());
const hi = (e, t) =>
    new DOMRect(
        te(e["x"], t),
        te(e["y"], t),
        te(e["width"], t),
        te(e["height"], t)
    );
const di = (e, t) => {
    const l = [
        new DOMPoint(e["x"], e["y"]),
        new DOMPoint(e["x"] + e["width"], e["y"]),
        new DOMPoint(e["x"] + e["width"], e["y"] + e["height"]),
        new DOMPoint(e["x"], e["y"] + e["height"]),
    ].map((e) => e.matrixTransform(t));
    const a = l.map((e) => e["x"]);
    const i = l.map((e) => e["y"]);
    const n = Vt(...a);
    const r = Vt(...i);
    const s = Ht(...a);
    const o = Ht(...i);
    return new DOMRect(n, r, s - n, o - r);
};
const ni = (e, t, l) => {
    let a = new ee(e, t);
    let i = new ee(e, l);
    let n = _t(i["y"], i["x"]) - _t(a["y"], a["x"]);
    return oi(li(n));
};
const oi = (e) => {
    for (; e < -180;) e += 360;
    for (; e > 180;) e -= 360;
    return e;
};
const ai = (e, t = 15) => {
    let l = oi(e);
    let a = [];
    for (let e = -180; e <= 180; e += t) a.push(e);
    return a.reduce((e, t) => (Ft(t - l) < Ft(e - l) ? t : e));
};
const ii = (e, t, l = 22.5) => {
    let a = new DOMPoint(e["x"], e["y"] - 1e3);
    let i = ni(e, a, t);
    let n = [];
    for (let e = -180; e <= 180; e += l) n.push(e);
    let r = Infinity;
    for (let t of n) {
        let e = t - i;
        Ft(e) < Ft(r) && (r = e);
    }
    i += r;
    let s = ri(i - 90);
    let o = Kt(e, t);
    let u = new ee(Bt(s), It(s));
    return (u.length = o), [new DOMPoint(e["x"] + u["x"], e["y"] + u["y"]), i];
};
const li = (e) => e * (180 / jt);
const ri = (e) => (jt * e) / 180;
const ci = (t) => {
    if (0 === t.length) return new DOMRect(0, 0, 0, 0);
    if (1 === t.length) {
        let e = t[0];
        return new DOMRect(e["x"], e["y"], e["width"], e["height"]);
    }
    const e = Math.min(...t.map((e) => e["x"]));
    const l = Math.min(...t.map((e) => e["y"]));
    const a = Math.max(...t.map((e) => e["x"] + e["width"]));
    const i = Math.max(...t.map((e) => e["y"] + e["height"]));
    return new DOMRect(e, l, a - e, i - l);
};
const pi = (e, t) =>
    t["x"] >= e["x"] &&
    t["y"] >= e["y"] &&
    t["x"] + t["width"] <= e["x"] + e["width"] &&
    t["y"] + t["height"] <= e["y"] + e["height"];
const xi = (e, t) =>
    e["left"] <= t["right"] &&
    t["left"] <= e["right"] &&
    e["top"] <= t["bottom"] &&
    t["top"] <= e["bottom"];
const Ki = (t) => {
    let l = "svg" === t.localName ? t : null;
    for (let e = t.ownerSVGElement; e; e = e.ownerSVGElement) l = e;
    return l;
};
const Qi = (t) => {
    for (let e in t.parentElement.children) {
        if (t.parentElement.children[e] === t) return parseInt(e);
    }
};
const Bi = (t) => {
    let l = Ri(t);
    let a = 0;
    let i = 0;
    for (let e = l[0]["parentElement"]; t["contains"](e); e = e["parentElement"])
        if (
            ("tspan" === e.localName || "text" === e.localName) &&
            e["x"].baseVal["length"] > 0
        ) {
            a = e["x"].baseVal[0].value;
            break;
        }
    for (let e = l[0]["parentElement"]; t["contains"](e); e = e["parentElement"])
        if (
            ("tspan" === e.localName || "text" === e.localName) &&
            e["y"].baseVal.length > 0
        ) {
            i = e["y"].baseVal[0].value;
            break;
        }
    return new DOMPoint(a, i);
};
const Ui = (e) => {
    let t = getComputedStyle(e);
    let l = {};
    let a = {};
    for (let e of j)
        if (
            e.appliesTo.includes("text") ||
            e.appliesTo.includes("tspan") ||
            e.appliesTo.includes("textPath")
        ) {
            if ("font" === e.name || "display" === e.name) continue;
            !0 === e.inheritable
                ? (l[e.name] = t.getPropertyValue(e.name))
                : !1 === e.inheritable && (a[e.name] = t.getPropertyValue(e.name));
        }
    return [l, a];
};
const Gi = (e) => {
    let l = 0;
    for (let t of e.querySelectorAll("tspan"))
        if (
            _i(t) &&
            t["dy"].baseVal.length > 0 &&
            t["dy"].baseVal[0].unitType === SVGLength.SVG_LENGTHTYPE_EMS
        ) {
            let e = t["dy"].baseVal[0].valueInSpecifiedUnits;
            l = te(e - 1, 2);
            break;
        }
    return l;
};
const _i = (e) => "tspan" === e.localName && "​" === e.textContent;
const Fi = (t) => {
    if ("text" === t["localName"]) {
        for (let e of t["querySelectorAll"]("tspan")) if (_i(e)) return !0;
    }
    return !1;
};
const ji = (e, l) => {
    let a = null;
    let i = null;
    let n = 0;
    let r = 0;
    for (let t of Ri(e)) {
        for (let e = 0; e <= t.textContent.length; e += 1, r += 1) {
            if (r === l) {
                if (0 === e && a) {
                    i = a;
                    n = a.textContent.length;
                } else {
                    i = t;
                    n = e;
                }
            }
        }
        r -= 1;
        a = t;
    }
    return [i, n];
};
const Ii = (e) => {
    let t = Ri(e);
    let i = [];
    for (let a of t) {
        let e = a.closest("*");
        let t = getComputedStyle(e).textTransform;
        let l = a.textContent;
        "uppercase" === t
            ? (l = l.toUpperCase())
            : "lowercase" === t
                ? (l = l.toLowerCase())
                : "capitalize" === t && (l = Si(l));
        i.push(...l.split(""));
    }
    return i;
};
const Ni = (t, l) => {
    let a = t.closest("text");
    let i = 0;
    let n = -1;
    for (let e of Ri(a)) {
        if (e === t) {
            n = i + l;
            break;
        }
        i += e.length;
    }
    return [a, n];
};
const Ti = (i, n = null) => {
    let t = Li(i);
    let e = n && i.contains(n.commonAncestorContainer);
    let r = e ? Ni(n.startContainer, n.startOffset)[1] : -1;
    let s = e ? Ni(n.endContainer, n.endOffset)[1] : -1;
    if (e && r !== s) {
        let n = [];
        for (let i of t.childItems) {
            let t = null;
            if (
                (r >= i.startOffset && s <= i.endOffset
                    ? (t = [
                        i.textContent.slice(0, r - i.startOffset),
                        i.textContent.slice(r - i.startOffset, s - i.startOffset),
                        i.textContent.slice(s - i.startOffset),
                    ])
                    : r >= i.startOffset && r < i.endOffset
                        ? (t = [
                            i.textContent.slice(0, r - i.startOffset),
                            i.textContent.slice(r - i.startOffset),
                        ])
                        : s > i.startOffset &&
                        s <= i.endOffset &&
                        (t = [
                            i.textContent.slice(0, s - i.startOffset),
                            i.textContent.slice(s - i.startOffset),
                        ]),
                    null === t)
            )
                n.push(i);
            else {
                let e = i.startOffset;
                let a = 0;
                for (let l of t)
                    if (l.length > 0) {
                        let t = {
                            textContent: l,
                            href: i.href,
                            inheritableProperties: i.inheritableProperties,
                            nonInheritableProperties: i.nonInheritableProperties,
                            startOffset: e,
                            endOffset: e + l.length,
                            x: [],
                            y: [],
                            dx: [],
                            dy: [],
                            rotate: [],
                        };
                        for (let e = 0; e < l.length; e += 1) {
                            t.x.push(i.x[a]);
                            t.y.push(i.y[a]);
                            t.dx.push(i.dx[a]);
                            t.dy.push(i.dy[a]);
                            t.rotate.push(i.rotate[a]);
                            a += 1;
                        }
                        n.push(t);
                        e += l.length;
                    }
            }
        }
        t.childItems = n;
    }
    i.removeAttribute("x");
    i.removeAttribute("y");
    i.removeAttribute("dx");
    i.removeAttribute("dy");
    i.removeAttribute("rotate");
    i.setAttribute("style", "");
    for (let e of V) i.hasAttribute(e) && i.removeAttribute(e);
    let l = getComputedStyle(i);
    for (let e of Object.keys(t.rootItem.inheritableProperties))
        l.getPropertyValue(e) !== t.rootItem.inheritableProperties[e] &&
            i.style.setProperty(e, t.rootItem.inheritableProperties[e]);
    for (let e of Object.keys(t.rootItem.nonInheritableProperties))
        l.getPropertyValue(e) !== t.rootItem.nonInheritableProperties[e] &&
            i.style.setProperty(e, t.rootItem.nonInheritableProperties[e]);
    let o = i.querySelector("textPath") || i;
    for (let e of [...o.childNodes])
        ("tspan" !== e.nodeName && "a" !== e.nodeName && "#text" !== e.nodeName) ||
            e.remove();
    if (t.childItems.length > 0)
        for (let a of t.childItems) {
            let l = Zi("svg:tspan");
            o.append(l);
            if (a.href) {
                let e = Zi("svg:a");
                e.setAttribute("_href", a.href);
                e.textContent = a.textContent;
                l.append(e);
            } else l.textContent = a.textContent;
            {
                let t = getComputedStyle(l);
                for (let e of Object.keys(a.inheritableProperties))
                    t.getPropertyValue(e) !== a.inheritableProperties[e] &&
                        l.style.setProperty(e, a.inheritableProperties[e]);
                for (let e of Object.keys(a.nonInheritableProperties))
                    t.getPropertyValue(e) !== a.nonInheritableProperties[e] &&
                        l.style.setProperty(e, a.nonInheritableProperties[e]);
            }
            {
                let e = a.x.filter((e) => "auto" !== e);
                e.length > 0 && l.setAttribute("x", e.join(" "));
            }
            {
                let e = a.y.filter((e) => "auto" !== e);
                e.length > 0 && l.setAttribute("y", e.join(" "));
            }
            {
                let t = [...a.dx];
                for (let e = t.length - 1; e >= 0 && "0" === t[e]; e -= 1) t.pop();
                t.length > 0 && l.setAttribute("dx", t.join(" "));
            }
            {
                let t = [...a.dy];
                for (let e = t.length - 1; e >= 0 && "0" === t[e]; e -= 1) t.pop();
                t.length > 0 && l.setAttribute("dy", t.join(" "));
            }
            {
                let t = [...a.rotate];
                for (let e = t.length - 1; e >= 0 && t[e] === t[e - 1]; e -= 1) t.pop();
                1 === t.length && "0" === t[0] && (t = []);
                t.length > 0 && l.setAttribute("rotate", t.join(" "));
            }
        }
    if (e) {
        let l = 0;
        let a = null;
        for (let t of Ri(i)) {
            for (let e = 0; e <= t.textContent.length; e += 1, l += 1) {
                l === r && n.setStart(t, e);
                l === s &&
                    (0 === e && a ? n.setEnd(a, a.textContent.length) : n.setEnd(t, e));
            }
            l -= 1;
            a = t;
        }
    }
};
const Ai = (i, n) => {
    let e = n && i.contains(n.commonAncestorContainer);
    let r = e ? Ni(n.startContainer, n.startOffset)[1] : -1;
    let s = e ? Ni(n.endContainer, n.endOffset)[1] : -1;
    {
        Ti(i, null);
        let t = i.querySelector("textPath") || i;
        let e = t.querySelectorAll("tspan");
        let l = 1 === e.length ? e[0] : null;
        if (0 === l?.style.length) {
            for (let e of l.childNodes) t.append(e);
            for (let e of ["x", "y", "dx", "dy", "rotate"])
                l.hasAttribute(e) && i.setAttribute(e, l.getAttribute(e));
            l.remove();
        }
    }
    if (e) {
        let l = 0;
        let a = null;
        for (let t of Ri(i)) {
            for (let e = 0; e <= t.textContent.length; e += 1, l += 1) {
                l === r && n.setStart(t, e);
                l === s &&
                    (0 === e && a ? n.setEnd(a, a.textContent.length) : n.setEnd(t, e));
            }
            l -= 1;
            a = t;
        }
    }
};
const $i = (l, e = null) => {
    null === e && (e = l.commonAncestorContainer.closest("text"));
    let t = (e.querySelector("textPath") || e).querySelectorAll("tspan");
    let a = [];
    if (t.length > 0) {
        if (l) {
            for (let e of t) l.intersectsNode(e) && a.push(e);
        }
        if (a.length > 0) {
            let t = "backward" === l.direction ? a[a.length - 1] : a[0];
            let e = a.filter((e) => e !== t);
            a = [t, ...e];
        }
    }
    return a;
};
const Li = (p) => {
    let n = { rootItem: null, childItems: [] };
    {
        let [e, t] = Ui(p);
        const l = { inheritableProperties: e, nonInheritableProperties: t };
        n.rootItem = l;
    }
    {
        let e = 0;
        for (let u of Ri(p)) {
            let a = {
                textContent: u.textContent,
                href: null,
                inheritableProperties: {},
                nonInheritableProperties: {},
                isLineBreak: !1,
                x: [],
                y: [],
                dx: [],
                dy: [],
                rotate: [],
                startOffset: e,
                endOffset: e + u.length,
            };
            e += u.length;
            "​" === u.textContent && (a.isLineBreak = !0);
            if (!1 === a.isLineBreak) {
                for (let e = u.parentNode; e !== p; e = e.parentNode)
                    if ("a" === e.localName && e.hasAttribute("_href")) {
                        a.href = e.getAttribute("_href");
                        break;
                    }
            }
            if (!1 === a.isLineBreak) {
                let e = u.closest("tspan, text");
                let [t, l] = Ui(e);
                a.inheritableProperties = t;
                e !== p && (a.nonInheritableProperties = l);
            }
            {
                let i = [];
                let n = [];
                let r = [];
                let s = [];
                let o = [];
                for (let a = u.parentNode; p.contains(a); a = a.parentNode)
                    if ("tspan" === a.localName || "text" === a.localName) {
                        let l = 0;
                        for (let e of Ri(a)) {
                            if (e === u) break;
                            l += e.length;
                        }
                        for (
                            let e = l, t = 0;
                            a.x.baseVal.length, t < u.length;
                            e += 1, t += 1
                        )
                            void 0 === i[t] &&
                                void 0 !== a.x.baseVal[e] &&
                                (i[t] = a.x.baseVal[e].valueAsString);
                        for (
                            let e = l, t = 0;
                            a.y.baseVal.length, t < u.length;
                            e += 1, t += 1
                        )
                            void 0 === n[t] &&
                                void 0 !== a.y.baseVal[e] &&
                                (n[t] = a.y.baseVal[e].valueAsString);
                        for (
                            let e = l, t = 0;
                            a.dx.baseVal.length, t < u.length;
                            e += 1, t += 1
                        )
                            void 0 === r[t] &&
                                void 0 !== a.dx.baseVal[e] &&
                                (r[t] = a.dx.baseVal[e].valueAsString);
                        for (
                            let e = l, t = 0;
                            a.dy.baseVal.length, t < u.length;
                            e += 1, t += 1
                        )
                            void 0 === s[t] &&
                                void 0 !== a.dy.baseVal[e] &&
                                (s[t] = a.dy.baseVal[e].valueAsString);
                        for (
                            let e = l, t = 0;
                            a.rotate.baseVal.length, t < u.length;
                            e += 1, t += 1
                        )
                            void 0 === o[t] &&
                                void 0 !== a.rotate.baseVal[e] &&
                                (o[t] = "" + a.rotate.baseVal[e].value);
                    }
                let t = "0";
                for (let e = 0; e < u.length; e += 1) {
                    void 0 === i[e] && (i[e] = "auto");
                    void 0 === n[e] && (n[e] = "auto");
                    void 0 === r[e] && (r[e] = "0");
                    void 0 === s[e] && (s[e] = "0");
                    void 0 === o[e] && (o[e] = t);
                    t = o[e];
                }
                a.x = i;
                a.y = n;
                a.dx = r;
                a.dy = s;
                a.rotate = o;
            }
            n.childItems.push(a);
        }
    }
    for (let t of n.childItems)
        for (let e of Object.keys(t.inheritableProperties))
            n.rootItem.inheritableProperties[e] === t.inheritableProperties[e] &&
                delete t.inheritableProperties[e];
    {
        let e = n.childItems.filter((e) => !e.isLineBreak);
        if (e.length > 0) {
            let [a, ...i] = e;
            for (let l of Object.keys(a.inheritableProperties)) {
                let t = !0;
                for (let e of i)
                    e.inheritableProperties[l] !== a.inheritableProperties[l] && (t = !1);
                if (t) {
                    n.rootItem.inheritableProperties[l] = a.inheritableProperties[l];
                    for (let e of n.childItems) delete e.inheritableProperties[l];
                }
            }
        }
    }
    if (n.childItems.length > 1) {
        let t = [];
        let l = null;
        for (let e of n.childItems) {
            if (l && l.href === e.href && ki(l.nonInheritableProperties, e.nonInheritableProperties) && ki(l.inheritableProperties, e.inheritableProperties) &&
                (!1 === l.x.includes("auto") || 0 === e.x.length || be(e.x, "auto")) &&
                (!1 === l.y.includes("auto") || 0 === e.y.length || be(e.y, "auto")) &&
                !1 === l.isLineBreak &&
                !1 === e.isLineBreak
            ) {
                (l.textContent += e.textContent);
                l.x.push(...e.x);
                l.y.push(...e.y);
                l.dx.push(...e.dx);
                l.dy.push(...e.dy);
                l.rotate.push(...e.rotate);
                (l.endOffset = e.endOffset);
            } else {
                t.push(e);
                (l = e);
            }
        }
        n.childItems = t;
    }
    return n;
};
const Ri = (l) => {
    let a = [];
    if (l.closest("text")) {
        let e = [];
        let t = document.createTreeWalker(l, NodeFilter.SHOW_TEXT);
        for (; t.nextNode();) e.push(t.currentNode);
        for (let l of e) {
            let t = l.parentElement;
            if (
                "text" === t.localName ||
                "tspan" === t.localName ||
                "textPath" === t.localName
            )
                t.getNumberOfChars() > 0 && a.push(l);
            else {
                if ("a" === t.localName) {
                    let e = t.getBBox();
                    (0 === e.x && 0 === e.y && 0 === e.width && 0 === e.height) ||
                        a.push(l);
                }
            }
        }
    }
    return a;
};
const yi = (r, e) => {
    let s = e["x"];
    let o = e["y"];
    let u = !1;
    for (let i = 0, n = r["length"] - 1; i < r["length"]; n = i++) {
        let e = r[i]["x"];
        let t = r[i]["y"];
        let l = r[n]["x"];
        let a = r[n]["y"];
        t > o != a > o && s < ((l - e) * (o - t)) / (a - t) + e && (u = !u);
    }
    return u;
};
const ki = (e, t) => JSON.stringify(e) === JSON.stringify(t);
const Ci = (e, t, l) => e.split(t).join(l);
const Si = (e) => e.replace(/(^|[\s-])(\w)/g, (e, t, l) => t + l.toUpperCase());
const fi = (e, t, l) =>
    bi(e, t, new DOMPoint(l["x"], l["y"]), new DOMPoint(l["right"], l["y"])) ||
    bi(
        e,
        t,
        new DOMPoint(l["right"], l["y"]),
        new DOMPoint(l["right"], l["bottom"])
    ) ||
    bi(
        e,
        t,
        new DOMPoint(l["right"], l["bottom"]),
        new DOMPoint(l["x"], l["bottom"])
    ) ||
    bi(e, t, new DOMPoint(l["x"], l["bottom"]), new DOMPoint(l["x"], l["y"]));
const bi = (e, t, l, a, i = 1e-7) => {
    let n = vi(e, t, l, a);
    return (
        !!n &&
        n["x"] + i >= Vt(l["x"], a["x"]) &&
        n["x"] - i <= Ht(l["x"], a["x"]) &&
        n["y"] + i >= Vt(l["y"], a["y"]) &&
        n["y"] - i <= Ht(l["y"], a["y"])
    );
};
const wi = (e, t) => {
    let l = t["y"] - e["y"];
    let a = e["x"] - t["x"];
    return [l, a, l * e["x"] + a * e["y"]];
};
const vi = (e, t, l, a) => {
    let [i, n, r] = wi(e, t);
    let [s, o, u] = wi(l, a);
    let p = i * o - s * n;
    let f = null;
    0 !== p && (f = new DOMPoint((o * r - n * u) / p, (i * u - s * r) / p));
    return f;
};
const Wi = (l, e = !0) => {
    let n = new DOMRect(0, 0, 0, 0);
    let t = e ? H(l) : null;
    if (t) {
        n = ((e, t) => {
            let l = Math["max"](e["left"], t["left"]);
            let a = Math["min"](e["right"], t["right"]);
            let i = Math["max"](e["top"], t["top"]);
            let n = Math["min"](e["bottom"], t["bottom"]);
            return new DOMRect(l, i, a - l, n - i);
        })(Wi(l, !1), di(DOMRect["fromRect"](t["getBBox"]()), ct(t)));
    }
    else {
        if ("tspan" === l.localName) {
            let e = Ri(l);
            let t = document.createRange();
            if (
                (e.length > 0 &&
                    (t.setStart(e[0], 0),
                        t.setEnd(e[e.length - 1], e[e.length - 1]["length"])),
                    !1 === t.collapsed)
            ) {
                let l = t.startContainer.closest("text");
                let [, e] = Ni(t.startContainer, t.startOffset);
                let [, a] = Ni(t.endContainer, t.endOffset);
                let i = [];
                for (let t = e; t < a; t += 1) {
                    let e = l.getExtentOfChar(t);
                    i.push(e);
                }
                n = ci(i);
            }
        } else
            n =
                "use" === l.localName
                    ? new DOMRect(
                        0,
                        0,
                        l["width"]["baseVal"]["value"],
                        l["height"]["baseVal"]["value"]
                    )
                    : DOMRect["fromRect"](l["getBBox"]());
    }
    return n;
};
const lt = (e, t) =>
    e.is2D
        ? new DOMMatrix([
            te(e["a"], t),
            te(e["b"], t),
            te(e["c"], t),
            te(e["d"], t),
            te(e["e"], t),
            te(e["f"], t),
        ])
        : new DOMMatrix([
            te(e["m11"], t),
            te(e["m12"], t),
            te(e["m13"], t),
            te(e["m14"], t),
            te(e["m21"], t),
            te(e["m22"], t),
            te(e["m23"], t),
            te(e["m24"], t),
            te(e["m31"], t),
            te(e["m32"], t),
            te(e["m33"], t),
            te(e["m34"], t),
            te(e["m41"], t),
            te(e["m42"], t),
            te(e["m43"], t),
            te(e["m44"], t),
        ]);
const ct = (t) => {
    const e = (() => {
        const e = t.transform?.baseVal?.consolidate();
        return e ? DOMMatrix.fromMatrix(e.matrix) : new DOMMatrix();
    })();
    return e;
};
const bt = (t) => {
    let l;
    let a;
    if (t.hasAttribute("data-bx-origin")) {
        let e = t.getAttribute("data-bx-origin")["split"](" ");
        l = parseFloat(e[0]);
        a = parseFloat(e[1]);
    } else {
        l = 0.5;
        a = 0.5;
    }
    return new DOMPoint(l, a);
};
const ot = ["px", "cm", "mm", "in", "pt", "pc", "q"];
const gt = (s) => {
    let o = new DOMMatrix();
    let u = null;
    s.hasAttribute("viewBox") && (u = nt.fromString(s.getAttribute("viewBox")));
    if (u) {
        let e = s.style.width || s.getAttribute("width") || null;
        let t = s.style.height || s.getAttribute("height") || null;
        let n = null === e ? null : window.CSSUnitValue.parse(e);
        let r = null === t ? null : window.CSSUnitValue.parse(t);
        if (n && ot.includes(n.unit) && r && ot.includes(r.unit)) {
            let e = st.fromString(
                s.getAttribute("preserveAspectRatio") || "xMidYMid meet"
            );
            n = n.to("px");
            r = r.to("px");
            let t = n.value / u.width;
            let l = r.value / u.height;
            "none" !== e.align && "meet" === e.meetOrSlice
                ? t > l
                    ? (t = l)
                    : l > t && (l = t)
                : "none" !== e.align &&
                "slice" === e.meetOrSlice &&
                (t < l ? (t = l) : l < t && (l = t));
            let a = 0 - u.x * t;
            let i = 0 - u.y * l;
            e.align.includes("xMid") && (a += (n.value - u.width * t) / 2);
            e.align.includes("xMax") && (a += n.value - u.width * t);
            e.align.includes("YMid") && (i += (r.value - u.height * l) / 2);
            e.align.includes("YMax") && (i += r.value - u.height * l);
            o.translateSelf(a, i);
            o.scaleSelf(t, l);
        }
    }
    return o;
};
const ft = (t, l) => {
    let a = new DOMMatrix();
    "" === t && (t = "px");
    "" === l && (l = "px");
    if (t !== l) {
        let e = 1;
        if ("px" === t) e = 1;
        else {
            if ("cm" === t) e = (96 / 2.54) * 1;
            else {
                if ("mm" === t) e = (96 / 2.54 / 10) * 1;
                else {
                    if ("in" === t) e = 96;
                    else {
                        if ("pt" === t) e = (96 / 72) * 1;
                        else {
                            if ("pc" === t) e = 16;
                            else {
                                if ("q" !== t)
                                    throw new Error(
                                        "Can't transform relative units.",
                                        "OperationError"
                                    );
                                e = (96 / 2.54 / 40) * 1;
                            }
                        }
                    }
                }
            }
        }
        if ("px" === l) e /= 1;
        else {
            if ("cm" === l) e /= 96 / 2.54;
            else {
                if ("mm" === l) e /= 96 / 2.54 / 10;
                else {
                    if ("in" === l) e /= 96;
                    else {
                        if ("pt" === l) e /= 96 / 72;
                        else {
                            if ("pc" === l) e /= 16;
                            else {
                                if ("q" !== l)
                                    throw new Error(
                                        "Can't transform relative units.",
                                        "OperationError"
                                    );
                                e /= 96 / 2.54 / 40;
                            }
                        }
                    }
                }
            }
        }
        e = te(e, 12);
        a.scaleSelf(e, e);
    }
    return a;
};
const wt = (e, t, l = 6) => {
    let a = te(t["x"], l);
    let i = te(t["y"], l);
    e.setAttribute("data-bx-origin", a + " " + i);
};
const vt = (e) => {
    let t = Wi(e);
    let l = bt(e);
    return Ot(l, t);
};
const yt = (e) => {
    let t = ut(e);
    return vt(e).matrixTransform(t);
};
const kt = (l, e = !1) => {

    let a = l.map((e) => yt(e));
    let firstEl = a[0];
    let flag = true;

    for (let e of a) {
        if (Kt(e, firstEl) > 3) {
            flag = false;
            break;
        }
    }

    let n = null;
    if (flag) {
        if (e) {
            let e = l.map((e) => Yi(e));
            let t = ci(e);
            n = new DOMPoint(
                (a[0].x - t.x) / t.width,
                (a[0].y - t.y) / t.height
            );
        } else {
            n = a[0];
        }
    } else {
        if (e) {
            n = new DOMPoint(0.5, 0.5);
        }
        else {
            let e = l.map((e) => Yi(e));
            let t = ci(e);
            n = new DOMPoint(t.x + t.width / 2, t.y + t.height / 2);
        }
    }
    return n;
};

const St = (e, t = 0, l = null, a = null) => {
    let i = Ct(e);
    let n = ct(e);
    let r = ut(e);
    let s = r.inverse();
    null === a && (a = vt(e));
    let o = a.matrixTransform(r);
    let u = DOMMatrix.fromMatrix(n);
    u.multiplySelf(s);
    u.translateSelf(o["x"], o["y"]);
    u.rotateSelf(-i + t);
    u.translateSelf(-o["x"], -o["y"]);
    u.multiplySelf(r);
    null !== l && (u = lt(u, l));
    !1 === u.isIdentity
        ? e.setAttribute("transform", u.toString())
        : e.removeAttribute("transform");
};
const Ct = (i, n = null) => {
    let r = 0;
    if (b.includes(i.localName)) {
        ut(i).inverse();
        null === n && (n = vt(i));
        let e = n.matrixTransform(ut(i));
        Wi(i);
        let t = e;
        let l = new DOMPoint(e["x"] - 100, e["y"]);
        let a = new DOMPoint(n["x"] - 100, n["y"]).matrixTransform(ut(i));
        r = ni(t, l, a);
    }
    return r;
};
const Mt = (e, i, t = 3) => {
    let l = Re(e, !0);
    for (let a of l) {
        if (
            "M" === a.type ||
            "L" === a.type ||
            "R" === a.type ||
            "U" === a.type ||
            "N" === a.type
        ) {
            let e = new DOMPoint(a.values[0], a.values[1]).matrixTransform(i);
            a.values = [e["x"], e["y"]];
        } else {
            if ("C" === a.type) {
                let e = new DOMPoint(a.values[0], a.values[1]).matrixTransform(i);
                let t = new DOMPoint(a.values[2], a.values[3]).matrixTransform(i);
                let l = new DOMPoint(a.values[4], a.values[5]).matrixTransform(i);
                a.values = [e["x"], e["y"], t["x"], t["y"], l["x"], l["y"]];
            }
        }
        a.values = a.values.map((e) => te(e, t));
    }
    return l;
};
const Pt = (e, t, l, a = 0, i = 0) => {
    let n = DOMMatrix.fromMatrix(e);
    let r = ri(t);
    let s = ri(l);
    let o = new DOMMatrix();
    return (
        (o = Dt(o, Math.tan(r), Math.tan(s))),
        (n = zt(n, a, i)),
        n.multiplySelf(o),
        (n = zt(n, -a, -i)),
        n
    );
};
const Dt = (e, t, l) => {
    let a = DOMMatrix["fromMatrix"](e);
    let i = a["a"];
    let n = a["b"];
    return (
        (a["a"] += l * a["c"]),
        (a["b"] += l * a["d"]),
        (a["c"] += t * i),
        (a["d"] += t * n),
        a
    );
};
const zt = (e, t, l) => {
    let a = DOMMatrix["fromMatrix"](e);
    return (
        (a["e"] = a["e"] + t * a["a"] + l * a["c"]),
        (a["f"] = a["f"] + t * a["b"] + l * a["d"]),
        a
    );
};
const Ot = (e, t) =>
    new DOMPoint(t["x"] + e["x"] * t["width"], t["y"] + e["y"] * t["height"]);
const Et = (e, t) =>
    new DOMPoint(
        0 === t["width"] ? 0 : (e["x"] - t["x"]) / t["width"],
        0 === t["height"] ? 0 : (e["y"] - t["y"]) / t["height"]
    );
const Zt = (i, n, r, s = 0) => {
    if (0 === s)
        return (
            0 ===
            (i["x"] * (n["y"] - r["y"]) +
                n["x"] * (r["y"] - i["y"]) +
                r["x"] * (i["y"] - n["y"])) /
            2
        );
    {
        let e = new ee(i, n);
        let t = new ee(n, r);
        let l = At(e, t);
        let a = Ut(l / (e.length * t["length"]));
        if (isNaN(a)) return !0;
        return li(a) < s;
    }
};
const Kt = (e, t) => {
    let l = t["x"] - e["x"];
    l *= l;
    let a = t["y"] - e["y"];
    a *= a;
    return Math.sqrt(l + a);
};

const coordDistance = (e, t) => {
    return Kt(e, t);
}

const Qt = (e, t) => {
    let l = (e["x"] + t["x"]) / 2;
    let a = (e["y"] + t["y"]) / 2;
    return new DOMPoint(l, a);
};
const te = (e, t = 0) => {
    const l = Math.pow(10, t);
    return Math.round((e + Number.EPSILON) * l) / l;
};
const ie = (e, t, l = Infinity, a = null) => (
    null !== a && (e = te(e, a)), e < t ? (e = t) : e > l && (e = l), e
);
const qt = (e, t, l = null) =>
    null !== l
        ? te(e["x"], l) === te(t["x"], l) && te(e["y"], l) === te(t["y"], l)
        : e["x"] === t["x"] && e["y"] === t["y"];
const Xt = (e, t = 0) =>
    new DOMPoint(te(e["x"], t), te(e["y"], t), te(e["z"], t), te(e["w"], t));
const Jt = (e, t, l, a = !0) => {
    let i;
    let n = new DOMPoint(0, 0);
    let r = new DOMPoint(e["x"], e["y"]);
    let s = new DOMPoint(t["x"], t["y"]);
    let o = l;
    let u = new ee(n, r);
    let p = new ee(r, s);
    let f = new ee(r, o);
    let h = At(f, p);
    let c = At(p, p);
    i = 0 !== c ? h / c : 0;
    !1 === a && (i < 0 ? (i = 0) : i > 1 && (i = 1));
    let m = Lt(u, p["multiply"](i));
    return [new DOMPoint(m["x"], m["y"]), i];
};
const pt = (n, r, e = !1) => {
    let s;
    if (!1 === e)
        s = DOMMatrix["fromMatrix"](
            r["getScreenCTM"]()["inverse"]()["multiply"](n["getScreenCTM"]())
        );
    else {
        let t = null;
        let l = !1;
        let a = null;
        let i = !1;
        if ("path" === n["localName"]) {
            let e = n["ownerSVGElement"]["querySelector"](
                'textPath[href="#' + CSS["escape"](n["id"]) + '"]'
            );
            t = e ? e["closest"]("text") : null;
            l = !!e && null !== n["closest"]("defs");
        }
        if ("path" === r["localName"]) {
            let e = n["ownerSVGElement"]["querySelector"](
                'textPath[href="#' + CSS["escape"](r["id"]) + '"]'
            );
            a = e ? e["closest"]("text") : null;
            i = !!e && null !== r["closest"]("defs");
        }
        s =
            l && i
                ? ut(a)
                ["multiply"](ct(r))
                ["inverse"]()
                ["multiply"](ut(t))
                ["multiply"](ct(n))
                : l
                    ? ut(r)["inverse"]()["multiply"](ut(t))["multiply"](ct(n))
                    : i
                        ? ut(a)["multiply"](ct(r))["inverse"]()["multiply"](ut(n))
                        : ut(r)["inverse"]()["multiply"](ut(n));
    }
    return s;
};
const At = (e, t) => e["x"] * t["x"] + e["y"] * t["y"];
const $t = (e, t) => new ee(e["x"] - t["x"], e["y"] - t["y"]);
const Lt = (e, t) => new ee(e["x"] + t["x"], e["y"] + t["y"]);
let ut = (a, e = !1) => {
    if (!1 === e) return DOMMatrix.fromMatrix(a.getScreenCTM());
    else {
        let t = null;
        let l = !1;
        if ("path" === a["localName"]) {
            const i = a;
            let e = i["ownerSVGElement"]["querySelector"](
                'textPath[href="#' + CSS["escape"](a["id"]) + '"]'
            );
            t = e ? e["closest"]("text") : null;
            l = !!e && null !== a["closest"]("defs");
        }
        return l
            ? ut(t)["multiply"](ct(a))
            : DOMMatrix.fromMatrix(a.getScreenCTM());
    }
};
const Hi = (a, e, t, o, l, i) => {
    let u;
    let n = Ii(a)["filter"]((e) => "​" !== e);
    let r = n["join"](""),
        f = /[\u0590-\u05FF]/["test"](r);
    let h = /[\u0600-\u06FF]/["test"](r);
    u = f
        ? e["layout"](n["join"](""), "hebr", "hr", "ltr")
        : h
            ? e["layout"](n["join"](""), "arab", "ar", "ltr")
            : e["layout"](r);
    let c = i ? -14 : 0;
    let m = (1 / e["head"]["unitsPerEm"]) * t;
    let p = {
        moveTo: "M",
        lineTo: "L",
        quadraticCurveTo: "Q",
        bezierCurveTo: "C",
        closePath: "Z",
    };
    let y = e["hhea"]["ascent"];
    let d = e["hhea"]["descent"];
    let v = y / 20;
    let b = [];
    let g = [];
    let x = [];
    let M = [];
    for (let t = 0, l = 0; t < u["glyphs"]["length"]; t += 1) {
        let e = u["glyphs"][t];
        g["push"](a["getStartPositionOfChar"](l));
        x["push"](a["getEndPositionOfChar"](l));
        M["push"](a["getRotationOfChar"](l));
        l += e["codePoints"]["length"];
    }
    for (let s = 0; s < u["glyphs"]["length"]; s += 1) {
        let e = u["glyphs"][s];
        let a = e["advanceWidth"];
        let t = g[s];
        let l = x[s];
        let i = M[s];
        let n = e["path"]["commands"]["map"](({ command: e, args: t }) => ({
            type: p[e],
            values: [...t],
        }));
        if (o["includes"]("underline")) {
            let e = a;
            let t = v;
            let l = d / 3;
            n["push"](
                { type: "M", values: [0, l] },
                { type: "L", values: [e, l] },
                { type: "L", values: [e, l - t] },
                { type: "L", values: [0, l - t] },
                { type: "Z", values: [] }
            );
        }
        if (o["includes"]("overline")) {
            let e = a;
            let t = v;
            let l = y - v;
            n["push"](
                { type: "M", values: [0, l] },
                { type: "L", values: [e, l] },
                { type: "L", values: [e, l - t] },
                { type: "L", values: [0, l - t] },
                { type: "Z", values: [] }
            );
        }
        if (o["includes"]("line-through")) {
            let e = a;
            let t = v;
            let l = (y + d) / 2;
            n["push"](
                { type: "M", values: [0, l] },
                { type: "L", values: [e, l] },
                { type: "L", values: [e, l - t] },
                { type: "L", values: [0, l - t] },
                { type: "Z", values: [] }
            );
        }
        let r = [];
        for (let p of n) {
            let u = new DOMMatrix();
            if (
                (h || f
                    ? u["translateSelf"](l["x"], l["y"])
                    : u["translateSelf"](t["x"], t["y"]),
                    u["rotateSelf"](i),
                    (u = Pt(u, c, 0, 0, 0)),
                    u["scaleSelf"](m, -m, 1, 0, 0),
                    "M" === p["type"])
            ) {
                let [e, t] = p["values"];
                let l = new DOMPoint(e, t)["matrixTransform"](u);
                p["values"] = [l["x"], l["y"]];
            } else {
                if ("L" === p["type"]) {
                    let [e, t] = p["values"];
                    let l = new DOMPoint(e, t)["matrixTransform"](u);
                    p["values"] = [l["x"], l["y"]];
                } else {
                    if ("Q" === p["type"]) {
                        let [e, t, l, a] = p["values"];
                        let i = new DOMPoint(e, t)["matrixTransform"](u);
                        let n = new DOMPoint(l, a)["matrixTransform"](u);
                        p["values"] = [i["x"], i["y"], n["x"], n["y"]];
                    } else {
                        if ("C" === p["type"]) {
                            let [e, t, l, a, i, n] = p["values"];
                            let r = new DOMPoint(e, t)["matrixTransform"](u);
                            let s = new DOMPoint(l, a)["matrixTransform"](u);
                            let o = new DOMPoint(i, n)["matrixTransform"](u);
                            p["values"] = [r["x"], r["y"], s["x"], s["y"], o["x"], o["y"]];
                        }
                    }
                }
            }
            r["push"](p);
        }
        r["length"] > 0 && b["push"](r);
    }
    return b;
};
const Yi = (e, t = !0) => {
    const l = ut(e);
    const a = Wi(e, t);
    return di(a, l);
};
const Xi = (e) => {
    let t = document["createDocumentFragment"]();
    let l = document["createElementNS"](u["svg"], "svg");
    for (l["innerHTML"] = e; l["firstChild"];) t["append"](l["firstChild"]);
    return t["childElementCount"] > 1
        ? t
        : 1 === t["childElementCount"]
            ? t["children"][0]
            : null;
};
const Zi = (e, l = null) => {
    const a = e["split"](":");
    let i = null;
    if (1 === a.length) {
        let [e] = a;
        i = document["createElement"](e, l);
    } else {
        if (2 === a.length) {
            let [e, t] = a;
            "svg" === e && (i = document["createElementNS"](u["svg"], t, l));
        }
    }
    return i;
};
const Ig = (t) =>
    new Promise(async (a) => {
        let e = new Blob([t], { type: "image/svg+xml;charset=utf-8" });
        let i = URL["createObjectURL"](e);
        let n = new Image();
        n["src"] = i;
        n["addEventListener"]("load", async () => {
            let e = new OffscreenCanvas(n["naturalWidth"], n["naturalHeight"]);
            let t = e["getContext"]("2d");
            t["fillStyle"] = "rgba(0, 0, 0, 0)";
            t["fillRect"](0, 0, n["naturalWidth"], n["naturalHeight"]);
            t["drawImage"](n, 0, 0);
            let l = await e["convertToBlob"]({ type: "image/png" });
            URL["revokeObjectURL"](i);
            a(l);
        });
    });
const kc = (e, t = "xml", l = 2) => {
    e = e.cloneNode(!0);
    let a;
    let i = document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT);
    for (; (a = i.nextNode());)
        if (a.nodeType === Node.ELEMENT_NODE) {
            if ("defs" === a["localName"])
                0 === a["children"]["length"] && a["remove"]();
            else {
                if ("style" === a["localName"])
                    "" === a["textContent"]["replace"](/\s+/g, " ")["trim"]()
                        ? a["remove"]()
                        : a["matches"]('[data-bx-fonts="google"]') &&
                        a["removeAttribute"]("data-bx-fonts");
                else {
                    if ("xml" === t && "path" === a["localName"]) {
                        let e = a["getAttribute"]("d");
                        e &&
                            /[\t\n\r]/["test"](e) &&
                            a["setAttribute"]("d", e["replace"](/[\t\n\r ]+/g, " "));
                    }
                }
            }
        }
    Mc(e, t);
    Zd(e, l);
    return Cc(e, t);
};
const Cc = (e, t = "xml") => {
    let l;
    if ("xml" === t) {
        if (
            ((l = new XMLSerializer()["serializeToString"](e)),
                0 === l["trim"]()["length"])
        )
            throw new Error("Failed to serialize artwork");
        l = '<?xml version="1.0" encoding="utf-8"?>' + l;
    } else {
        if ("html" === t) {
            l = e["outerHTML"];
            if (0 === l["trim"]()["length"])
                throw new Error("Failed to serialize artwork", e);
            l = "<!doctype html>" + l;
            l = Ci(l, ' xmlns:xlink="http://www.w3.org/1999/xlink"', "");
        }
    }
    return (l = Ci(l, "url(&quot;", "url(")), (l = Ci(l, "&quot;)", ")")), l;
};
const Mc = (t, e) => {
    if ("xml" === e) {
        let a;
        let e = document["createNodeIterator"](t, NodeFilter["SHOW_ELEMENT"]);
        let i = !1;
        let n = !1;
        for (; (a = e["nextNode"]());)
            if ("bx-title" !== a["localName"]) {
                if (a["localName"]["startsWith"]("bx-")) {
                    let t = document["createElementNS"](
                        u["bx"],
                        "bx:" + a["localName"]["substring"](3)
                    );
                    for (let e of [...a["attributes"]])
                        t["setAttribute"](e["name"], e["value"]);
                    for (let e of [...a["childNodes"]]) {
                        t["append"](e);
                        a["replaceWith"](t);
                        n = !0;
                    }
                } else {
                    for (let { name: t, value: l } of [...a["attributes"]])
                        if ("href" === t || "_href" === t) {
                            a["setAttribute"]("xlink:href", l);
                            a["removeAttribute"](t);
                            i = !0;
                        } else {
                            if (t["startsWith"]("data-bx-")) {
                                let e = t["substring"](8);
                                a["setAttributeNS"](u["bx"], "bx:" + e, l);
                                a["removeAttribute"](t);
                                n = !0;
                            }
                        }
                }
            } else {
                let l = Zi("svg:title");
                l["innerHTML"] = a["innerHTML"];
                for (let { name: e, value: t } of a["attributes"])
                    l["setAttribute"](e, t);
                a["replaceWith"](l);
            }
        t["removeAttribute"]("xmlns");
        t["removeAttribute"]("xmlns:bx");
        t["removeAttribute"]("xmlns:xlink");
        t["setAttributeNS"](u["xmlns"], "xmlns", u["svg"]);
        i && t["setAttributeNS"](u["xmlns"], "xmlns:xlink", u["xlink"]);
        n && t["setAttributeNS"](u["xmlns"], "xmlns:bx", u["bx"]);
    } else {
        if ("html" === e) {
            let a;
            let e = document["createNodeIterator"](t, NodeFilter["SHOW_ELEMENT"]);
            for (; (a = e["nextNode"]());)
                if ("bx-title" !== a["localName"]) {
                    for (let { name: e, value: t } of [...a["attributes"]]) {
                        if (!("href" !== e && "_href" !== e)) {
                            a["setAttribute"]("xlink:href", t);
                            a["removeAttribute"](e);
                        }
                    }
                } else {
                    let l = Zi("svg:title");
                    l["innerHTML"] = a["innerHTML"];
                    for (let { name: e, value: t } of a["attributes"])
                        l["setAttribute"](e, t);
                    a["replaceWith"](l);
                }
        }
    }
};
const Eo = (e, t, l, a) => e * a - t * l;
const To = (e, t, l, a, i, n, r, s, o) =>
    e * Eo(i, n, s, o) - a * Eo(t, l, s, o) + r * Eo(t, l, i, n);
const Ao = (e) => {
    let t = e[0][0];
    let l = e[0][1];
    let a = e[0][2];
    let i = e[0][3];
    let n = e[1][0];
    let r = e[1][1];
    let s = e[1][2];
    let o = e[1][3];
    let u = e[2][0];
    let p = e[2][1];
    let f = e[2][2];
    let h = e[2][3];
    let c = e[3][0];
    let m = e[3][1];
    let y = e[3][2];
    let d = e[3][3];
    return (
        t * To(r, p, m, s, f, y, o, h, d) -
        l * To(n, u, c, s, f, y, o, h, d) +
        a * To(n, u, c, r, p, m, o, h, d) -
        i * To(n, u, c, r, p, m, s, f, y)
    );
};
const $o = (e) => {
    let l = ((e) => { })(e);
    let a = Ao(e);
    if (Math.abs(a) < 1e-8) return !1;
    for (let t = 0; t < 4; t++) for (let e = 0; e < 4; e++) l[t][e] = l[t][e] / a;
    return l;
};
const Lo = (l) => {
    let a = [[], [], [], []];
    for (let t = 0; t < 4; t++) for (let e = 0; e < 4; e++) a[t][e] = l[e][t];
    return a;
};
const Ro = (e, t) => {
    let l = [];
    return (
        (l[0] = e[0] * t[0][0] + e[1] * t[1][0] + e[2] * t[2][0] + e[3] * t[3][0]),
        (l[1] = e[0] * t[0][1] + e[1] * t[1][1] + e[2] * t[2][1] + e[3] * t[3][1]),
        (l[2] = e[0] * t[0][2] + e[1] * t[1][2] + e[2] * t[2][2] + e[3] * t[3][2]),
        (l[3] = e[0] * t[0][3] + e[1] * t[1][3] + e[2] * t[2][3] + e[3] * t[3][3]),
        l
    );
};
const Io = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
const Bo = (t, l) => {
    let a = Io(t);
    if (0 !== a) {
        let e = l / a;
        t[0] *= e;
        t[1] *= e;
        t[2] *= e;
    }
};
const Uo = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
const _o = (e, t, l, a, i) => {
    l[0] = a * e[0] + i * t[0];
    l[1] = a * e[1] + i * t[1];
    l[2] = a * e[2] + i * t[2];
};
const Fo = (e, t, l) => {
    l[0] = e[1] * t[2] - e[2] * t[1];
    l[1] = e[2] * t[0] - e[0] * t[2];
    l[2] = e[0] * t[1] - e[1] * t[0];
};
const Oo = (e) => {
    let i = {};
    let n = [
        [e["a"], e["b"], 0, 0],
        [e["c"], e["d"], 0, 0],
        [0, 0, 1, 0],
        [e["e"], e["f"], 0, 1],
    ];
    if (0 === n[3][3]) return null;
    for (let t = 0; t < 4; t++) for (let e = 0; e < 4; e++) n[t][e] /= n[3][3];
    let r = [];
    for (let t = 0; t < 4; t++) {
        r[t] = [];
        for (let e = 0; e < 4; e++) r[t][e] = n[t][e];
    }
    for (let e = 0; e < 3; e++) r[e][3] = 0;
    r[3][3] = 1;
    if (0 === Ao(r)) return null;
    if (0 !== n[0][3] || 0 !== n[1][3] || 0 !== n[2][3]) {
        let e = [0, 0, 0, 0];
        e[0] = n[0][3];
        e[1] = n[1][3];
        e[2] = n[2][3];
        e[3] = n[3][3];
        let t = $o(r);
        let l = Lo(t);
        let a = Ro(e, l);
        i["perspectiveX"] = a[0];
        i["perspectiveY"] = a[1];
        i["perspectiveZ"] = a[2];
        i["perspectiveW"] = a[3];
        n[0][3] = n[1][3] = n[2][3] = 0;
        n[3][3] = 1;
    } else {
        i["perspectiveX"] = 0;
        i["perspectiveY"] = 0;
        i["perspectiveZ"] = 0;
        i["perspectiveW"] = 1;
        i["translateX"] = n[3][0];
        n[3][0] = 0;
        i["translateY"] = n[3][1];
        n[3][1] = 0;
        i["translateZ"] = n[3][2];
        n[3][2] = 0;
    }
    let t = [[], [], []];
    let l = [0, 0, 0];
    for (let e = 0; e < 3; e++) {
        t[e][0] = n[e][0];
        t[e][1] = n[e][1];
        t[e][2] = n[e][2];
    }
    if (
        ((i["scaleX"] = Io(t[0])),
            Bo(t[0], 1),
            (i["skewXY"] = Uo(t[0], t[1])),
            _o(t[1], t[0], t[1], 1, -i["skewXY"]),
            (i["scaleY"] = Io(t[1])),
            Bo(t[1], 1),
            (i["skewXY"] /= i["scaleY"]),
            (i["skewXZ"] = Uo(t[0], t[2])),
            _o(t[2], t[0], t[2], 1, -i["skewXZ"]),
            (i["skewYZ"] = Uo(t[1], t[2])),
            _o(t[2], t[1], t[2], 1, -i["skewYZ"]),
            (i["scaleZ"] = Io(t[2])),
            Bo(t[2], 1),
            (i["skewXZ"] /= i["scaleZ"]),
            (i["skewYZ"] /= i["scaleZ"]),
            Fo(t[1], t[2], l),
            Uo(t[0], l) < 0)
    ) {
        i["scaleX"] *= -1;
        i["scaleY"] *= -1;
        i["scaleZ"] *= -1;
        for (let e = 0; e < 3; e++) {
            t[e][0] *= -1;
            t[e][1] *= -1;
            t[e][2] *= -1;
        }
    }
    let a = 0;
    let s = Math.asin(-t[0][2]);
    let o = 0;
    return (
        0 !== Math.cos(s)
            ? ((a = Math.atan2(t[1][2], t[2][2])), (o = Math.atan2(t[0][1], t[0][0])))
            : (a = Math.atan2(-t[2][0], t[1][1])),
        (i["rotateX"] = li(a)),
        (i["rotateY"] = li(s)),
        (i["rotateZ"] = li(o)),
        i
    );
};
const Zd = (e, t = 2, l = 1) => {
    Kd(e);
    let s = "";
    let a = { text: !0, textPath: !0, tspan: !0, title: !0, desc: !0 };
    for (let e = 0; e < t; e += 1) s += " ";
    let o = (n, r = 2) => {
        if (!a[n["localName"]])
            for (let i of n["children"]) {
                let e = n["firstChild"] === i;
                let t = n["lastChild"] === i;
                if (!0 === e) {
                    let e = document["createTextNode"]("\n");
                    i["parentNode"]["insertBefore"](e, i);
                }
                let l = "";
                for (let e = 0; e < r; e += 1) l += s;
                let a = document["createTextNode"](l);
                if ((n["insertBefore"](a, i), !0 === t)) {
                    let e = document["createTextNode"]("\n");
                    n["appendChild"](e);
                    let t = "";
                    for (let e = 0; e < r - 1; e += 1) t += s;
                    let l = document["createTextNode"](t);
                    n["appendChild"](l);
                } else {
                    let e = document["createTextNode"]("\n");
                    n["insertBefore"](e, i["nextSibling"]);
                }
                i["childElementCount"] > 0 && o(i, r + 1);
            }
    };
    o(e, l);
};
const Kd = (e) => {
    let t;
    let l = document["createNodeIterator"](e, NodeFilter.SHOW_TEXT, null);
    let a = { text: !0, textPath: !0, tspan: !0 };
    for (; (t = l["nextNode"]());)
        a[t["parentElement"]["localName"]] ||
            (Qd(t["textContent"]) && t["remove"]());
};
const Pc = (e) =>
    null !== new DOMParser().parseFromString(e, "text/html").querySelector("svg");
const Dc = (o, u) => {
    const e = (e) => {
        let t = document["createElement"]("div");
        t["setAttribute"](
            "style",
            "width: 1px; height: 1px; position: fixed; top: -1px; left: -1px; overflow: hidden;"
        );
        t["attachShadow"]({ mode: "open" });
        t["shadowRoot"]["append"](e);
        return t;
    };
    let i = e(o);
    let t = e(u);
    document["body"]["append"](i);
    document["body"]["append"](t);
    for (let l of o["querySelectorAll"]("use"))
        if ("" !== l["href"]["baseVal"]) {
            let e = o["querySelector"](l["href"]["baseVal"]);
            let t = u["querySelector"](l["href"]["baseVal"]);
            e && t && Ji(e, t) && e["remove"]();
        }
    {
        let e = [...o["querySelectorAll"]("linearGradient,radialGradient")];
        e = e["filter"]((e) => gn(e));
        let l = [...u["querySelectorAll"]("linearGradient,radialGradient")];
        l = l["filter"]((e) => gn(e));
        for (let t of e) {
            let e = l["find"]((e) => e["id"] === t["id"]);
            e && !0 === Dn([t, e]) && t["remove"]();
        }
    }
    {
        let e = [...o["querySelectorAll"]("linearGradient,radialGradient")];
        e = e["filter"]((e) => bn(e));
        let l = [...u["querySelectorAll"]("linearGradient,radialGradient")];
        l = l["filter"]((e) => bn(e));
        for (let t of e) {
            let e = l["find"]((e) => e["id"] === t["id"]);
            e && !0 === Dn([t, e]) && t["remove"]();
        }
    }
    {
        let e = [...o.querySelectorAll("pattern:not([href])")];
        let l = [...u.querySelectorAll("pattern:not([href])")];
        for (let t of e) {
            let e = l["find"]((e) => e["id"] === t["id"]);
            e && Ji(t, e) && t["remove"]();
        }
    }
    {
        let e = [...o.querySelectorAll("marker")];
        let l = [...u.querySelectorAll("marker")];
        for (let t of e) {
            let e = l["find"]((e) => e["id"] === t["id"]);
            e && Ji(t, e) && t["remove"]();
        }
    }
    {
        let e = [...o.querySelectorAll("filter")];
        e = e["filter"]((e) => !1 === e["hasAttribute"]("data-bx-preset"));
        let l = [...u.querySelectorAll("filter")];
        l = l["filter"]((e) => !1 === e["hasAttribute"]("data-bx-preset"));
        for (let t of e) {
            let e = l["find"]((e) => e["id"] === t["id"]);
            e && Ji(t, e) && t["remove"]();
        }
    }
    {
        let t = [...o.querySelectorAll("view")];
        for (let e of t) e["remove"]();
    }
    for (let e of o.querySelectorAll("[data-bx-pinned]"))
        e["removeAttribute"]("data-bx-pinned");
    {
        let t = [...o.querySelectorAll("style")]["filter"](
            (e) => !e["hasAttribute"]("data-bx-fonts")
        );
        let l = [...u.querySelectorAll("style")]["filter"](
            (e) => !e["hasAttribute"]("data-bx-fonts")
        );
        let a = new Set();
        for (let e of [...t, ...l])
            for (let t of e["sheet"]["cssRules"])
                if (t["type"] === CSSRule["STYLE_RULE"]) {
                    for (let e of o["querySelectorAll"](t["selectorText"])) a["add"](e);
                }
        let n = Symbol();
        for (let e of a) e[n] = hc(e);
        for (let e of t) e["remove"]();
        for (let e of l) i["shadowRoot"]["append"](e["cloneNode"](!0));
        for (let i of a) {
            let l = i[n];
            let a = hc(i);
            for (let [e, t] of Object["entries"](l)) {
                t !== a[e] && i["style"].setProperty(e, t);
            }
        }
    }
    o.remove();
    u.remove();
    i.remove();
    t.remove();
    {
        let t = [...o.querySelectorAll("[id]")]["map"]((e) => e["id"]);
        let l = [...u.querySelectorAll("[id]")]["map"]((e) => e["id"]);
        o["id"] && t["push"](o["id"]);
        u["id"] && l["push"](u["id"]);
        let e = t["filter"]((e) => l["includes"](e));
        e = fe(e);
        let i = {};
        let n = {};
        let r = {};
        for (let e of [...t, ...l]) r[e] = !0;
        for (let a of e) {
            let e, t, l;
            for (
                e = o["id"] === a ? o : o["querySelector"]("#" + CSS["escape"](a)),
                t =
                "linearGradient" === e["localName"] ||
                    "radialGradient" === e["localName"]
                    ? e["href"].baseVal.length > 1
                        ? e["href"]["baseVal"]["substring"](1)
                        : gn(e)
                            ? "color"
                            : "gradient"
                    : "clipPath" === e["localName"]
                        ? "clip"
                        : e["localName"],
                void 0 === i[t] && (i[t] = 1);
                ;

            ) {
                let e = t + "-" + i[t];
                if (void 0 === r[e]) {
                    l = e;
                    break;
                }
                i[t] += 1;
            }
            n[a] = l;
            r[l] = !0;
        }
        let a = document.createNodeIterator(o, NodeFilter.SHOW_ELEMENT);
        let s = null;
        for (; (s = a.nextNode());) {
            void 0 !== n[s.id] && (s.id = n[s.id]);
            if ("#" === s.href?.baseVal[0]) {
                let e = s.href?.baseVal.substring(1);
                void 0 !== n[e] && s.setAttribute("href", "#" + n[e]);
            }
            for (let l of U) {
                {
                    let t = s.style.getPropertyValue(l);
                    if (t.startsWith("url(")) {
                        let e = t.substring(6, t.length - 2);
                        if (void 0 !== n[e]) {
                            s.style.removeProperty(l);
                            s.style.setProperty(l, "url(#" + n[e] + ")");
                        }
                    }
                }
                {
                    let e = s.getAttribute(l);
                    if (e?.includes("url(")) {
                        let t = An.fromString(e);
                        if ("#" === t.value[0]) {
                            let e = t.value.substring(1);
                            void 0 !== n[e] && s.setAttribute(l, "url(#" + n[e] + ")");
                        }
                    }
                }
            }
        }
    }
};
let Ji = (t, l) => {
    if (t["localName"] !== l["localName"]) return !1;
    if (t["namespaceURI"] !== l["namespaceURI"]) return !1;
    if (t["textContent"] !== l["textContent"]) return !1;
    if (t["children"]["length"] !== l["children"]["length"]) return !1;
    if (t["attributes"]["length"] !== l["attributes"]["length"]) return !1;
    for (let e of t["attributes"])
        if ("style" === e["name"]) {
            if (t["style"]["cssText"] !== l["style"]["cssText"]) return !1;
        } else {
            if (t["getAttribute"](e["name"]) !== l["getAttribute"](e["name"]))
                return !1;
        }
    for (let e = 0; e < t["children"]["length"]; e += 1)
        if (!1 === Ji(t["children"][e], l["children"][e])) return !1;
    return !0;
};
const gn = (t) => {
    if ("linearGradient" === t["localName"] && !1 === t["hasAttribute"]("href")) {
        let e = [...t["querySelectorAll"](":scope > stop")];
        return 1 === e["length"] && !1 === e[0]["hasAttribute"]("offset");
    }
    return !1;
};
const fn = (e) =>
    null !== e.querySelector(":scope > stop") || !1 === e["hasAttribute"]("href");
const bn = (t) => {
    let l = [];
    "linearGradient" === t["localName"]
        ? (l = [
            "x1",
            "y1",
            "x2",
            "y2",
            "href",
            "gradientUnits",
            "gradientTransform",
            "href",
        ])
        : "radialGradient" === t["localName"] &&
        (l = [
            "cx",
            "cy",
            "r",
            "fx",
            "d9",
            "fr",
            "href",
            "gradientUnits",
            "gradientTransform",
            "href",
        ]);
    for (let e of l) if (t.hasAttribute(e)) return !1;
    return !0 !== gn(t);
};
const Dn = (l) => {
    if (0 === l.length) return !1;
    if (1 === l.length) return !0;
    {
        let [t, ...i] = l;
        let n = Symbol();
        let r = Symbol();
        let s = Symbol();
        for (let e of l) {
            e[n] = vn(e);
        }
        for (let e of i) if (e[n].length !== t[n].length) return !1;
        for (let e of l)
            for (let l of e[n]) {
                let { stopColor: e, stopOpacity: t } = getComputedStyle(l);
                l[r] = e;
                l[s] = t;
            }
        for (let a = 0; a < t[n].length; a += 1) {
            let l = t[n][a];
            for (let t of i) {
                let e = t[n][a];
                if (e["offset"]["baseVal"] !== l["offset"]["baseVal"]) return !1;
                if (e[r] !== l[r]) return !1;
                if (e[s] !== l[s]) return !1;
            }
        }
        return !0;
    }
};
const vn = (e) => {
    let l = [];
    for (let t of [e, ...pn(e)]) {
        let e = Cn(t);
        if (e.length > 0) {
            l = e;
            break;
        }
    }
    return l;
};
const on = (e, t = "rgba") => {
    e = e.trim();
    let i = ln(e);
    let s = null;
    let l = null;
    if (
        7 === i.length &&
        "rgb(" === i[0]["text"] &&
        "NUM" === i[1]["type"] &&
        "," === i[2]["text"] &&
        "NUM" === i[3]["type"] &&
        "," === i[4]["text"] &&
        "NUM" === i[5]["type"] &&
        ")" === i[6]["text"]
    )
        s = [
            parseFloat(i[1]["text"]),
            parseFloat(i[3]["text"]),
            parseFloat(i[5]["text"]),
            1,
        ];
    else {
        if (
            7 === i.length &&
            "rgb(" === i[0]["text"] &&
            "PERCENTAGE" === i[1]["type"] &&
            "," === i[2]["text"] &&
            "PERCENTAGE" === i[3]["type"] &&
            "," === i[4]["text"] &&
            "PERCENTAGE" === i[5]["type"] &&
            ")" === i[6]["text"]
        )
            s = [
                (parseFloat(i[1]["text"]) / 100) * 255,
                (parseFloat(i[3]["text"]) / 100) * 255,
                (parseFloat(i[5]["text"]) / 100) * 255,
                1,
            ];
        else {
            if (
                9 === i.length &&
                "rgba(" === i[0]["text"] &&
                "NUM" === i[1]["type"] &&
                "," === i[2]["text"] &&
                "NUM" === i[3]["type"] &&
                "," === i[4]["text"] &&
                "NUM" === i[5]["type"] &&
                "," === i[6]["text"] &&
                "NUM" === i[7]["type"] &&
                ")" === i[8]["text"]
            )
                s = [
                    parseFloat(i[1]["text"]),
                    parseFloat(i[3]["text"]),
                    parseFloat(i[5]["text"]),
                    parseFloat(i[7]["text"]),
                ];
            else {
                if (
                    9 === i.length &&
                    "rgb(" === i[0]["text"] &&
                    "PERCENTAGE" === i[1]["type"] &&
                    "," === i[2]["text"] &&
                    "PERCENTAGE" === i[3]["type"] &&
                    "," === i[4]["text"] &&
                    "PERCENTAGE" === i[5]["type"] &&
                    "," === i[6]["text"] &&
                    "NUM" === i[7]["type"] &&
                    ")" === i[8]["text"]
                )
                    s = [
                        (parseFloat(i[1]["text"]) / 100) * 255,
                        (parseFloat(i[3]["text"]) / 100) * 255,
                        (parseFloat(i[5]["text"]) / 100) * 255,
                        parseFloat(i[7]["text"]),
                    ];
                else {
                    if (
                        7 === i.length &&
                        "hsl(" === i[0]["text"] &&
                        "NUM" === i[1]["type"] &&
                        "," === i[2]["text"] &&
                        "PERCENTAGE" === i[3]["type"] &&
                        "," === i[4]["text"] &&
                        "PERCENTAGE" === i[5]["type"] &&
                        ")" === i[6]["text"]
                    )
                        l = [
                            parseFloat(i[1]["text"]),
                            parseFloat(i[3]["text"]),
                            parseFloat(i[5]["text"]),
                            1,
                        ];
                    else {
                        if (
                            9 === i.length &&
                            "hsla(" === i[0]["text"] &&
                            "NUM" === i[1]["type"] &&
                            "," === i[2]["text"] &&
                            "PERCENTAGE" === i[3]["type"] &&
                            "," === i[4]["text"] &&
                            "PERCENTAGE" === i[5]["type"] &&
                            "," === i[6]["text"] &&
                            "NUM" === i[7]["type"] &&
                            ")" === i[8]["text"]
                        )
                            l = [
                                parseFloat(i[1]["text"]),
                                parseFloat(i[3]["text"]),
                                parseFloat(i[5]["text"]),
                                parseFloat(i[7]["text"]),
                            ];
                        else {
                            if ("HEX" === i[0]["type"] && void 0 === i[1]) {
                                let e,
                                    t,
                                    l,
                                    a = i[0]["text"].substring(1);
                                if (3 === a["length"]) {
                                    e = a[0] + a[0];
                                    t = a[1] + a[1];
                                    l = a[2] + a[2];
                                } else {
                                    e = a[0] + a[1];
                                    t = a[2] + a[3];
                                    l = a[4] + a[5];
                                }
                                s = [parseInt(e, 16), parseInt(t, 16), parseInt(l, 16), 1];
                            } else Ns[e] && (s = [Ns[e][0], Ns[e][1], Ns[e][2], 1]);
                        }
                    }
                }
            }
        }
    }
    if (s) {
        let [a, i, n, r] = s;
        a = ie(a, 0, 255, 0);
        i = ie(i, 0, 255, 0);
        n = ie(n, 0, 255, 0);
        r = ie(r, 0, 1, 2);
        if ("hsla" === t) {
            let [e, t, l] = tn(a, i, n);
            return [e, t, l, r];
        }
        if ("hsva" === t) {
            let [e, t, l] = ((e, t, l) => {
                let a = Math.max((e /= 255), (t /= 255), (l /= 255));
                let i = Math.min(e, t, l);
                let n = 0;
                let r = 0;
                let s = a;
                let o = a - i;
                return (
                    (r = 0 === a ? 0 : o / a),
                    a === i
                        ? (n = 0)
                        : (a === e
                            ? (n = (t - l) / o + (t < l ? 6 : 0))
                            : a === t
                                ? (n = (l - e) / o + 2)
                                : a === l && (n = (e - t) / o + 4),
                            (n /= 6)),
                    (n *= 360),
                    (r *= 100),
                    (s *= 100),
                    [n, r, s]
                );
            })(a, i, n);
            return [e, t, l, r];
        }
        return [a, i, n, r];
    }
    if (l) {
        let [a, i, n, r] = l;
        a = ie(a, 0, 360, 0);
        i = ie(i, 0, 100, 1);
        n = ie(n, 0, 100, 1);
        r = ie(r, 0, 1, 2);
        if ("hsla" === t) return [a, i, n, r];
        if ("hsva" === t) {
            let [e, t, l] = ((e, t, l) => {
                t /= 100;
                let a,
                    i,
                    n = (e /= 360);
                return (
                    (a =
                        (l = (l / 100) * 2) + (t *= l <= 1 ? l : 2 - l) === 0
                            ? 0
                            : (2 * t) / (l + t)),
                    (i = (l + t) / 2),
                    (n *= 360),
                    (a = 100 * Math.max(0, Math.min(1, a))),
                    (i = 100 * Math.max(0, Math.min(1, i))),
                    [n, a, i]
                );
            })(a, i, n);
            return [e, t, l, r];
        }
        {
            let [e, t, l] = sn(a, i, n);
            return [e, t, l, r];
        }
    }
    throw new Error('Invalid color string: "' + e + '"');
};
const ln = (e) => {
    let l = [];
    const a = new Xs(e.toLowerCase());
    for (; null !== a.peek();) {
        let t = a["read"]();
        if ("r" === t || "h" === t) {
            let e = t;
            if (
                (t + a.peek(3) === "rgb("
                    ? (e += a["read"](3))
                    : t + a["peek"](4) === "rgba("
                        ? (e += a["read"](4))
                        : t + a["peek"](3) === "hsl("
                            ? (e += a["read"](3))
                            : t + a["peek"](4) === "hsla(" && (e += a["read"](4)),
                    e !== t)
            )
                return void l["push"]({ type: "FUNCTION", text: e });
        }
        if ("#" === t) {
            if (dn(t + a["peek"](6))) {
                let e = t + a["read"](6);
                return void l["push"]({ type: "HEX", text: e });
            }
            if (dn(t + a["peek"](3))) {
                const i = t + a["read"](3);
                return void l["push"]({ type: "HEX", text: i });
            }
        }
        if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"].includes(t)
        ) {
            let e = t;
            for (
                ;
                ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(
                    a.peek()
                );

            )
                e += a["read"]();
            if ("%" === a["peek"]()) {
                e += a["read"]();
                l["push"]({ type: "PERCENTAGE", text: e });
            } else {
                l["push"]({ type: "NUM", text: e });
            }
        } else {
            /\u0009|\u000a|\u000c|\u000d|\u0020/.test(t) ||
                l.push({ type: "CHAR", text: t });
        }
    }
    return l;
};
const dn = (t) => {
    if ("#" !== (t = t["toLowerCase"]())[0]) return !1;
    if (4 !== t["length"] && 7 !== t["length"]) return !1;
    t = t["substring"](1);
    let l = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
    ];
    for (let e of t) if (!l["includes"](e)) return !1;
    return !0;
};
const cn = (e) => {
    try {
        on(e);
    } catch (e) {
        return !1;
    }
    return !0;
};
const pn = (t) => {
    let l = null;
    let a = [];
    let i = t;
    for (; i && "" !== i["href"]["baseVal"];) {
        null === l && (l = Ki(t));
        let e = l["querySelector"](i["href"]["baseVal"]);
        if (
            !e ||
            ("linearGradient" !== e.localName && "radialGradient" !== e.localName) ||
            e === t ||
            !1 !== a["includes"](e)
        )
            break;
        a["push"](e);
        i = e;
    }
    return a;
};
const yn = (e, l) => {
    let a = null;
    if (e["hasAttribute"](l)) a = e["getAttribute"](l);
    else {
        let t = pn(e);
        for (let e of t)
            if (e["hasAttribute"](l)) {
                a = e["getAttribute"](l);
                break;
            }
    }
    return a;
};
const hc = (e) => {
    let l = {};
    const a = getComputedStyle(e);
    l.width = a.getPropertyValue("width");
    for (let t of a) {
        let e = a.getPropertyValue(t);
        l[t] = e;
    }
    return l;
};
const dc = (t, l) => {
    let e = j.find((e) => e.name === t).presentationAttributeName || null;
    if (e && l.hasAttribute(e)) {
        "" === l.style.getPropertyValue(t) &&
            l.style.setProperty(t, l.getAttribute(e));
        l.removeAttribute(e);
    }
    let a = l.style.getPropertyValue(t);
    if ("" !== a && "inherit" !== a) {
        let e = getComputedStyle(l).getPropertyValue(t);
        l.style.removeProperty(t);
        e !== getComputedStyle(l).getPropertyValue(t) && l.style.setProperty(t, a);
    }
};
const Ne = (l) => {
    let a = "";
    for (let t = 0, e = l.length; t < e; t += 1) {
        let e = l[t];
        t > 0 && (a += " ");
        a += e.type;
        e?.values?.length > 0 && (a += " " + e.values.join(" "));
    }
    return a;
};
const to = (n, r, s = 9) => {
    let o = so(r, s);
    if (o) {
        n.setPathData(o);
        let e = n.getAttribute("d");
        let t = r.values.map((e) => te(e, s)).join(" ");
        let l = r.type + " " + t;
        let a = Jn[r.type];
        let i = Pe(e + " / " + l + " " + a).toString(32);
        n.setAttribute("data-fx-shape", l + " " + a + "@" + i);
    }
};
const so = (e, t = 6) => {
    let l = null;
    "rect" === e.type
        ? (l = no(e, t))
        : "frame" === e.type
            ? (l = oo(e, t))
            : "ring" === e.type
                ? (l = ao(e, t))
                : "pie" === e.type
                    ? (l = lo(e, t))
                    : "crescent" === e.type
                        ? (l = ro(e, t))
                        : "triangle" === e.type
                            ? (l = ho(e, t))
                            : "n-gon" === e.type
                                ? (l = co(e, t))
                                : "star" === e.type
                                    ? (l = po(e, t))
                                    : "cog" === e.type
                                        ? (l = uo(e, t))
                                        : "arrow" === e.type
                                            ? (l = xo(e, t))
                                            : "cross" === e.type
                                                ? (l = mo(e, t))
                                                : "spiral" === e.type && (l = go(e, t));
    return l;
};
const no = (e, t) => {
    let [l, a, i, n, r, s, o, u, p, f, h, c] = e.values;
    void 0 === p && (p = r);
    void 0 === f && (f = s);
    void 0 === h && (h = o);
    void 0 === c && (c = u);
    r = r > i / 2 ? i / 2 : r;
    s = s > i / 2 ? i / 2 : s;
    o = o > i / 2 ? i / 2 : o;
    u = u > i / 2 ? i / 2 : u;
    p = p > n / 2 ? n / 2 : p;
    f = f > n / 2 ? n / 2 : f;
    h = h > n / 2 ? n / 2 : h;
    c = c > n / 2 ? n / 2 : c;
    let m = [
        { type: "M", values: [l + r, a] },
        { type: "H", values: [l + i - s] },
        { type: "A", values: [s, f, 0, 0, 1, l + i, a + f] },
        { type: "V", values: [a + n - h] },
        { type: "A", values: [o, h, 0, 0, 1, l + i - o, a + n] },
        { type: "H", values: [l + u] },
        { type: "A", values: [u, c, 0, 0, 1, l, a + n - c] },
        { type: "V", values: [a + p] },
        { type: "A", values: [r, p, 0, 0, 1, l + r, a] },
        { type: "Z", values: [] },
    ];
    m = m.filter(
        (e) => "A" !== e.type || (0 !== e.values[0] && 0 !== e.values[1])
    );
    for (let e of m) e.values = e.values.map((e) => te(e, t));
    return m;
};
const oo = (e, t) => {
    let [l, a, i, n, r, s, o, u, p, f] = e.values;
    let h = Math.min(i / 2, n / 2);
    r = ie(r, 0, i / 2);
    s = ie(s, 0, n / 2);
    o = ie(o, 0, h);
    u = ie(u, 0, h);
    p = ie(p, 0, h);
    f = ie(f, 0, h);
    let c = i - 2 * r;
    let m = n - 2 * s;
    let y = l + r;
    let d = a + s;
    let v = Math.min(c / 2, m / 2);
    let b = ie(o - r / 2, 0, v);
    let g = ie(u - r / 2, 0, v);
    let x = ie(p - r / 2, 0, v);
    let M = ie(f - r / 2, 0, v);
    let w = [
        { type: "M", values: [l + o, a] },
        { type: "H", values: [l + i - u] },
        { type: "A", values: [u, u, 0, 0, 1, l + i, a + u] },
        { type: "V", values: [a + n - p] },
        { type: "A", values: [p, p, 0, 0, 1, l + i - p, a + n] },
        { type: "H", values: [l + f] },
        { type: "A", values: [f, f, 0, 0, 1, l, a + n - f] },
        { type: "V", values: [a + o] },
        { type: "A", values: [o, o, 0, 0, 1, l + o, a] },
        { type: "Z", values: [] },
        { type: "M", values: [y, d + b] },
        { type: "V", values: [d + m - M] },
        { type: "A", values: [M, M, 0, 0, 0, y + M, d + m] },
        { type: "H", values: [y + c - x] },
        { type: "A", values: [x, x, 0, 0, 0, y + c, d + m - x] },
        { type: "V", values: [d + g] },
        { type: "A", values: [g, g, 0, 0, 0, y + c - g, d] },
        { type: "H", values: [y + b] },
        { type: "A", values: [b, b, 0, 0, 0, y, d + b] },
        { type: "Z", values: [] },
    ];
    w = w["filter"](
        (e) => "A" !== e["type"] || (0 !== e["values"][0] && 0 !== e["values"][1])
    );
    for (let e of w) e["values"] = e["values"]["map"]((e) => te(e, t));
    return w;
};
const ao = (e, t) => {
    let [l, a, i, n, r, s] = e.values;
    let o = [
        { type: "M", values: [l, a] },
        { type: "m", values: [-r, 0] },
        { type: "a", values: [r, s, 0, 1, 0, 2 * r, 0] },
        { type: "a", values: [r, s, 0, 1, 0, -2 * r, 0] },
        { type: "Z", values: [] },
        { type: "M", values: [l, a] },
        { type: "m", values: [-i, 0] },
        { type: "a", values: [i, n, 0, 0, 1, 2 * i, 0] },
        { type: "a", values: [i, n, 0, 0, 1, -2 * i, 0] },
        { type: "Z", values: [] },
    ];
    for (let e of o) e["values"] = e["values"]["map"]((e) => te(e, t));
    return o;
};
const lo = (e, t) => {
    let [l, a, i, n, r, s] = e.values;
    let o = ri(r);
    let u = ri(s);
    let p = s - r;
    let f = p >= 180 || (p >= -180 && p <= 0) ? 1 : 0;
    let h = [
        { type: "M", values: [l + n * Math.sin(o), a + n * -Math.cos(o)] },
        {
            type: "A",
            values: [n, n, 0, f, 1, l + n * Math.sin(u), a + n * -Math.cos(u)],
        },
        { type: "L", values: [l + i * Math.sin(u), a + i * -Math.cos(u)] },
    ];
    if (i > 0) {
        let e = l + i * Math.sin(o),
            t = a + i * -Math.cos(o);
        h.push({ type: "A", values: [i, i, 0, f, 0, e, t] });
    }
    h.push({ type: "Z", values: [] });
    for (let e of h) e.values = e.values.map((e) => te(e, t));
    return h;
};
const ro = (e, t) => {
    let [l, a, i, n, r] = e.values;
    let s = oi(90 - n / 2);
    let o = ri(s);
    let u = oi(s + n);
    let p = ri(u);
    let f = u - s;
    let h = f >= 180 || (f >= -180 && f <= 0) ? 1 : 0;
    let c = new DOMPoint(l + i * Math.sin(o), a + i * -Math.cos(o));
    let m = new DOMPoint(l + i * Math.sin(p), a + i * -Math.cos(p));
    let y = new DOMPoint(l - i + 2 * i * r, a);
    let d = [];
    d["push"]({ type: "M", values: [c["x"], c["y"]] });
    d["push"]({ type: "A", values: [i, i, 0, h, 1, m["x"], m["y"]] });
    !0 === Zt(c, m, y)
        ? d["push"]({ type: "L", values: [c["x"], c["y"]] })
        : d.push(
            ((n, r, s) => {
                if (!0 === Zt(n, r, s)) throw new Error("Given points are colinear");
                {
                    let e = Kt(r, s);
                    let t = Kt(s, n);
                    let l = Kt(n, r);
                    let a = Ut((e * e + t * t - l * l) / (2 * e * t));
                    let i = (e * t * l) / 4 / (0.5 * e * t * It(a));
                    return {
                        type: "A",
                        values: [
                            i,
                            i,
                            0,
                            +(jt / 2 > a),
                            +(
                                (r.x - n["x"]) * (s["y"] - n["y"]) -
                                (r.y - n["y"]) * (s["x"] - n["x"]) <
                                0
                            ),
                            r.x,
                            r.y,
                        ],
                    };
                }
            })(m, c, y)
        );
    d["push"]({ type: "Z", values: [] });
    for (let e of d) e.values = e.values.map((e) => te(e, t));
    return d;
};
const ho = (e, t) => {
    let [l, a, i, n, r, o] = e.values;
    let u = [];
    if (0 === o) {
        u["push"]({ type: "M", values: [l + i * r, a] });
        u["push"]({ type: "L", values: [l + i, a + n] });
        u["push"]({ type: "L", values: [l, a + n] });
        u["push"]({ type: "L", values: [l + i * r, a] });
    } else {
        let s = [
            { x: l + i * r, y: a },
            { x: l + i, y: a + n },
            { x: l, y: a + n },
        ];
        for (let r = 0; r < s.length; r += 1) {
            let e = s[r];
            let t = s[r + 1] || s[0];
            let l = s[r - 1] || s[s.length - 1];
            let a = {
                x: e["x"] + (l["x"] - e["x"]) * o,
                y: e["y"] + (l["y"] - e["y"]) * o,
            };
            let i = {
                x: e["x"] + (t["x"] - e["x"]) * o,
                y: e["y"] + (t["y"] - e["y"]) * o,
            };
            let n = { x: e["x"], y: e["y"] };
            u["push"]({ type: 0 === r ? "M" : "L", values: [a["x"], a["y"]] });
            u["push"]({ type: "Q", values: [n["x"], n["y"], i["x"], i["y"]] });
        }
    }
    u["push"]({ type: "Z", values: [] });
    for (let e of u) e.values = e.values.map((e) => te(e, t));
    return u;
};
const co = (e, t) => {
    let [i, n, r, o, u, p] = e.values;
    let f = [];
    if (0 === p)
        for (let a = 0; a < u; a += 1) {
            let e = 2 * Math.PI * (a / u) - Math.PI / 2;
            let t = r * Math.cos(e) + i;
            let l = o * Math.sin(e) + n;
            0 === a
                ? f.push({ type: "M", values: [t, l] })
                : f.push({ type: "L", values: [t, l] });
        }
    else {
        let s = [];
        for (let t = 0; t < u; t += 1) {
            let e = 2 * Math.PI * (t / u) - Math.PI / 2;
            s["push"]({ x: r * Math.cos(e) + i, y: o * Math.sin(e) + n });
        }
        for (let r = 0; r < s.length; r += 1) {
            let e = s[r];
            let t = s[r + 1] || s[0];
            let l = s[r - 1] || s[s.length - 1];
            let a = {
                x: e["x"] + (l["x"] - e["x"]) * p,
                y: e["y"] + (l["y"] - e["y"]) * p,
            };
            let i = {
                x: e["x"] + (t.x - e["x"]) * p,
                y: e["y"] + (t.y - e["y"]) * p,
            };
            let n = { x: e["x"], y: e["y"] };
            f["push"]({ type: 0 === r ? "M" : "L", values: [a["x"], a["y"]] });
            f["push"]({ type: "Q", values: [n["x"], n["y"], i["x"], i["y"]] });
        }
    }
    f["push"]({ type: "Z", values: [] });
    for (let e of f) e.values = e.values.map((e) => te(e, t));
    return f;
};
const po = (e, t) => {
    let [i, n, r, s, o, u] = e.values;
    let p = [];
    for (let a = 0; a < u; a += 1) {
        let e = 2 * Math.PI * (a / u) - Math.PI / 2;
        let t = r * Math.cos(e) + i;
        let l = s * Math.sin(e) + n;
        0 === a
            ? p.push({ type: "M", values: [t, l] })
            : p.push({ type: "L", values: [t, l] });
        e = 2 * Math.PI * (a / u) + Math.PI / u - Math.PI / 2;
        t = o * r * Math.cos(e) + i;
        l = o * s * Math.sin(e) + n;
        p.push({ type: "L", values: [t, l] });
    }
    p["push"]({ type: "Z", values: [] });
    for (let e of p) e.values = e.values.map((e) => te(e, t));
    return p;
};
const uo = (e, t) => {
    let [s, o, l, u, p, f, a] = e.values;
    let h = 360 / a;
    let c = h / 4;
    let m = Math.tan(ri(c - f * c)) * p;
    let y = [];
    for (let r = 0; r < a; r += 1) {
        let e = h * r - 90;
        let t = e + c + f * c;
        let l = e + h - c - f * c;
        let a = ri(e);
        let i = ri(t);
        let n = ri(l);
        y.push({
            type: 0 === r ? "M" : "L",
            values: [
                s + p * Math.cos(a) + Math.sin(a) * m,
                o + p * Math.sin(a) - Math.cos(a) * m,
            ],
        });
        y.push({
            type: "L",
            values: [
                s + p * Math.cos(a) - Math.sin(a) * m,
                o + p * Math.sin(a) + Math.cos(a) * m,
            ],
        });
        y.push({ type: "L", values: [s + u * Math.cos(i), o + u * Math.sin(i)] });
        y.push({
            type: "A",
            values: [u, u, 0, 0, 1, s + u * Math.cos(n), o + u * Math.sin(n)],
        });
    }
    y.push({ type: "Z", values: [] });
    y.push({ type: "M", values: [s, o - l] });
    y.push({ type: "A", values: [l, l, 0, 0, 0, s, o + l] });
    y.push({ type: "A", values: [l, l, 0, 0, 0, s, o - l] });
    for (let e of y) e.values = e.values.map((e) => te(e, t));
    return y;
};
const xo = (e, t) => {
    let [l, a, i, n, r, s, o] = e.values;
    s > i && (s = i);
    o < 0 ? (o = 0) : o > s && (o = s);
    let u = [
        { type: "M", values: [l, a + n / 2 - r / 2] },
        { type: "H", values: [l + i - s + o] },
        { type: "L", values: [l + i - s, a] },
        { type: "L", values: [l + i, a + n / 2] },
        { type: "L", values: [l + i - s, a + n] },
        { type: "L", values: [l + i - s + o, a + n / 2 + r / 2] },
        { type: "H", values: [l] },
        { type: "V", values: [a + n / 2 - r / 2] },
        { type: "Z", values: [] },
    ];
    for (let e of u) e.values = e.values.map((e) => te(e, t));
    return u;
};
const mo = (e, t) => {
    let [l, a, i, n, r, s, o] = e.values;
    let u = [
        { type: "M", values: [l + i / 2 - s / 2, a] },
        { type: "H", values: [l + i / 2 + s / 2] },
        { type: "V", values: [a + n * o - r / 2] },
        { type: "H", values: [l + i] },
        { type: "V", values: [a + n * o + r / 2] },
        { type: "H", values: [l + i / 2 + s / 2] },
        { type: "V", values: [a + n] },
        { type: "H", values: [l + i / 2 - s / 2] },
        { type: "V", values: [a + n * o + r / 2] },
        { type: "H", values: [l] },
        { type: "V", values: [a + n * o - r / 2] },
        { type: "H", values: [l + i / 2 - s / 2] },
        { type: "Z", values: [] },
    ];
    for (let e of u) e.values = e.values.map((e) => te(e, t));
    return u;
};
const go = (e, t) => {
    let [i, n, l, a, r, s] = e.values;
    let o = 30;
    r < 0 && (r = 0);
    s < r + 1 && (s = r + 1);
    s - r < o && (o = s - r);
    l >= a && (l = a - 0.01);
    let u = l;
    let p = (a - l) / (s / 360) / Math.PI / 2;
    let f = (r * Math.PI) / 180;
    let h = f;
    let c = (s * Math.PI) / 180;
    let m = (o * Math.PI) / 180;
    let y = u + p * f;
    let d = u + p * h;
    let v = [];
    let b = { x: i + d * Math.cos(h), y: n + d * Math.sin(h) };
    let g =
        (p * Math.sin(f) + (u + p * h) * Math.cos(f)) /
        (p * Math.cos(f) - (u + p * h) * Math.sin(f));
    let x = g;
    v["push"]({ type: "M", values: [b.x, b.y] });
    do {
        f + m + m > c && (m = c - h);
        f = h;
        h += m;
        y = d;
        d = u + p * h;
        b.x = i + d * Math.cos(h);
        b.y = n + d * Math.sin(h);
        let e = u + p * h;
        g = x;
        x =
            (p * Math.sin(h) + e * Math.cos(h)) / (p * Math.cos(h) - e * Math.sin(h));
        let t = -(g * y * Math.cos(f) - y * Math.sin(f));
        let l = (-(x * d * Math.cos(h) - d * Math.sin(h)) - t) / (g - x);
        let a = { x: l, y: g * l + t };
        a["x"] += i;
        a["y"] += n;
        v.push({ type: "Q", values: [a["x"], a["y"], b.x, b.y] });
    } while (f + m < c);
    {
        let s = new DOMMatrix()
            .translateSelf(i, n)
            .rotateSelf(-90)
            .translateSelf(-i, -n);
        for (let r of v)
            if ("M" === r.type) {
                let [e, t] = r.values;
                let l = new DOMPoint(e, t).matrixTransform(s);
                r.values = [l["x"], l["y"]];
            } else {
                if ("Q" === r.type) {
                    let [e, t, l, a] = r.values;
                    let i = new DOMPoint(e, t).matrixTransform(s);
                    let n = new DOMPoint(l, a).matrixTransform(s);
                    r.values = [i["x"], i["y"], n["x"], n["y"]];
                }
            }
    }
    for (let e of v) e.values = e.values.map((e) => te(e, t));
    return v;
};
const fo = (e, t, l, a, i, n) => {
    let r = 2 * Math.PI * (e / n) - Math.PI / 2;
    let s = a * Math.cos(r) + t;
    let o = i * Math.sin(r) + l;
    return new DOMPoint(s, o);
};
const Ve = (t, l) => {
    let a = [];
    let i = [];
    for (let e of l) {
        if (Oe.has(e.type)) {
            i.push(e);
        } else {
            if ("M" === e.type) {
                if (i.length > 0) {
                    a.push(i);
                    i = [];
                }
                i.push(e);
            } else {
                if ("Z" === e.type) {
                    i.push(e);
                    a.push(i);
                    i = [];
                }
            }
        }
    }
    i.length > 0 && a.push(i);
    return a.find((e) => e.includes(t)) || null;
};
const He = (e, a) => {
    let i = 0;
    let n = 0;
    let t = $e(e);
    let r = -1;
    let s = -1;
    for (let l of t) {
        r += 1;
        let t = -1;
        for (let e of l) {
            s += 1;
            t += 1;
            if (s === a) {
                i = r;
                n = t;
                break;
            }
        }
    }
    return [i, n];
};
const We = (e, t) => {
    let l = Ve(e, t);
    return "Z" === l[l.length - 1]["type"];
};
const Ye = (e, t, n = 2) => {
    let r = "sharp";
    if (e && t && "C" === e["type"] && "C" === t["type"]) {
        let l = new DOMPoint(e.values[4], e.values[5]);
        let a = new DOMPoint(t["values"][0], t["values"][1]);
        let i = new DOMPoint(e.values[2], e.values[3]);
        if (!1 === qt(l, a) && !1 === qt(l, i) && !0 === Zt(a, l, i, n)) {
            let e = new ee(l, a);
            let t = new ee(l, i);
            r =
                te(e["length"], 2) === te(t["length"], 2)
                    ? "symmetric-smooth"
                    : "smooth";
        }
    }
    return r;
};
const qe = (e, t, l = !1) => {
    let a = new DOMPoint(t["values"][4], t["values"][5]);
    let i = new DOMPoint(e.values[0], e.values[1]);
    let n = new DOMPoint(t["values"][2], t["values"][3]);
    let r = new ee(a, i);
    let s = new ee(a, n);
    let o = r["getOppositeVector"]();
    !1 === l && (o["length"] = s["length"]);
    t["values"][2] = a["x"] + o["x"];
    t["values"][3] = a["y"] + o["y"];
};
const Xe = (e, t, l = !1) => {
    let a = new DOMPoint(e.values[4], e.values[5]);
    let i = new DOMPoint(e.values[2], e.values[3]);
    let n = new DOMPoint(t["values"][0], t["values"][1]);
    let r = new ee(a, i);
    let s = new ee(a, n);
    let o = r["getOppositeVector"]();
    !1 === l && (o["length"] = s["length"]);
    t["values"][0] = a["x"] + o["x"];
    t["values"][1] = a["y"] + o["y"];
};
const Ze = (e, t, l) => {
    let a;
    "M" === e["type"] || "L" === e["type"]
        ? (a = new DOMPoint(e.values[0], e.values[1]))
        : "C" === e["type"] && (a = new DOMPoint(e.values[4], e.values[5]));
    let i = new DOMPoint(l["values"][4], l["values"][5]);
    let n = new DOMPoint(t["values"][4], t["values"][5]);
    let r = new ee(n, a);
    let s = new ee(n, i);
    let o = r["length"] / s["length"];
    let u = new ee(o * s["x"] - r["x"], o * s["y"] - r["y"])["normalize"]();
    t["values"][2] = n["x"] + -u["x"] * (r["length"] / 3);
    t["values"][3] = n["y"] + -u["y"] * (r["length"] / 3);
    l["values"][0] = n["x"] + u["x"] * (s["length"] / 3);
    l["values"][1] = n["y"] + u["y"] * (s["length"] / 3);
};
const Ke = (e) => {
    let n = null;
    for (let i of e) {
        if ("L" === i["type"]) {
            let [e, t] = i["values"];
            let l = "C" === n["type"] ? n["values"][4] : n["values"][0];
            let a = "C" === n["type"] ? n["values"][5] : n["values"][1];
            i["type"] = "C";
            i["values"] = [l, a, e, t, e, t];
        }
        n = i;
    }
};
const Qe = (e) => {
    let u = null;
    for (let o of e) {
        if ("C" === o["type"]) {
            let [e, t, l, a, i, n] = o["values"];
            let r = "C" === u["type"] ? u["values"][4] : u["values"][0];
            let s = "C" === u["type"] ? u["values"][5] : u["values"][1];
            if (e === r && t === s && l === i && a === n) {
                o["type"] = "L";
                o["values"] = [i, n];
            }
        }
        u = o;
    }
};
const Je = (a, t) => {
    let i = a["getTotalLength"]();
    let n = (i / a["getPathData"]()["length"]) * 0.125;
    let r = null;
    let s = null;
    let o = Infinity;
    let u = (e) =>
        Math["pow"](e["x"] - t["x"], 2) + Math["pow"](e["y"] - t["y"], 2);
    for (let l = 0; l <= i; l += n) {
        let e = DOMPoint["fromPoint"](a["getPointAtLength"](l));
        let t = u(e);
        if (t < o) {
            r = e;
            s = l;
            o = t;
        }
    }
    for (n *= 0.5; n > 0.5;) {
        let e = s - n;
        let t = DOMPoint["fromPoint"](a["getPointAtLength"](e));
        let l = u(t);
        if (e >= 0 && l < o) {
            r = t;
            s = e;
            o = l;
        } else {
            let e = s + n;
            let t = DOMPoint["fromPoint"](a["getPointAtLength"](e));
            let l = u(t);
            if (e <= i && l < o) {
                r = t;
                s = e;
                o = l;
            } else {
                n *= 0.5;
            }
        }
    }
    return [r, s, o];
};
const ke = (e, t = !1, l = 0.5) => {
    let a;
    e[0] instanceof DOMPoint && (e = e["map"]((e) => [e["x"], e["y"]]));
    a = t ? Se(e, l) : Ce(e, l);
    return a;
};
const Ce = (l, a) => {
    let o;
    let u;
    let p;
    let f;
    let h;
    let c;
    let m;
    let y;
    let d;
    let v;
    let b;
    let g;
    let x;
    let i;
    let M = [];
    let n = !1;
    let w = !1;
    let r = (r, s) => {
        if (x) {
            let e = h - r;
            let t = c - s;
            g = Math["pow"](e * e + t * t, a);
            d = Math["sqrt"](g);
        }
        if (0 === x) {
            x = 1;
            if (i) {
                w = !0;
                M["push"]({ type: "L", values: [r, s] });
            } else {
                w = !0;
                M["push"]({ type: "M", values: [r, s] });
            }
        } else {
            if (1 === x) x = 2;
            else {
                2 === x && (x = 3);
                let l = p,
                    a = f,
                    i = h,
                    n = c;
                if (m > 1e-12) {
                    let e = 2 * v + 3 * m * y + b;
                    let t = 3 * m * (m + y);
                    l = (l * e - o * b + h * v) / t;
                    a = (a * e - u * b + c * v) / t;
                }
                if (d > 1e-12) {
                    let e = 2 * g + 3 * d * y + b;
                    let t = 3 * d * (d + y);
                    i = (i * e + p * g - r * b) / t;
                    n = (n * e + f * g - s * b) / t;
                }
                w = !0;
                M["push"]({ type: "C", values: [l, a, i, n, h, c] });
            }
        }
        m = y;
        y = d;
        v = b;
        b = g;
        o = p;
        p = h;
        h = r;
        u = f;
        f = c;
        c = s;
    };
    for (let e = 0, t = l["length"]; e <= t; e += 1) {
        if (e < t) {
            if (!1 === n) {
                n = !0;
                m = 0;
                y = 0;
                d = 0;
                v = 0;
                b = 0;
                g = 0;
                x = 0;
            }
            r(l[e][0], l[e][1]);
        } else {
            if (!0 === n) {
                n = !1;
                if (2 === x) {
                    w = !0;
                    M["push"]({ type: "L", values: [h, c] });
                } else {
                    3 === x && r(h, c);
                    (i || (0 !== i && 1 === x)) &&
                        w &&
                        M["push"]({ type: "Z", values: [] });
                    i = 1 - i;
                }
            }
        }
    }
    return M;
};
const Se = (l, a = 0.5) => {
    let o;
    let u;
    let p;
    let f;
    let h;
    let c;
    let i;
    let n;
    let m;
    let y;
    let d;
    let v;
    let b;
    let g;
    let x;
    let M;
    let w;
    let k;
    let A;
    let P = [];
    let r = !1;
    let s = (r, s) => {
        if (A) {
            let e = h - r;
            let t = c - s;
            k = Math["pow"](e * e + t * t, a);
            x = Math["sqrt"](k);
        }
        if (0 === A) {
            A = 1;
            i = r;
            n = s;
        } else {
            if (1 === A) {
                A = 2;
                m = r;
                y = s;
                P["push"]({ type: "M", values: [m, y] });
            } else {
                if (2 === A) {
                    A = 3;
                    d = r;
                    v = s;
                } else {
                    let l = p;
                    let a = f;
                    let i = h;
                    let n = c;
                    if (b > 1e-12) {
                        let e = 2 * M + 3 * b * g + w;
                        let t = 3 * b * (b + g);
                        l = (l * e - o * w + h * M) / t;
                        a = (a * e - u * w + c * M) / t;
                    }
                    if (x > 1e-12) {
                        let e = 2 * k + 3 * x * g + w;
                        let t = 3 * x * (x + g);
                        i = (i * e + p * k - r * w) / t;
                        n = (n * e + f * k - s * w) / t;
                    }
                    P["push"]({ type: "C", values: [l, a, i, n, h, c] });
                }
            }
        }
        b = g;
        g = x;
        M = w;
        w = k;
        o = p;
        p = h;
        h = r;
        u = f;
        f = c;
        c = s;
    };
    for (let e = 0, t = (l = xe(l, !0))["length"]; e <= t; e += 1) {
        if (e < t) {
            if (!1 === r) {
                r = !0;
                b = 0;
                g = 0;
                x = 0;
                M = 0;
                w = 0;
                k = 0;
                A = 0;
                s(l[e][0], l[e][1]);
            }
        } else {
            if (!0 === r) {
                r = !1;
                if (1 === A) {
                    P["push"]({ type: "M", values: [i, n] }, { type: "Z", values: [] });
                } else {
                    if (2 === A) {
                        P["push"]({ type: "L", values: [i, n] }, { type: "Z", values: [] });
                    } else {
                        if (3 === A) {
                            s(i, n);
                            s(m, y);
                            s(d, v);
                        }
                    }
                }
            }
        }
    }
    return P;
};
const Pe = (l, e = "hex") => {
    let a = 2166136261;
    for (let e = 0, t = l["length"]; e < t; e += 1) {
        a ^= l["charCodeAt"](e);
        a += (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
    }
    a >>>= 0;
    "hex" === e && (a = ("0000000" + a["toString"](16))["substr"](-8));
    return a;
};
const Ae = (r, s, o = null) => {
    if (!1 === (void 0 !== s["find"]((e) => Ee["has"](e["type"])))) {
        if (null !== o) {
            for (let e of s) e["values"] = e["values"]["map"]((e) => te(e, o));
        }
        r["setPathData"](s);
        r["removeAttribute"]("data-bx-d");
    } else {
        let e = Re(s, !1);
        let t = s;
        if (null !== o) {
            e["forEach"]((e) => (e.values = e.values["map"]((e) => te(e, o))));
            t["forEach"]((e) => (e.values = e.values["map"]((e) => te(e, o))));
        }
        let l = Ne(e);
        let a = Ne(t);
        let i = 1;
        let n = Pe(l + " / " + a + " " + i)["toString"](32);
        r["setAttribute"]("d", l);
        r["setAttribute"]("data-bx-d", a + " " + i + "@" + n);
    }
};
const $e = (t) => {
    let l = [];
    let a = [];
    for (let e of t) {
        if ("M" === e["type"] || "m" === e["type"]) {
            if (a[0]) {
                l["push"](a);
                a = [];
            }
            a["push"](e);
        } else {
            if ("Z" === e["type"] || "z" === e["type"]) {
                a["push"](e);
                l["push"](a);
                a = [];
            } else {
                a["push"](e);
            }
        }
    }
    a[0] && l["push"](a);
    return l;
};
const Le = (t) => {
    let n = !1;
    if (t["hasAttribute"]("data-bx-d")) {
        let i = t["getAttribute"]("d"),
            e = t["getAttribute"]("data-bx-d")
            ["trim"]()
            ["split"](/[\s+,]+/);
        if (e.length >= 3) {
            let l = e["slice"](0, e.length - 1),
                a = e[e.length - 1];
            if (a["includes"]("@")) {
                let [e, t] = a["split"]("@");
                t === Pe(i + " / " + l["join"](" ") + " " + e)["toString"](32) &&
                    (n = !0);
            }
        }
    }
    return n;
};
const Re = (n, e = !1) => {
    let a = [];
    let r = [];
    {
        let t = [];
        let l = null;
        let a = 0;
        let i = 0;
        for (let e of n) {
            if ("M" === e["type"] || "m" === e["type"]) {
                if (t[0]) {
                    r["push"](t);
                    t = [];
                }
                t["push"](e);
                a = e["values"][0];
                i = e["values"][1];
            } else {
                if ("Z" === e["type"] || "z" === e["type"]) {
                    t["push"](e);
                    r["push"](t);
                    t = [];
                } else {
                    ("Z" !== l && "z" !== l) || t["push"]({ type: "M", values: [a, i] });
                    t["push"](e);
                }
            }
            l = e["type"];
        }
        t[0] && r["push"](t);
    }
    for (let i of r)
        if ("R" === i[1]?.["type"]) {
            if (e) a["push"](...i);
            else {
                let t = [];
                let l = !1;
                for (let e of i)
                    "M" === e["type"] || "R" === e["type"]
                        ? t["push"]([e["values"][0], e["values"][1]])
                        : "Z" === e["type"] && (l = !0);
                a["push"](...ke(t, l));
            }
        } else {
            if ("U" === i[1]?.["type"]) {
                if (e) a["push"](...i);
                else {
                    let t = [];
                    let l = !1;
                    for (let e of i)
                        "M" === e["type"] || "U" === e["type"]
                            ? t["push"]([e["values"][0], e["values"][1]])
                            : "Z" === e["type"] && (l = !0);
                    a["push"](...we(t, l));
                }
            } else {
                if ("N" === i[1]?.["type"]) {
                } else {
                    let m = [];
                    let y = [];
                    {
                        let s = null;
                        let o = null;
                        let l = null;
                        let a = null;
                        for (let r of i) {
                            let e = r["type"];
                            if ("M" === e) {
                                let e = r["values"][0];
                                let t = r["values"][1];
                                m["push"]({ type: "M", values: [e, t] });
                                l = e;
                                a = t;
                                s = e;
                                o = t;
                            } else {
                                if ("m" === e) {
                                    let e = s + r["values"][0];
                                    let t = o + r["values"][1];
                                    m["push"]({ type: "M", values: [e, t] });
                                    l = e;
                                    a = t;
                                    s = e;
                                    o = t;
                                } else {
                                    if ("L" === e) {
                                        let e = r["values"][0];
                                        let t = r["values"][1];
                                        m["push"]({ type: "L", values: [e, t] });
                                        s = e;
                                        o = t;
                                    } else {
                                        if ("l" === e) {
                                            let e = s + r["values"][0];
                                            let t = o + r["values"][1];
                                            m["push"]({ type: "L", values: [e, t] });
                                            s = e;
                                            o = t;
                                        } else {
                                            if ("C" === e) {
                                                let e = r["values"][0];
                                                let t = r["values"][1];
                                                let l = r["values"][2];
                                                let a = r["values"][3];
                                                let i = r["values"][4];
                                                let n = r["values"][5];
                                                m["push"]({ type: "C", values: [e, t, l, a, i, n] });
                                                s = i;
                                                o = n;
                                            } else {
                                                if ("c" === e) {
                                                    let e = s + r["values"][0];
                                                    let t = o + r["values"][1];
                                                    let l = s + r["values"][2];
                                                    let a = o + r["values"][3];
                                                    let i = s + r["values"][4];
                                                    let n = o + r["values"][5];
                                                    m["push"]({ type: "C", values: [e, t, l, a, i, n] });
                                                    s = i;
                                                    o = n;
                                                } else {
                                                    if ("Q" === e) {
                                                        let e = r["values"][0];
                                                        let t = r["values"][1];
                                                        let l = r["values"][2];
                                                        let a = r["values"][3];
                                                        m["push"]({ type: "Q", values: [e, t, l, a] });
                                                        s = l;
                                                        o = a;
                                                    } else {
                                                        if ("q" === e) {
                                                            let e = s + r["values"][0];
                                                            let t = o + r["values"][1];
                                                            let l = s + r["values"][2];
                                                            let a = o + r["values"][3];
                                                            m["push"]({ type: "Q", values: [e, t, l, a] });
                                                            s = l;
                                                            o = a;
                                                        } else {
                                                            if ("A" === e) {
                                                                let e = r["values"][5];
                                                                let t = r["values"][6];
                                                                m["push"]({
                                                                    type: "A",
                                                                    values: [
                                                                        r["values"][0],
                                                                        r["values"][1],
                                                                        r["values"][2],
                                                                        r["values"][3],
                                                                        r["values"][4],
                                                                        e,
                                                                        t,
                                                                    ],
                                                                });
                                                                s = e;
                                                                o = t;
                                                            } else {
                                                                if ("a" === e) {
                                                                    let e = s + r["values"][5];
                                                                    let t = o + r["values"][6];
                                                                    m["push"]({
                                                                        type: "A",
                                                                        values: [
                                                                            r["values"][0],
                                                                            r["values"][1],
                                                                            r["values"][2],
                                                                            r["values"][3],
                                                                            r["values"][4],
                                                                            e,
                                                                            t,
                                                                        ],
                                                                    });
                                                                    s = e;
                                                                    o = t;
                                                                } else {
                                                                    if ("H" === e) {
                                                                        let e = r["values"][0];
                                                                        m["push"]({ type: "H", values: [e] });
                                                                        s = e;
                                                                    } else {
                                                                        if ("h" === e) {
                                                                            let e = s + r["values"][0];
                                                                            m["push"]({ type: "H", values: [e] });
                                                                            s = e;
                                                                        } else {
                                                                            if ("V" === e) {
                                                                                let e = r["values"][0];
                                                                                m["push"]({ type: "V", values: [e] });
                                                                                o = e;
                                                                            } else {
                                                                                if ("v" === e) {
                                                                                    let e = o + r["values"][0];
                                                                                    m["push"]({ type: "V", values: [e] });
                                                                                    o = e;
                                                                                } else {
                                                                                    if ("S" === e) {
                                                                                        let e = r["values"][0];
                                                                                        let t = r["values"][1];
                                                                                        let l = r["values"][2];
                                                                                        let a = r["values"][3];
                                                                                        m["push"]({
                                                                                            type: "S",
                                                                                            values: [e, t, l, a],
                                                                                        });
                                                                                        s = l;
                                                                                        o = a;
                                                                                    } else {
                                                                                        if ("s" === e) {
                                                                                            let e = s + r["values"][0];
                                                                                            let t = o + r["values"][1];
                                                                                            let l = s + r["values"][2];
                                                                                            let a = o + r["values"][3];
                                                                                            m["push"]({
                                                                                                type: "S",
                                                                                                values: [e, t, l, a],
                                                                                            });
                                                                                            s = l;
                                                                                            o = a;
                                                                                        } else {
                                                                                            if ("T" === e) {
                                                                                                let e = r["values"][0];
                                                                                                let t = r["values"][1];
                                                                                                m["push"]({
                                                                                                    type: "T",
                                                                                                    values: [e, t],
                                                                                                });
                                                                                                s = e;
                                                                                                o = t;
                                                                                            } else {
                                                                                                if ("t" === e) {
                                                                                                    let e = s + r["values"][0];
                                                                                                    let t = o + r["values"][1];
                                                                                                    m["push"]({
                                                                                                        type: "T",
                                                                                                        values: [e, t],
                                                                                                    });
                                                                                                    s = e;
                                                                                                    o = t;
                                                                                                } else {
                                                                                                    if (
                                                                                                        !("Z" !== e && "z" !== e)
                                                                                                    ) {
                                                                                                        m["push"]({
                                                                                                            type: "Z",
                                                                                                            values: [],
                                                                                                        });
                                                                                                        s = l;
                                                                                                        o = a;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        let u = 0;
                        let p = 0;
                        let l = 0;
                        let a = 0;
                        let f = null;
                        let h = null;
                        let c = null;
                        for (let e = 0; e < m["length"]; e += 1) {
                            let o = m[e];
                            if ("M" === o["type"]) {
                                let e = o["values"][0];
                                let t = o["values"][1];
                                y["push"]({ type: "M", values: [e, t] });
                                l = e;
                                a = t;
                                u = e;
                                p = t;
                            } else {
                                if ("C" === o["type"]) {
                                    let e = o["values"][0];
                                    let t = o["values"][1];
                                    let l = o["values"][2];
                                    let a = o["values"][3];
                                    let i = o["values"][4];
                                    let n = o["values"][5];
                                    y["push"]({ type: "C", values: [e, t, l, a, i, n] });
                                    f = l;
                                    h = a;
                                    u = i;
                                    p = n;
                                } else {
                                    if ("L" === o["type"]) {
                                        let e = o["values"][0];
                                        let t = o["values"][1];
                                        y["push"]({ type: "L", values: [e, t] });
                                        u = e;
                                        p = t;
                                    } else {
                                        if ("H" === o["type"]) {
                                            let e = o["values"][0];
                                            y["push"]({ type: "L", values: [e, p] });
                                            u = e;
                                        } else {
                                            if ("V" === o["type"]) {
                                                let e = o["values"][0];
                                                y["push"]({ type: "L", values: [u, e] });
                                                p = e;
                                            } else {
                                                if ("S" === o["type"]) {
                                                    let e;
                                                    let t;
                                                    let l = o["values"][0];
                                                    let a = o["values"][1];
                                                    let i = o["values"][2];
                                                    let n = o["values"][3];
                                                    if ("C" === c || "S" === c) {
                                                        e = u + (u - Number(f));
                                                        t = p + (p - Number(h));
                                                    } else {
                                                        e = u;
                                                        t = p;
                                                    }
                                                    y["push"]({ type: "C", values: [e, t, l, a, i, n] });
                                                    f = l;
                                                    h = a;
                                                    u = i;
                                                    p = n;
                                                } else {
                                                    if ("T" === o["type"]) {
                                                        let e;
                                                        let t;
                                                        let l = o["values"][0];
                                                        let a = o["values"][1];
                                                        if ("Q" === c || "T" === c) {
                                                            e = u + (u - Number(f));
                                                            t = p + (p - Number(h));
                                                        } else {
                                                            e = u;
                                                            t = p;
                                                        }
                                                        let i = u + (2 * (e - u)) / 3;
                                                        let n = p + (2 * (t - p)) / 3;
                                                        let r = l + (2 * (e - l)) / 3;
                                                        let s = a + (2 * (t - a)) / 3;
                                                        y["push"]({
                                                            type: "C",
                                                            values: [i, n, r, s, l, a],
                                                        });
                                                        f = e;
                                                        h = t;
                                                        u = l;
                                                        p = a;
                                                    } else {
                                                        if ("Q" === o["type"]) {
                                                            let e = o["values"][0];
                                                            let t = o["values"][1];
                                                            let l = o["values"][2];
                                                            let a = o["values"][3];
                                                            let i = u + (2 * (e - u)) / 3;
                                                            let n = p + (2 * (t - p)) / 3;
                                                            let r = l + (2 * (e - l)) / 3;
                                                            let s = a + (2 * (t - a)) / 3;
                                                            y["push"]({
                                                                type: "C",
                                                                values: [i, n, r, s, l, a],
                                                            });
                                                            f = e;
                                                            h = t;
                                                            u = l;
                                                            p = a;
                                                        } else {
                                                            if ("A" === o["type"]) {
                                                                let e = Math["abs"](o["values"][0]);
                                                                let t = Math["abs"](o["values"][1]);
                                                                let l = o["values"][2];
                                                                let a = o["values"][3];
                                                                let i = o["values"][4];
                                                                let n = o["values"][5];
                                                                let r = o["values"][6];
                                                                if (0 === e || 0 === t) {
                                                                    y["push"]({
                                                                        type: "C",
                                                                        values: [u, p, n, r, n, r],
                                                                    });
                                                                    u = n;
                                                                    p = r;
                                                                } else {
                                                                    if (u !== n || p !== r) {
                                                                        ue(u, p, n, r, e, t, l, a, i)["forEach"](
                                                                            function (e) {
                                                                                y["push"]({ type: "C", values: e });
                                                                            }
                                                                        );
                                                                        u = n;
                                                                        p = r;
                                                                    }
                                                                }
                                                            } else {
                                                                if ("Z" === o["type"]) {
                                                                    y["push"](o);
                                                                    u = l;
                                                                    p = a;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            c = o["type"];
                        }
                    }
                    a["push"](...y);
                }
            }
        }
    return a;
};
const Ie = (l) => {
    let e = (l = structuredClone(l))[0];
    let a = null;
    let i = [];
    for (let t = 1; t < l["length"]; t += 1) {
        let e = l[t];
        "Z" === e["type"] ? (a = e) : i["push"](e);
    }
    let s = e.values[0];
    let o = e.values[1];
    if ("C" === i[i.length - 1]["type"]) {
        e.values[0] = i[i.length - 1].values[4];
        e.values[1] = i[i.length - 1].values[5];
    } else {
        e.values[0] = i[i.length - 1].values[0];
        e.values[1] = i[i.length - 1].values[1];
    }
    for (let r of i)
        if (
            "L" === r["type"] ||
            "R" === r["type"] ||
            "U" === r["type"] ||
            "N" === r["type"]
        ) {
            let [e, t] = r["values"];
            r["values"] = [s, o];
            s = e;
            o = t;
        } else {
            if ("C" === r["type"]) {
                let [e, t, l, a, i, n] = r["values"];
                r["values"] = [l, a, e, t, s, o];
                s = i;
                o = n;
            }
        }
    i["reverse"]();
    let t = [];
    t["push"](e);
    for (let e of i) t["push"](e);
    a && t["push"](a);
    return t;
};
let ue = (u, p, f, h, c, m, a, y, d, e) => {
    let v;
    let b;
    let g;
    let x;
    let M = ri(a);
    let n = [];
    let w = (e, t, l) => ({
        x: e * Math.cos(l) - t * Math.sin(l),
        y: e * Math.sin(l) + t * Math.cos(l),
    });
    if (e) {
        v = e[0];
        b = e[1];
        g = e[2];
        x = e[3];
    } else {
        let e = w(u, p, -M);
        u = e["x"];
        p = e["y"];
        let t,
            l = w(f, h, -M),
            a = (u - (f = l["x"])) / 2,
            i = (p - (h = l["y"])) / 2,
            n = (a * a) / (c * c) + (i * i) / (m * m);
        if (n > 1) {
            n = Math.sqrt(n);
            c *= n;
            m *= n;
        }
        t = y === d ? -1 : 1;
        let r = c * c;
        let s = m * m;
        let o =
            t *
            Math.sqrt(
                Math.abs((r * s - r * i * i - s * a * a) / (r * i * i + s * a * a))
            );
        g = (o * c * i) / m + (u + f) / 2;
        x = (o * -m * a) / c + (p + h) / 2;
        v = Math.asin(parseFloat(((p - x) / m).toFixed(9)));
        b = Math.asin(parseFloat(((h - x) / m).toFixed(9)));
        u < g && (v = Math.PI - v);
        f < g && (b = Math.PI - b);
        v < 0 && (v = 2 * Math.PI + v);
        b < 0 && (b = 2 * Math.PI + b);
        d && v > b && (v -= 2 * Math.PI);
        !d && b > v && (b -= 2 * Math.PI);
    }
    let t = b - v;
    if (Math.abs(t) > (120 * Math.PI) / 180) {
        let e = b;
        let t = f;
        let l = h;
        b =
            d && b > v
                ? v + ((120 * Math.PI) / 180) * 1
                : v + ((120 * Math.PI) / 180) * -1;
        f = g + c * Math.cos(b);
        h = x + m * Math.sin(b);
        n = ue(f, h, t, l, c, m, a, 0, d, [b, e, g, x]);
    }
    t = b - v;
    let l = Math.cos(v);
    let i = Math.sin(v);
    let r = Math.cos(b);
    let s = Math.sin(b);
    let o = Math.tan(t / 4);
    let k = (4 / 3) * c * o;
    let A = (4 / 3) * m * o;
    let P = [u, p];
    let N = [u + k * i, p - A * l];
    let S = [f + k * s, h - A * r];
    let T = [f, h];
    N[0] = 2 * P[0] - N[0];
    N[1] = 2 * P[1] - N[1];
    if (e) return [N, S, T]["concat"](n);
    {
        n = [N, S, T]["concat"](n);
        let i = [];
        for (let a = 0; a < n["length"]; a += 3) {
            let e = w(n[a][0], n[a][1], M);
            let t = w(n[a + 1][0], n[a + 1][1], M);
            let l = w(n[a + 2][0], n[a + 2][1], M);
            i["push"]([e["x"], e["y"], t["x"], t["y"], l["x"], l["y"]]);
        }
        return i;
    }
};
const xe = (e, t = !1) =>
    t ? e["unshift"](e["pop"]()) : e["push"](e["shift"]());
const me = (t, l, e = !1) => {
    if (t["length"] !== l["length"]) return !1;
    if (e)
        for (let e in t) {
            if (t[e] !== l[e]) return !1;
        }
    else {
        for (let e = 0; e < t["length"]; e += 1)
            if (!l["includes"](t[e])) return !1;
        for (let e = 0; e < l["length"]; e += 1)
            if (!t["includes"](l[e])) return !1;
    }
    return !0;
};
const fe = (e) => [...new Set(e)];
const be = (t, l) => {
    if (0 === t["length"]) return !1;
    for (let e = 0; e < t["length"]; e += 1) if (t[e] !== l) return !1;
    return !0;
};
const we = (e, t = !1) => {
    let l;
    e[0] instanceof DOMPoint && (e = e["map"]((e) => [e["x"], e["y"]]));
    l = t ? ye(e) : ve(e);
    return l;
};
const ve = (l) => {
    let a;
    let i;
    let n;
    let r;
    let s;
    let o;
    let u = [];
    let p = !1,
        f = !1;
    var h;
    var c;
    for (let e = 0, t = l["length"]; e <= t; e += 1) {
        if (e < t) {
            if (!1 === p) {
                p = !0;
                a = 0;
            }
            h = l[e][0];
            c = l[e][1];
            if (0 === a) {
                a = 1;
                f = !0;
                i
                    ? u["push"]({ type: "L", values: [h, c] })
                    : u["push"]({ type: "M", values: [h, c] });
            } else {
                if (1 === a) {
                    a = 2;
                } else {
                    if (2 === a) {
                        a = 3;
                        f = !0;
                        u["push"](
                            { type: "L", values: [(5 * n + s) / 6, (5 * r + o) / 6] },
                            {
                                type: "C",
                                values: [
                                    (2 * n + s) / 3,
                                    (2 * r + o) / 3,
                                    (n + 2 * s) / 3,
                                    (r + 2 * o) / 3,
                                    (n + 4 * s + h) / 6,
                                    (r + 4 * o + c) / 6,
                                ],
                            }
                        );
                    } else {
                        f = !0;
                        u["push"]({
                            type: "C",
                            values: [
                                (2 * n + s) / 3,
                                (2 * r + o) / 3,
                                (n + 2 * s) / 3,
                                (r + 2 * o) / 3,
                                (n + 4 * s + h) / 6,
                                (r + 4 * o + c) / 6,
                            ],
                        });
                    }
                }
            }
            n = s;
            r = o;
            s = h;
            o = c;
        } else {
            if (!0 === p) {
                p = !1;
                if (3 === a) {
                    f = !0;
                    u["push"](
                        {
                            type: "C",
                            values: [
                                (2 * n + s) / 3,
                                (2 * r + o) / 3,
                                (n + 2 * s) / 3,
                                (r + 2 * o) / 3,
                                (n + 4 * s + s) / 6,
                                (r + 4 * o + o) / 6,
                            ],
                        },
                        { type: "L", values: [s, o] }
                    );
                } else {
                    if (2 === a) {
                        f = !0;
                        u["push"]({ type: "L", values: [s, o] });
                    }
                }
                (i || (0 !== i && 1 === a)) &&
                    f &&
                    u["push"]({ type: "Z", values: [] });
                i = 1 - i;
            }
        }
    }
    return u;
};
const ye = (l) => {
    let a;
    let i;
    let n;
    let r;
    let s;
    let o;
    let u;
    let p;
    let f;
    let h;
    let c;
    let m = [];
    let y = !1;
    let d = (e, t) => {
        if (0 === a) {
            a = 1;
            o = e;
            u = t;
        } else {
            if (1 === a) {
                a = 2;
                p = e;
                f = t;
            } else {
                if (2 === a) {
                    a = 3;
                    h = e;
                    c = t;
                    m.push({
                        type: "M",
                        values: [(i + 4 * r + e) / 6, (n + 4 * s + t) / 6],
                    });
                } else {
                    m.push({
                        type: "C",
                        values: [
                            (2 * i + r) / 3,
                            (2 * n + s) / 3,
                            (i + 2 * r) / 3,
                            (n + 2 * s) / 3,
                            (i + 4 * r + e) / 6,
                            (n + 4 * s + t) / 6,
                        ],
                    });
                }
            }
        }
        i = r;
        n = s;
        r = e;
        s = t;
    };
    for (let e = 0, t = (l = xe(l, !0))["length"]; e <= t; e += 1) {
        if (e < t) {
            if (!1 === y) {
                y = !0;
                a = 0;
            }
            d(l[e][0], l[e][1]);
        } else {
            if (!0 === y) {
                y = !1;
                if (1 === a) {
                    m.push({ type: "M", values: [o, u] });
                    m.push({ type: "Z", values: [] });
                } else {
                    if (2 === a) {
                        m.push({ type: "M", values: [(o + 2 * p) / 3, (u + 2 * f) / 3] });
                        m.push({ type: "L", values: [(p + 2 * o) / 3, (f + 2 * u) / 3] });
                        m.push({ type: "Z", values: [] });
                    } else {
                        if (3 === a) {
                            d(o, u);
                            d(p, f);
                            d(h, c);
                        }
                    }
                }
            }
        }
    }
    return m;
};
const ze = new Set(["M", "Z", "L", "C", "R", "U", "N"]);
const Oe = new Set(["L", "C", "Q", "A", "H", "V", "S", "T", "R", "U", "N"]);
const Ee = new Set(["R", "U", "N"]);
const Te = (e, t = !0) => {
    let l = [];
    if ("path" === e.localName) {
        if (!1 === t) {
            l = tt(e.getPathData({ normalize: !0 }));
        } else {
            let i = void 0;
            if (e["hasAttribute"]("data-bx-d")) {
                let a = e["getAttribute"]("data-bx-d")
                ["trim"]()
                ["split"](/[\s+,]+/);
                if (a.length >= 3) {
                    if (a[a.length - 1]["includes"]("@") ? a[a.length - 1] : null) {
                        let l = void 0;
                        i = [];
                        for (let t = 0; t < a.length - 1; t += 1) {
                            let e = a[t];
                            if (ze["has"](e)) {
                                l = { type: e, values: [] };
                                i["push"](l);
                            } else {
                                l["values"]["push"](parseFloat(e));
                            }
                        }
                    }
                }
            }
            l = i || tt(e.getPathData({ normalize: !0 }));
        }
    } else
        ["circle", "ellipse", "line", "polygon", "polyline", "rect"].includes(
            e.localName
        ) && (l = e.getPathData({ normalize: !0 }));
    return l;
};
const tt = (t) => {
    if (!t.find((e) => "C" === e.type || "L" === e.type)) return [];
    let l = [];
    let a = null;
    let i = 0;
    let n = 0;
    let r = 0;
    let s = 0;
    for (let e of t) {
        if ("M" === e.type) {
            "M" === a && l.pop();
            l.push(e);
            i = e.values[0];
            n = e.values[1];
            r = e.values[0];
            s = e.values[1];
        } else {
            if ("L" === e["type"]) {
                if ("Z" === a) l["push"]({ type: "M", values: [r, s] });
                else {
                    if (e["values"][0] === i && e["values"][1] === n) continue;
                }
                l["push"](e);
                i = e["values"][0];
                n = e["values"][1];
            } else {
                if ("C" === e["type"]) {
                    "Z" === a && l["push"]({ type: "M", values: [r, s] });
                    l["push"](e);
                    i = e["values"][4];
                    n = e["values"][5];
                } else {
                    (i === r && n === s) || l["push"]({ type: "L", values: [r, s] });
                    l["push"](e);
                    i = r;
                    n = s;
                }
            }
        }
        a = e["type"];
    }
    return l;
};
const ti = (e) => {
    let t = Yt["createSVGPoint"]();
    t["x"] = e["x"];
    t["y"] = e["y"];
    return t;
};
const il = (e, t) => {
    let l = $t(new ee(e[1]), new ee(e[0]));
    let a = $t(new ee(e[e["length"] - 3]), new ee(e[e["length"] - 2]));
    l = l["normalize"]();
    a = a["normalize"]();
    return sl(e, 0, e["length"] - 1, l, a, t);
};
let sl = (s, o, u, p, f, a) => {
    if (u - o === 1) {
        let e = s[o];
        let t = s[u];
        let l = Kt(e, t) / 3;
        let a = new ee(e);
        let i = new ee(t);
        let n = Lt(a, p["scale"](l));
        let r = Lt(i, f["scale"](l));
        return [[e, new DOMPoint(n["x"], n["y"]), new DOMPoint(r["x"], r["y"]), t]];
    }
    let i;
    let n = ol(s, o, u);
    let r = Math.max(a, a * a);
    for (let e = 0; e <= 4; e += 1) {
        let e = nl(s, o, u, n, p, f);
        let [t, l] = hl(s, o, u, e, n);
        if (t < a) return [e];
        i = l;
        if (t >= r) break;
        al(s, o, u, n, e);
        r = t;
    }
    let e = $t(new ee(s[i - 1]), new ee(s[i]));
    let t = $t(new ee(s[i]), new ee(s[i + 1]));
    let l = Lt(e, t)["multiply"](0.5)["normalize"]();
    let h = sl(s, o, i, p, l, a);
    let c = sl(s, i, u, l["multiply"](-1), f, a);
    return h["concat"](c);
};
const nl = (f, h, e, c, m, y) => {
    let t = f[h];
    let l = f[e];
    let d = new ee(t);
    let v = new ee(l);
    let b = [
        [0, 0],
        [0, 0],
    ];
    let g = [0, 0];
    let a = e - h + 1;
    for (let p = 0; p < a; p += 1) {
        let e = c[p];
        let t = 1 - e;
        let l = 3 * e * t;
        let a = t * t * t;
        let i = l * t;
        let n = l * e;
        let r = e * e * e;
        let s = m["scale"](i);
        let o = y["scale"](n);
        b[0][0] += At(s, s);
        b[0][1] += At(s, o);
        b[1][0] = b[0][1];
        b[1][1] += At(o, o);
        let u = new ee(f[h + p]);
        u = $t(u, d["multiply"](a + i));
        u = $t(u, v["multiply"](n + r));
        g[0] += At(s, u);
        g[1] += At(o, u);
    }
    let i,
        n,
        r = b[0][0] * b[1][1] - b[1][0] * b[0][1],
        s = 1e-6;
    if (Math.abs(r) > s) {
        let e = b[0][0] * g[1] - b[1][0] * g[0];
        i = (g[0] * b[1][1] - g[1] * b[0][1]) / r;
        n = e / r;
    } else {
        let e = b[0][0] + b[0][1];
        let t = b[1][0] + b[1][1];
        i = n = Math.abs(e) > s ? g[0] / e : Math.abs(t) > s ? g[1] / t : 0;
    }
    let o = Kt(l, t);
    s *= o;
    (i < s || n < s) && (i = n = o / 3);
    let u = Lt(d, m["scale"](i));
    let p = Lt(v, y["scale"](n));
    return [t, new DOMPoint(u.x, u.y), new DOMPoint(p["x"], p["y"]), l];
};
const ol = (t, l, a) => {
    let i = [0];
    for (let e = l + 1; e <= a; e += 1)
        i[e - l] = i[e - l - 1] + Kt(t[e], t[e - 1]);
    for (let e = 1, t = a - l; e <= t; e += 1) i[e] /= i[a - l];
    return i;
};
const al = (t, l, a, i, n) => {
    let r = [];
    for (let e = l; e <= a; e += 1) r[e - l] = ll(n, t[e], i[e - l]);
    return r;
};
const ll = (l, e, t) => {
    let a = [];
    let i = [];
    for (let t = 0; t <= 2; t += 1) {
        let e = $t(new ee(l[t + 1]), new ee(l[t]));
        a[t] = e["multiply"](3);
    }
    for (let t = 0; t <= 1; t++) {
        let e = $t(a[t + 1], a[t]);
        i[t] = e["multiply"](2);
    }
    let n = rl(3, l, t);
    let r = rl(2, a, t);
    let s = rl(1, i, t);
    let o = $t(n, new ee(e));
    let u = At(r, r) + At(o, s);
    return Math.abs(u) < 1e-6 ? t : t - At(o, r) / u;
};
const rl = (l, e, a) => {
    let i = e["map"]((e) => new ee(e));
    for (let t = 1; t <= l; t += 1)
        for (let e = 0; e <= l - t; e += 1)
            i[e] = Lt(i[e]["multiply"](1 - a), i[e + 1]["multiply"](a));
    return i[0];
};
const hl = (l, a, e, i, n) => {
    let r = Math.floor((e - a + 1) / 2);
    let s = 0;
    for (let t = a + 1; t < e; t++) {
        let e = $t(rl(3, i, n[t - a]), new ee(l[t]))["length"];
        if (e >= s) {
            s = e;
            r = t;
        }
    }
    return [s, r];
};
const Qd = (e) => !/[^\t\n\r ]/["test"](e);
const Xd = (t) => {
    for (let e = t; e; e = e["parentNode"])
        if (e instanceof ShadowRoot || e === window["document"]) return e;
};
const Xl = (l) =>
    new Promise((e) => {
        let t = new FileReader();
        t["readAsDataURL"](l);
        t["onloadend"] = () => {
            e(t["result"]);
        };
    });
const Il = (a) => {
    let t = a["querySelectorAll"]("textPath");
    a["querySelectorAll"]("tspan");
    let i = t["length"] > 0 ? t[0] : null;
    {
        let e =
            a["hasAttribute"]("width") || a["hasAttribute"]("height")
                ? "pre-wrap"
                : "pre";
        a["style"].setProperty("white-space", e);
    }
    if (t.length > 1) {
        for (let e of t) e !== i && e.remove();
    }
    if (i) {
        i.parentElement !== a && a.append(i);
        for (let e of [...a.childNodes])
            ["a", "tspan", "#text"].includes(e.localName) && e.remove();
        if (i.hasAttribute("style")) {
            for (let l of i.style) {
                let e = a.style.getPropertyValue(l);
                let t = i.style.getPropertyValue(l);
                e !== t && a.style.setProperty(l, t);
            }
            i.removeAttribute("style");
        }
    }
};
const Bl = (e) => {
    let t = Ki(e);
    let l = e.href.baseVal ? t.querySelector(e.href.baseVal) : null;
    if (
        l &&
        ["rect", "circle", "ellipse", "line", "polyline", "polygon"].includes(
            l.localName
        )
    ) {
        let e = zl(l);
        l["replaceWith"](e);
    }
};
const Ul = (e) => {
    let l = 0;
    let a = [...e.children].filter((e) => "stop" === e.localName);
    for (let t of a)
        if (t.hasAttribute("offset")) {
            let e = t.offset.baseVal;
            e < l && (e = l);
            e = ie(e, 0, 1, 4);
            l = e;
            t.setAttribute("offset", e);
        }
};
const _l = (t) => {
    {
        let l = 0;
        let e = [...t.children]["filter"]((e) => "stop" === e["localName"]);
        for (let t of e)
            if (t.hasAttribute("offset")) {
                let e = t.offset.baseVal;
                e < l && (e = l);
                e = ie(e, 0, 1, 4);
                l = e;
                t.setAttribute("offset", e);
            }
    }
    t.removeAttribute("fx");
    t.removeAttribute("d9");
    t.removeAttribute("fr");
};
const Fl = (t) => {
    let l = Ki(t);
    if (!1 === t["hasAttribute"]("id")) {
        let e = 0;
        for (; null !== l["querySelector"]("#pattern-" + e);) e += 1;
        t["setAttribute"]("id", "pattern-" + e);
    }
};
const Gl = (t) => {
    let l = Ki(t);
    if (!1 === t["hasAttribute"]("id")) {
        let e = 0;
        for (; null !== l["querySelector"]("#symbol-" + e);) e += 1;
        t["setAttribute"]("id", "symbol-" + e);
    }
};
const Nl = (t) => {
    let l = Ki(t);
    if (!1 === t["hasAttribute"]("id")) {
        let e = 0;
        for (; null !== l["querySelector"]("#marker-" + e);) e += 1;
        t["setAttribute"]("id", "marker-" + e);
    }
};
const jl = (e) => { };
const Vl = (e) => {
    let t = new DOMParser();
    let l = t["parseFromString"](e, "text/html")["querySelector"]("body");
    let n = null;
    Object["values"](u);
    let a = !0;
    if (
        1 === l["children"]["length"] &&
        "svg" === l["children"][0]["localName"]
    ) {
        for (let e of l["children"][0]["attributes"])
            if (
                e["name"]["startsWith"]("xmlns") &&
                e["value"]["startsWith"]("http://schemas.microsoft.com/visio")
            ) {
                a = !1;
                break;
            }
    } else a = !1;
    if (a) n = l["children"][0];
    else {
        let a =
            t["parseFromString"](e, "image/svg+xml")["querySelector"]("svg") || null;
        let i = { title: !0, switch: !0 };
        for (let e of I) i[e] = !0;
        if (a) {
            let e;
            let t = document["createNodeIterator"](a, NodeFilter["SHOW_ELEMENT"], {
                acceptNode: (e) =>
                    "foreignObject" === e["localName"]
                        ? NodeFilter["FILTER_SKIP"]
                        : NodeFilter["FILTER_ACCEPT"],
            });
            for (; (e = t["nextNode"]());)
                e["namespaceURI"] === u["svg"]
                    ? !0 !== i[e["localName"]] && e["remove"]()
                    : e["namespaceURI"] === u["bx"] || e["remove"]();
            if (!1 === a["hasAttribute"]("xmlns")) {
                let t = document["createElementNS"](u["svg"], "svg");
                t["setAttribute"]("xmlns", u["svg"]);
                for (let e of a["attributes"])
                    t["setAttribute"](e["name"], a["getAttribute"](e["name"]));
                for (let e of [...a["childNodes"]]) t["append"](e);
                a = t;
            }
            let l =
                '<?xml version="1.0" encoding="utf-8"?>\n' +
                new XMLSerializer()["serializeToString"](a);
            n =
                new DOMParser()
                ["parseFromString"](l, "text/html")
                ["querySelector"]("svg") || null;
        }
    }
    return n;
};
let Sl = (e) => {
    let a = [];
    let r = !1;
    for (let t of e.querySelectorAll("style")) {
        let r = {};
        let e = [];
        for (let n of t["sheet"]["cssRules"])
            if (n["type"] === CSSRule["FONT_FACE_RULE"]) {
            } else {
                if (n["type"] === CSSRule["IMPORT_RULE"]) {
                    if (n["href"]["startsWith"]("https://fonts.css2")) {
                        let i = new URL(n["href"]);
                        let e = new URLSearchParams(i["search"]);
                        for (let a of e["getAll"]("family")) {
                            let [e] = a["split"](":");
                            let t = new URLSearchParams(i["search"]);
                            t["set"]("family", a);
                            let l =
                                "https://fonts.css2?" + decodeURIComponent(t["toString"]());
                            void 0 === r[e] && (r[e] = []);
                            r[e]["push"]({
                                cssText: '@import url("' + encodeURI(l) + '");',
                                href: l,
                                type: n["type"],
                            });
                        }
                    } else {
                        if (n["href"]["startsWith"]("https://fonts.css")) {
                            let i = new URL(n["href"]);
                            let e = new URLSearchParams(i["search"]);
                            for (let a of e["get"]("family")["split"]("|")) {
                                let [e] = a["split"](":");
                                let t = new URLSearchParams(i["search"]);
                                t["set"]("family", a);
                                let l =
                                    "https://fonts.css?" + decodeURIComponent(t["toString"]());
                                void 0 === r[e] && (r[e] = []);
                                r[e]["push"]({
                                    cssText: '@import url("' + encodeURI(l) + '");',
                                    href: l,
                                    type: n["type"],
                                });
                            }
                        } else e["push"](n);
                    }
                } else e["push"](n);
            }
        (Object.keys(r).length > 0 || t.hasAttribute("data-bx-fonts")) &&
            a["push"]({ styleElement: t, fontRulesByFamily: r, otherRules: e });
    }
    {
        let n = [];
        for (let i of a) {
            let { styleElement: t, fontRulesByFamily: e, otherRules: l } = i;
            let a = Object.keys(e);
            if (0 === a.length) {
                if (t.hasAttribute("data-bx-fonts")) {
                    r = !0;
                    break;
                }
            } else {
                if (1 === a.length) {
                    let e = a[0];
                    if (n.includes(e)) {
                        r = !0;
                        break;
                    }
                    if (t.getAttribute("data-bx-fonts" !== e)) {
                        r = !0;
                        break;
                    }
                    if (l.length > 0) {
                        r = !0;
                        break;
                    }
                } else {
                    if (a.length > 1) {
                        r = !0;
                        break;
                    }
                }
            }
            n.push(...a);
        }
    }
    if (!0 === r) {
        for (let l of a)
            for (let [t, e] of Object.entries(l.fontRulesByFamily)) {
                let e = a.find((e) => void 0 !== e.fontRulesByFamily[t]);
                if (e !== l) {
                    delete l.fontRulesByFamily[t];
                }
            }
        for (let { styleElement: i, fontRulesByFamily: e, otherRules: l } of a) {
            for (let [l, a] of Object.entries(e)) {
                let e = Zi("svg:style");
                let t = "";
                a.sort((e) => (e.type === CSSRule.IMPORT_RULE ? -1 : 1));
                for (let e of a) t += e.cssText;
                e.textContent = t;
                e.setAttribute("data-bx-fonts", l);
                i.hasAttribute("data-bx-pinned") &&
                    e.setAttribute("data-bx-pinned", "");
                i.before(e);
            }
            if (0 === l.length) i.remove();
            else {
                let t = "";
                for (let e of l) t += e.cssText;
                i.removeAttribute("data-bx-fonts");
                i.removeAttribute("data-bx-pinned");
                i.textContent = t;
            }
        }
    }
};
const Ml = (e) => {
    switch (e) {
        case "normal":
            return "400";
        case "bold":
            return "700";
        default:
            return e;
    }
};
const Pl = (t, l) => {
    for (let e of kl[t]) if (l["includes"](e)) return e;
};
const ql = (n, e) =>
    new Promise((t) => {
        let l;
        let a;
        let i = new FileReader();
        i.addEventListener(
            "error",
            (a = () => {
                i.removeEventListener("load", l);
                i.removeEventListener("error", a);
                t(null);
            })
        );
        if ("text" === e) {
            i.readAsText(n);
            i.addEventListener(
                "load",
                (l = (e) => {
                    i.removeEventListener("load", l);
                    i.removeEventListener("error", a);
                    t(e.target.result);
                })
            );
        } else {
            if ("arrayBuffer" === e) {
                i.readAsArrayBuffer(n);
                i.addEventListener(
                    "load",
                    (l = (e) => {
                        i.removeEventListener("load", l);
                        i.removeEventListener("error", a);
                        t(new Uint8Array(e.target.result));
                    })
                );
            } else {
                if ("dataURL" === e) {
                    let e = Kl(n);
                    i.readAsDataURL(n);
                    i.addEventListener(
                        "load",
                        (l = (e) => {
                            i.removeEventListener("load", l);
                            i.removeEventListener("error", a);
                            t(e.target.result);
                        })
                    );
                }
            }
        }
    });
const Kl = (e) =>
    e.name && e.name.includes(".")
        ? e.name.substring(e.name.lastIndexOf(".") + 1).toLowerCase()
        : "";
const zl = (e, t = 6) => {
    let l = null;
    "rect" === e.localName
        ? (l = Ol(e, t))
        : "circle" === e.localName
            ? (l = El(e, t))
            : "ellipse" === e.localName
                ? (l = Tl(e, t))
                : "line" === e.localName
                    ? (l = Al(e, t))
                    : "polyline" === e.localName
                        ? (l = $l(e, t))
                        : "polygon" === e.localName && (l = Ll(e, t));
    return l;
};
const Ol = (t, l = 6) => {
    const a = Zi("svg:path");
    const i = t.getPathData();
    for (let e of i) e.values = e.values.map((e) => te(e, l));
    a.setPathData(i);
    for (let e of t.attributes)
        !1 === ["x", "y", "width", "height", "rx", "ry"].includes(e.name) &&
            a.setAttribute(e.name, e.value);
    a.innerHTML = t.innerHTML;
    return a;
};
const El = (t, l = 6) => {
    let a = Zi("svg:path");
    let i = t.getPathData();
    for (let e of i) e.values = e.values.map((e) => te(e, l));
    a.setPathData(i);
    for (let e of t.attributes)
        ["cx", "cy", "r"].includes(e.name) || a.setAttribute(e.name, e.value);
    a.innerHTML = t.innerHTML;
    return a;
};
const Tl = (t, l = 6) => {
    let a = Zi("svg:path");
    let i = t.getPathData();
    for (let e of i) e.values = e.values.map((e) => te(e, l));
    a.setPathData(i);
    for (let e of t.attributes)
        ["cx", "cy", "rx", "ry"].includes(e.name) ||
            a.setAttribute(e.name, e.value);
    a.innerHTML = t.innerHTML;
    return a;
};
const Al = (t, l = 6) => {
    let a = Zi("svg:path");
    let i = t.getPathData();
    for (let e of i) e.values = e.values.map((e) => te(e, l));
    a.setPathData(i);
    for (let e of t.attributes)
        ["x1", "y1", "x2", "y2"].includes(e.name) ||
            a.setAttribute(e.name, e.value);
    a.innerHTML = t.innerHTML;
    return a;
};
const $l = (t, l = 6) => {
    let a = Zi("svg:path");
    let i = t.getPathData();
    for (let e of i) e.values = e.values.map((e) => te(e, l));
    a.setPathData(i);
    for (let e of t.attributes)
        "points" !== e.name && a.setAttribute(e.name, e.value);
    a.innerHTML = t.innerHTML;
    return a;
};
const Ll = (t, l = 6) => {
    let a = Zi("svg:path");
    let i = t.getPathData();
    for (let e of i) e.values = e.values.map((e) => te(e, l));
    a.setPathData(t.getPathData());
    for (let e of t.attributes)
        "points" !== e.name && a.setAttribute(e.name, e.value);
    a.innerHTML = t.innerHTML;
    return a;
};
const Rl = (e) => {
    let a;
    let i = Vl(e);
    let t =
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT;
    let l = document.createNodeIterator(i, t);
    for (; (a = l.nextNode());)
        if (a.nodeType !== Node.ELEMENT_NODE)
            !1 === (N[a.parentNode.nodeName] || []).includes(a.nodeName) &&
                a.remove();
        else {
            if (a.localName.includes(":")) {
                if (a.localName.startsWith("bx:")) {
                    let e = a.localName.split(":")[1];
                    let t = document.createElement("bx-" + e);
                    for (let e of [...a.attributes]) t.setAttribute(e.name, e.value);
                    for (let e of [...a.childNodes]) t.append(e);
                    a.replaceWith(t);
                } else a.remove();
            } else {
                if ("title" === a.localName) {
                    let l = Zi("svg:bx-title");
                    l.innerHTML = a.innerHTML;
                    for (let { name: e, value: t } of a.attributes) l.setAttribute(e, t);
                    a.replaceWith(l);
                    continue;
                }
                if ("switch" === a.localName) {
                    let e = ":scope > *:not([systemLanguage]):not([requiredExtensions])";
                    let t = a.querySelector(e) || a.firstElementChild;
                    t && a.replaceWith(t);
                    continue;
                }
                if (a !== i) {
                    if (!1 === (N[a.parentNode.localName] || []).includes(a.localName)) {
                        a.remove();
                        continue;
                    }
                }
                for (let { name: e, value: t } of [...a.attributes]) {
                    if (e.includes(":")) {
                        a.removeAttribute(e);
                        if (e.startsWith("bx:")) {
                            e = "data-bx-" + e["split"](":")[1];
                            a.setAttribute(e, t);
                        } else {
                            if ("xlink:href" === e && !1 === a.hasAttribute("href")) {
                                e = "href";
                                a.setAttribute(e, t);
                            } else {
                                if ("xlink:title" === e && !1 === a.hasAttribute("title")) {
                                    e = "title";
                                    a.setAttribute(e, t);
                                } else {
                                    if ("xml:lang" !== e) continue;
                                    e = "lang";
                                    a.setAttribute(e, t);
                                }
                            }
                        }
                    }
                    if (e.startsWith("data-")) {
                        "data-fx-shape" === e && !1 === io(a) && a.removeAttribute(e);
                        "data-fx-d" === e && !1 === Le(a) && a.removeAttribute(e);
                    } else {
                        if ("href" === e && "a" === a.localName) {
                            a.removeAttribute(e);
                            a.setAttribute("_href", t);
                        }
                    }
                }
            }
        }
    for (let e of i.querySelectorAll("text")) Il(e);
    for (let e of i.querySelectorAll("textPath")) Bl(e);
    for (let e of i.querySelectorAll("linearGradient")) Ul(e);
    for (let e of i.querySelectorAll("radialGradient")) _l(e);
    for (let e of i.querySelectorAll("pattern")) Fl(e);
    for (let e of i.querySelectorAll("marker")) Nl(e);
    for (let e of i.querySelectorAll("symbol")) Gl(e);
    {
        let l = [];
        for (let { name: e, value: t } of [...i.attributes]) {
            i.removeAttribute(e);
            "xmlns" !== e && "xmlns:bx" !== e && l["push"]({ name: e, value: t });
        }
        i.setAttribute("xmlns", u["svg"]);
        i.setAttribute("xmlns:bx", u["bx"]);
        for (let { name: e, value: t } of l) i.setAttribute(e, t);
    }
    {
        let e = i.querySelector(":scope > defs");
        if (!e) {
            e = Zi("svg:defs");
            i.prepend(e);
        }
    }
    Sl(i);
    document.importNode(i, !0);
    return i;
};
const io = (t) => {
    let r = !1;
    if (t.hasAttribute("data-fx-shape")) {
        let n = t.getAttribute("d");
        let e = t
            .getAttribute("data-fx-shape")
            .trim()
            .split(/[\s+,]+/);
        if (e.length >= 3) {
            let l = e[0];
            let a = e.slice(1, e.length - 1);
            let i = e[e.length - 1];
            if (i.includes("@")) {
                let [e, t] = i.split("@");
                t === Pe(n + " / " + l + " " + a.join(" ") + " " + e).toString(32) &&
                    (r = !0);
            }
        }
    }
    return r;
};
const Sd = Zi("svg:marker");
const Md = (e) => (
    e.hasAttribute("refX")
        ? Sd.setAttribute("refX", e.getAttribute("refX"))
        : Sd.removeAttribute("refX"),
    e.hasAttribute("refY")
        ? Sd.setAttribute("refY", e.getAttribute("refY"))
        : Sd.removeAttribute("refY"),
    new DOMPoint(Sd.refX.baseVal.value, Sd.refY.baseVal.value)
);
const On = (l) =>
    new Promise((e) => {
        let t = new Image();
        t["onload"] = () => {
            e({ width: t.naturalWidth, height: t.naturalHeight });
        };
        t.src = l;
    });
const as = (e) => {
    let a = [];
    e = os(e);
    for (let l of e)
        if (l === e[0]) a.push([l]);
        else {
            let t = !1;
            for (let e of a) {
                if (l.parentElement === e[0].parentElement) {
                    e.push(l);
                    t = !0;
                }
            }
            !1 === t && a.push([l]);
        }
    return a;
};
const ds = (e, t) => {
    if (!e.transform || !t.transform) return !1;
    const l = Yi(e);
    const a = Yi(t);
    return xi(l, a);
};
const cs = (n) => {
    let t = [];
    let r = [];
    for (let e of n) {
        let a = [];
        let i = (l) => {
            for (let t of n) {
                let e = !a.includes(t) && !r.includes(t);
                if (t !== l && e && ds(t, l)) {
                    a.push(t);
                    r.push(t);
                    i(t);
                }
            }
        };
        i(e);
        a.length > 0 && t.push(os(a));
    }
    for (let e of n) r.includes(e) || t.push([e]);
    return t;
};
const pd = (r, s, o, u, p) => {
    var f;
    var h;
    var c;
    var m;
    let y = (e) => (Math.abs(e) < 1e-11 ? 0 : e > 0 ? 1 : -1);
    let e = (e, t, l, a, i) => {
        let n = 3 * t - e - 3 * l + a;
        0 === n && (n = 1e-10);
        let r = [3, -1];
        d(r, (3 * e - 6 * t + 3 * l) / n, (-3 * e + 3 * t) / n, (-i + e) / n);
        let s = [];
        for (let e of r) e >= 0 && e <= 1 && s.push(e);
        return s;
    };
    let d = (t, l, e, a) => {
        let i = (Math.pow(l, 2) - 3 * e) / 9;
        let n = (2 * Math.pow(l, 3) - 9 * l * e + 27 * a) / 54;
        if (Math.pow(n, 2) < Math.pow(i, 3)) {
            let e = Math.acos(n / Math.sqrt(Math.pow(i, 3))) / 3;
            t.splice(0, 0, -2 * Math.sqrt(i) * Math.cos(e) - l / 3);
            t.splice(
                1,
                0,
                -2 * Math.sqrt(i) * Math.cos(e + (4 * Math.PI) / 3) - l / 3
            );
            t.splice(
                2,
                0,
                -2 * Math.sqrt(i) * Math.cos(e - (4 * Math.PI) / 3) - l / 3
            );
            return 3;
        }
        let r =
            -y(n) *
            Math.pow(Math.abs(n) + Math.sqrt(Math.pow(n, 2) - Math.pow(i, 3)), 1 / 3);
        let s = 0 === y(r) ? 0 : i / r;
        t.splice(0, 0, r + s - l / 3);
        t.splice(1, 0, -0.5 * (r + s) - l / 3);
        t.splice(2, 0, 0.5 * Math.sqrt(3) * Math.abs(r - s));
        return t[2] + 1 === 1 ? 2 : 1;
    };
    let t = [
        ...e(s["x"], o["x"], u["x"], p["x"], r["x"]),
        ...e(s["y"], o["y"], u["y"], p["y"], r["y"]),
    ];
    if (0 === t.length) return -1;
    {
        let i = -1;
        let n = 3;
        for (let a of t) {
            let e =
                Math.pow(1 - a, 3) * s["x"] +
                3 * Math.pow(1 - a, 2) * a * o["x"] +
                3 * (1 - a) * Math.pow(a, 2) * u["x"] +
                Math.pow(a, 3) * p["x"];
            let t =
                Math.pow(1 - a, 3) * s["y"] +
                3 * Math.pow(1 - a, 2) * a * o["y"] +
                3 * (1 - a) * Math.pow(a, 2) * u["y"] +
                Math.pow(a, 3) * p["y"];
            f = r["x"];
            h = r["y"];
            let l = Math.sqrt(((c = e) - f) * (c - f) + ((m = t) - h) * (m - h));
            if (l < n) {
                i = a;
                n = l;
            }
        }
        return i;
    }
};
const unite = (e, t, l = 3) => booleanOperations(e, t, "unite", l);
const subtract = (e, t, l = 3) => booleanOperations(e, t, "subtract", l);
const intersect = (e, t, l = 3) => booleanOperations(e, t, "intersect", l);
const exclude = (e, t, l = 3) => booleanOperations(e, t, "exclude", l);
const booleanOperations = (path1, path2, type, a) => {

    const newPath1 = convertPaper(Ne(path1), true);
    const newPath2 = convertPaper(Ne(path2), true);
    const mergePath = newPath1[type](newPath2);

    let s = [];
    if (mergePath) {
        const d = mergePath.exportSVG().getAttribute("d");
        s = je(d);
        s = Re(s);
        for (let e of s) e.values = e.values.map((e) => te(e, a));
    }
    return s;

};

const je = (e) => new oe().parse(e);
const convertPaper = (ay, az = false) => {
    let aA;
    paper.setup();
    if ((ay.match(/M/g) || []).length > 1) {
        aA = new paper.CompoundPath(ay);
        if (az)
            for (let aB of aA.children)
                aB.closed || aB.closePath();
    } else {
        aA = new paper.Path(ay);
        az && (aA.closed || aA.closePath());
    }
    return aA;
}

const tn = (e, l, a) => {
    let i,
        n,
        r,
        s = Math.max((e /= 255), (l /= 255), (a /= 255)),
        o = Math.min(e, l, a);
    i = n = r = (s + o) / 2;
    if (s === o) i = n = 0;
    else {
        let t = s - o;
        n = r > 0.5 ? t / (2 - s - o) : t / (s + o);
        if (s === e) {
            let e;
            e = l < a ? 6 : 0;
            i = (l - a) / t + e;
        } else s === l ? (i = (a - e) / t + 2) : s === a && (i = (e - l) / t + 4);
    }
    i = ie((i / 6) * 360, 0, 360, 0);
    n = ie(100 * n, 0, 100, 1);
    r = ie(100 * r, 0, 100, 1);
    return [i, n, r];
};
const sn = (a, i, n) => {
    let r, s, o;
    a /= 360;
    n /= 100;
    if (0 === (i /= 100)) r = s = o = n;
    else {
        let e,
            t,
            l = (e, t, l) => (
                l < 0 && (l += 1),
                l > 1 && (l -= 1),
                l < 1 / 6
                    ? e + 6 * (t - e) * l
                    : l < 0.5
                        ? t
                        : l < 2 / 3
                            ? e + (t - e) * (2 / 3 - l) * 6
                            : e
            );
        e = n < 0.5 ? n * (1 + i) : n + i - n * i;
        t = 2 * n - e;
        r = l(t, e, a + 1 / 3);
        s = l(t, e, a);
        o = l(t, e, a - 1 / 3);
    }
    return (
        (r = ie(255 * r, 0, 255, 0)),
        (s = ie(255 * s, 0, 255, 0)),
        (o = ie(255 * o, 0, 255, 0)),
        [r, s, o]
    );
};
const Hn = (a, t = "fill") => {
    let i = "none";
    if ("inherit" === a.style.getPropertyValue(t)) i = "inherit";
    else {
        let e = getComputedStyle(a).getPropertyValue(t);
        if (cn(e)) i = "solid";
        else {
            let l = An.fromString(e);
            if (l) {
                let e = Ki(a).querySelector(l.value);
                let t = e ? e.localName : null;
                "linearGradient" === t && gn(e)
                    ? (i = "solid")
                    : ("linearGradient" !== t &&
                        "radialGradient" !== t &&
                        "pattern" !== t) ||
                    (i = t);
            }
        }
    }
    return i;
};
const Wn = (t, e = "fill") => {
    let l = null;
    let a = getComputedStyle(t).getPropertyValue(e);
    let i = An.fromString(a);
    if (i) {
        let e = Ki(t).querySelector(i.value);
        e && v.includes(e.localName) && (l = e);
    }
    return l;
};
const Yn = (e, a = "fill") => {
    let i = [];
    let n = [];
    for (let l of e) {
        let e = getComputedStyle(l).getPropertyValue(a);
        let t = Wn(l);
        i.push(e);
        n.push(t);
    }
    if (i.legth <= 1) return !1;
    if (be(i, i[0])) return !1;
    let t = n.filter((e) => e && "linearGradient" === e.localName);
    let l = n.filter((e) => e && "radialGradient" === e.localName);
    let r = n.filter((e) => e && "pattern" === e.localName);
    return (
        (t.length !== e.length || !Dn(t)) &&
        (l.length !== e.length || !Dn(l)) &&
        (r.length !== e.length || !jn(r))
    );
};
const Rn = (t) => {
    let l = null;
    let a = [];
    let i = t;
    for (; i && "" !== i.href.baseVal;) {
        null === l && (l = Ki(t));
        let e = l.querySelector(i.href.baseVal);
        if (!e || "pattern" !== e.localName || e === t || !1 !== a.includes(e))
            break;
        a.push(e);
        i = e;
    }
    return a;
};
const _n = (t) => {
    for (let e of t.children)
        if (
            "title" !== e.localName &&
            "desc" !== e.localName &&
            "metadata" !== e.localName
        )
            return !0;
    return !1;
};
const Fn = (t) => {
    let l = [];
    for (let e of [t, ...Rn(t)])
        if (_n(e)) {
            l = [...e.children];
            break;
        }
    return l;
};
const jn = (t) => {
    if (0 === t.length) return !1;
    if (1 === t.length) return !0;
    let [l, ...a] = t;
    let i = Symbol();
    for (let e of t) e[i] = Fn(e);
    for (let e of a) if (!1 === me(e[i], l[i], !0)) return !1;
    return !0;
};
const Cn = (t) => {
    let l = [];
    for (let e of t.children) "stop" === e.localName && l.push(e);
    return l;
};
export {
    sleep,
    g,
    b,
    kc,
    ja,
    te,
    ie,
    ci,
    pi,
    xi,
    hi,
    di,
    ai,
    ii,
    ni,
    vi,
    Wi,
    Hi,
    Xe,
    Ze,
    We,
    ct,
    St,
    Ct,
    Mt,
    Pt,
    Jt,
    kt,
    coordDistance,
    Kt,
    gt,
    ft,
    wt,
    Qt,
    Et,
    qt,
    bt,
    Xt,
    ut,
    lt,
    pt,
    Yi,
    Qi,
    fi,
    Xi,
    to,
    fo,
    Oo,
    Zi,
    Ig,
    ks,
    Cs,
    fs,
    ns,
    os,
    Ne,
    Ae,
    $e,
    Re,
    Ie,
    me,
    Te,
    Ke,
    ti,
    Ti,
    Ai,
    $i,
    il,
    Ci,
    Bi,
    Gi,
    Ii,
    Ri,
    ji,
    yi,
    Ve,
    He,
    ke,
    qe,
    Je,
    Qe,
    Ot,
    Fi,
    _i,
    Ni,
    Pi,
    Qd,
    Ye,
    Xd,
    Xl,
    gn,
    Pc,
    ql,
    Ol,
    El,
    Tl,
    Al,
    Sl,
    $l,
    Pl,
    Ml,
    Ll,
    Rl,
    Dc,
    dc,
    On,
    Md,
    as,
    cs,
    ds,
    pd,
    unite,
    subtract,
    intersect,
    exclude,
    zl,
    be,
    fe,
    Wn,
    Hn,
    Yn,
    B,
    S,
    G,
    vc,
    As,
    M,
    P,
    m,
    L,
    R,
    w,
    x,
    fc,
};
