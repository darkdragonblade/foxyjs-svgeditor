interface Geometry {
    x: number,
    y: number,
    width: number,
    height: number,
    rotation: number,
    isSelected: boolean,
}

export default interface ElementsGeometryManager {
    coordsX(value: number, elements?: Array<HTMLElement>): void;
    coordsY(value: number, elements?: Array<HTMLElement>): void;
    width(value: number, elements?: Array<HTMLElement>): void;
    height(value: number, elements?: Array<HTMLElement>): void;
    rotate(deg: number, elements?: Array<HTMLElement>): void;
    get(): Geometry;
}