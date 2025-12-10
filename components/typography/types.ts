import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";
import { StyleProp, TextProps, TextStyle, ViewStyle } from "react-native";

export enum ETypography_Theme { 
    Default, 
    Theme, 
    Error, 
    Muted 
};
export enum ETypography_FontType { 
    Regular, 
    Bold 
};
export enum ETypography_FontSize { 
    Default, 
    
    Small, 
    Medium, 
    Large, 
    Huge,
    Gigantic, 

    Title
};

export type TTypography_FontFamily = "FontRegular" | "FontBold";
export interface ITypography {
    children: React.ReactNode,
    
    fontSize?: ETypography_FontSize,
    fontType?: ETypography_FontType,
    theme?: ETypography_Theme,
    center?: boolean,
    textProps?: TextProps,
    style?: StyleProp<TextStyle>
}

export enum EIcon_Theme { Default, Primary, Muted };
export enum EIcon_Size { 
    Default,
    
    Small,
    Medium,
    Large,
    Huge,
    Gigantic,

    Page
};
export interface IIcon {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"],

    style?: StyleProp<ViewStyle>,
    theme?: EIcon_Theme,
    size?: EIcon_Size
}