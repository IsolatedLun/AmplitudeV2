import { StyleProp, ViewStyle } from "react-native";

export enum ECardBorderRadiusMode { Bevel };
export enum ECardBorderThicknessMode { None, Default, Thin };
export enum ECardPaddingMode { Default, Medium, Large };
export enum ECardTheme { Default };
export interface ICard {
    children: React.ReactNode,

    theme?: ECardTheme,
    paddingMode?: ECardPaddingMode,
    borderThicknessMode?: ECardBorderThicknessMode,
    borderRadiusMode?: ECardBorderRadiusMode,
    style?: StyleProp<ViewStyle>
}