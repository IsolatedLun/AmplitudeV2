import { useContext } from "react";
import { Text } from "react-native";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import {
    ETypography_FontSize,
    ETypography_FontType,
    ETypography_Theme,
    ITypography,
    TTypography_FontFamily
} from "./types";

const Typo = (props: ITypography) => {
    const { state: { text, styling } } = useContext(ColorSchemeContext);
    const _fontType: Record<ETypography_FontType, TTypography_FontFamily> = {
        [ETypography_FontType.Regular]: "FontRegular",
        [ETypography_FontType.Bold]: "FontBold"
    };
    const _themes: Record<ETypography_Theme, string> = {
        [ETypography_Theme.Default]: text.default,
        
        [ETypography_Theme.Theme]: text.theme,
        [ETypography_Theme.Muted]: text.muted,
        [ETypography_Theme.Error]: text.error
    };
    const _fontSize: Record<ETypography_FontSize, number> = {
        [ETypography_FontSize.Default]: styling.fontSize.default,

        [ETypography_FontSize.Small]: styling.fontSize.small,
        [ETypography_FontSize.Medium]: styling.fontSize.medium,
        [ETypography_FontSize.Large]: styling.fontSize.large,
        [ETypography_FontSize.Huge]: styling.fontSize.huge,
        [ETypography_FontSize.Gigantic]: styling.fontSize.gigantic,
        
        [ETypography_FontSize.Title]: styling.fontSize.title,
    };

    return(
        <Text 
            { ...props.textProps }
            style={{ 
                fontFamily: _fontType[props.fontType ?? ETypography_FontType.Regular],
                fontSize: _fontSize[props.fontSize ?? ETypography_FontSize.Default],
                color: _themes[props.theme ?? ETypography_Theme.Default],
                textAlign: props.center ? "center" : "auto",
                ...props.style as object,
            }}
        >
            { props.children }
        </Text>
    )
};

export default Typo;