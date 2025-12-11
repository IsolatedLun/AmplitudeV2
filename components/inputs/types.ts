import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { FileInfo } from "expo-file-system"
import { ComponentProps } from "react"

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

export interface IFileInfoCard {
    fileInfo: FileInfo | null,
    title: string,
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"],
}

type IFileData = { uri: string, name: string, type: string }
export interface IImageInput {
    value: string,
    
    onInput: (f: IFileData) => void,
    onBlur?: (e: any) => void,
    error?: string
}

export interface IAudioInput {
    value: string,
    
    onInput: (f: IFileData) => void,
    onBlur?: (e: any) => void,
    error?: string
}

export interface ISongSlider {
    value: number,
    onChange: (v: number) => void,
}