export default interface OrderManager {
    raise(): void;
    raiseToFront(): void;
    canRaise(): boolean;
    lower(): void;
    lowerToBack(): void;
    canLower(): boolean;
}