import { TThemeSpec } from "@/utils/types";
import { useContext } from "react";
import { View } from "react-native";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import { ECardBorderRadiusMode, ECardBorderThicknessMode, ECardPaddingMode, ECardTheme, ICard } from "./types";

const Card = (props: ICard) => {
    const { state: { card } } = useContext(ColorSchemeContext);
    const borderThicknessMode: Record<ECardBorderThicknessMode, number> = {
        [ECardBorderThicknessMode.Default]: 2,
        [ECardBorderThicknessMode.Thin]: 1,
        [ECardBorderThicknessMode.None]: 0,
    };
    const paddingMode: Record<ECardPaddingMode, number> = {
        [ECardPaddingMode.Default]: 12,
        [ECardPaddingMode.Medium]: 24,
        [ECardPaddingMode.Large]: 32
    }
    const borderRadiusMode: Record<ECardBorderRadiusMode, number> = {
        [ECardBorderRadiusMode.Bevel]: 8
    }
    const theme: Record<ECardTheme, TThemeSpec> = {
        [ECardTheme.Default]: card.primary
    }

    return(
        <View
            style={{
                backgroundColor: theme[props.theme ?? ECardTheme.Default].bgClr,
                borderColor: theme[props.theme ?? ECardTheme.Default].clr,
                borderWidth: borderThicknessMode[props.borderThicknessMode ?? ECardBorderThicknessMode.Default],
                borderRadius: borderRadiusMode[props.borderRadiusMode ?? ECardBorderRadiusMode.Bevel],
                padding: paddingMode[props.paddingMode ?? ECardPaddingMode.Default],

                ...props.style as any
            }}
        >
            { props.children }
        </View>
    )
};

export default Card;