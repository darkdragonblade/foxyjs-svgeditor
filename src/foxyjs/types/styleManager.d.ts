export default interface styleManager {
    set(property: string, value: string);
    get(property: string): string;
}