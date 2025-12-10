import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";
import { StyleProp, ViewStyle } from "react-native";

export enum EButtonTheme { Primary, Danger };
export enum EButtonBorderRadius { Cube, Cylidner };
export enum EButtonPaddding { Square, Rectangle };
export enum EButtonPaddingSize { Default };
export interface IButton {
    text: string,

    onPress?: () => void,
    theme?: EButtonTheme,
    style?: StyleProp<ViewStyle>,
    paddingMode?: EButtonPaddding,
    paddingSize?: EButtonPaddingSize,
    borderRadiusMode?: EButtonBorderRadius,
    iconOrientation?: "row" | "row-reverse",
    disabled?: boolean,
    loading?: boolean,
    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"],
}