export default interface AlignManager {
    canAlign(): boolean;
    align(type?: string, target?: HTMLElement): void;
}