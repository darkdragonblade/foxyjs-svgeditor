export default interface TransformManager {
    canRotate(): boolean;
    rotate(angle?: number): void;
    flipX(): void;
    flipY(): void;
    canFlip(): boolean;
    move(x: number, y: number): void;
    canMove(): boolean;
}