export default interface UndoManager {
    undo(): void;
    canUndo(): boolean;
    redo(): void;
    canRedo(): boolean;
    clear(): void;
    checkpoint(type: string): void;
}