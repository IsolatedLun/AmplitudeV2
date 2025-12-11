export enum EWordInputTheme { Primary };
export enum EWordInputBorderRadius { Cube };
export enum EWordInputBorderThickness { Default, Thin };
export interface IWordInput {
    title: string,
    value: string,
    placeholder: string,

    error?: string,
    theme?: EWordInputTheme,
    borderRadiusMode?: EWordInputBorderRadius,
    borderThicknessMode?: EWordInputBorderThickness,
    onInput?: (v: string) => void,
    onBlur?: (e: any) => void
}