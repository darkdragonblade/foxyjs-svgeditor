export default interface ClipboardManager {
    cut(): void;
    canCut(): boolean;
    copy(): void;
    canCopy(): boolean;
    paste(): void;
}