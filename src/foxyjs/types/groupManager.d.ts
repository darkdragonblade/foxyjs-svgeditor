export default interface GroupManager {
    group(): void;
    canGroup(): boolean;
    unGroup(): void;
    canUnGroup(): boolean;
}