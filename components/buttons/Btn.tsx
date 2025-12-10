import { useContext } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import Icon from "../typography/Icon";
import { EIcon_Size, ETypography_FontSize, ETypography_FontType } from "../typography/types";
import Typo from "../typography/Typo";
import { EButtonBorderRadius, EButtonPaddding, EButtonPaddingSize, EButtonTheme, IButton } from "./types";

const Btn = (props: IButton) => {
    const { state: { text, button, styling } } = useContext(ColorSchemeContext);
    const _themes: Record<EButtonTheme, any> = {
        [EButtonTheme.Primary]: button.primary,
        [EButtonTheme.Danger]: { backgroundColor: text.error, color: null }
    };
    const borderRadius: Record<EButtonBorderRadius, number> = {
        [EButtonBorderRadius.Cube]: styling.borderRadius.cubeRadius,
        [EButtonBorderRadius.Cylidner]: styling.borderRadius.cylinderRadius
    };
    const paddingSize: Record<EButtonPaddingSize, number> = {
        [EButtonPaddingSize.Default]: 8,
    };

    return(
        <TouchableOpacity 
            activeOpacity={props.loading ? 1 : .5} 
            onPress={() => props.onPress && !props.loading ? props.onPress() : null}
        >
            <View style={{ 
                    position: "relative",
                    backgroundColor: _themes[props.theme ?? EButtonTheme.Primary].backgroundColor,
                    paddingBlock: paddingSize[props.paddingSize ?? EButtonPaddingSize.Default] 
                        * (props.paddingMode && props.paddingMode === EButtonPaddding.Rectangle ? 2 : 1),

                    paddingInline: paddingSize[props.paddingSize ?? EButtonPaddingSize.Default] * 2,
                    borderRadius: borderRadius[props.borderRadiusMode ?? EButtonBorderRadius.Cube],

                    flexDirection: props.iconOrientation ?? "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: props.loading ? .33 : null,

                    ...props.style as any,
                }}
            >
                { props.icon ? <Icon name={props.icon} size={EIcon_Size.Medium} /> : null }

                <Typo
                    style={{ 
                        color: _themes[props.theme ?? EButtonTheme.Primary].color ?? text.default,
                    }}
                    fontSize={ETypography_FontSize.Default} 
                    fontType={ETypography_FontType.Bold}
                    center
                >
                    { props.text }
                </Typo>

            </View>
                {
                    props.loading
                    ? <ActivityIndicator 
                            style={{ position: "absolute", inset: 0 }} 
                            color={_themes[props.theme ?? EButtonTheme.Primary].backgroundColor}
                        />
                    : null
                }
        </TouchableOpacity>
    )
};

export default Btn;