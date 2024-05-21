interface Geometry {
    x: number,
    y: number,
    width: number,
    height: number,
    rotation: number,
    isSelected: boolean,
}

export default interface ElementsGeometryManager {
    coordsX(value: number): void;
    coordsY(value: number): void;
    width(value: number): void;
    height(value: number): void;
    rotate(deg: number): void;
    get(): Geometry;
}