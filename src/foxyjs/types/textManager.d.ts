interface TextInfomation {
    fontFamily: string,
    disFontFamily: boolean,
    fontSize: number,
    disFontSize: boolean,
    isBold: boolean,
    disBold: boolean,
    isItalic: boolean,
    disItalic: boolean,
    isUnderline: boolean,
    disUnderline: boolean,
    isLineThrough: boolean,
    disLineThrough: boolean,
    isOverline: boolean,
    disOverline: boolean,
    anchor: string,
    disAnchor: boolean,
    letterSpacing: number,
    disLetterSpacing: boolean,
    wordSpacing: number,
    disWordSpacing: boolean,
    lineSpacing: number,
    disLineSpacing: boolean,
}

export default interface TextManager {
    canEdit(): boolean;
    bold(): void;
    isBold(): boolean;
    italic(): void;
    isItalic(): boolean;
    decreaseFontSize(): void;
    increaseFontSize(): void;
    underline(): void;
    isUnderline(): boolean;
    lineThrough(): void;
    isLineThrough(): boolean;
    overline(): void;
    isOverline(): boolean;
    decreaseLetterSpacing(): void;
    increaseLetterSpacing(): void;
    resetLetterSpacing(): void;
    canResetLetterSpacing(): boolean;
    decreaseWordSpacing(): void;
    increaseWordSpacing(): void;
    resetWordSpacing(): void;
    canResetWordSpacing(): boolean;
    decreaseLineSpacing(): void;
    increaseLineSpacing(): void;
    resetLineSpacing(): void;
    canResetLineSpacing(): boolean;
    anchor(value: string): void;
    fontSize(value: number): void;
    letterSpacing(value: number): void;
    wordSpacing(value: number): void;
    lineSpacing(value: number): void;
    get(): TextInfomation;
}