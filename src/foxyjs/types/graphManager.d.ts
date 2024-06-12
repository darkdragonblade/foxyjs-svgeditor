declare class SVGImage {
    constructor(params: {
        x: number;
        y: number;
        width: number;
        height: number;
        href: string;
    });
}

declare class SVGPath {
    constructor(params: {
        d: string;
        fill: string;
        stroke: number;
        strokeWidth: number;
    });
}

declare class SVGForeignObject {
    constructor(params: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
}

declare class SVGText {
    constructor(params: {
        x: number;
        y: number;
        fill: string;
        fontSize: number;
        fontFamily?: string;
        textContent: string;
    });
}

declare class SVGRect {
    constructor(params: {
        x: number;
        y: number;
        width: number;
        height: number;
        rx?: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGCircle {
    constructor(params: {
        cx: number;
        cy: number;
        r: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGEllipse {
    constructor(params: {
        cx: number;
        cy: number;
        rx: number;
        ry: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGRing {
    constructor(params: {
        x: number;
        y: number;
        outerRx: number;
        outerRy: number;
        innerRx: number;
        innerRy: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGPie {
    constructor(params: {
        x: number;
        y: number;
        outerRadius: number;
        innerRadius: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGCrescent {
    constructor(params: {
        x: number;
        y: number;
        r: number;
        arch?: number;
        hollow?: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGTriangle {
    constructor(params: {
        x: number;
        y: number;
        width: number;
        height: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
        shift?: number;
        cornerRadius?: number;
    });
}

declare class SVGNGon {
    constructor(params: {
        x: number;
        y: number;
        rx: number;
        ry: number;
        arms?: number;
        cornerRadius?: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGStar {
    constructor(params: {
        x: number;
        y: number;
        rx: number;
        ry: number;
        arms?: number;
        depth?: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGCog {
    constructor(params: {
        x: number;
        y: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGCross {
    constructor(params: {
        x: number;
        y: number;
        width: number;
        height: number;
        fill: string;
        shift?: number;
        stroke: string;
        strokeWidth: number;
    });
}

declare class SVGSpiral {
    constructor(params: {
        x: number,
        y: number,
        width: number,
        height: number,
        fill: string,
        stroke: string,
        strokeWidth: number,
    });
}

declare class SVGLine {
    constructor(params: {
        x: number,
        y: number,
        width: number,
        height: number,
        fill: string,
        stroke: string,
        strokeWidth: number,
    });
}

declare class SVGPolyline {
    constructor(params: {
        x: number,
        y: number,
        width: number,
        height: number,
        fill: number,
        stroke: number,
        strokeWidth: number,
    });
}

declare class SVGPolygon {
    constructor(params: {
        x: number,
        y: number,
        width: number,
        height: number,
        fill: string,
        stroke: string,
        strokeWidth: number,
    })
}

export {
    SVGImage,
    SVGForeignObject,
    SVGPath,
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
