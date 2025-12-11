import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

export enum EIconButton_BorderRadiusMode { Bevel, Round };
export enum EIconButton_PaddingMode { Default };
export enum EIconButton_Theme { Default, Transparent };
export enum EIconButton_Size {
    Default,

    Small,
    Medium,
    Large,
    Huge,
    Gigantic
};

export interface IIconButton {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"],
    onPress: () => void,

    borderRadiusMode?: EIconButton_BorderRadiusMode,
    paddingMode?: EIconButton_PaddingMode,
    theme?: EIconButton_Theme,
    size?: EIconButton_Size
}