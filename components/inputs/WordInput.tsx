import { capitalizeSentence } from "@/utils/funcs";
import { TThemeSpec } from "@/utils/types";
import { useContext, useEffect, useState } from "react";
import { Platform, TextInput, View } from "react-native";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import { ETypography_FontSize, ETypography_Theme } from "../typography/types";
import Typo from "../typography/Typo";
import { EWordInputBorderRadius, EWordInputBorderThickness, EWordInputTheme, IWordInput } from "./types";

const WordInput = (props: IWordInput) => {
    const { state: { theme, input, styling } } = useContext(ColorSchemeContext)!;
    const [isFocused, setIsFocused] = useState(false);
    const [themeState, setThemeState] = useState(theme.primary);
    
    const _themes: Record<EWordInputTheme, TThemeSpec> = {
        [EWordInputTheme.Primary]: input.primary
    }
    const _borderRadius: Record<EWordInputBorderRadius, number> = {
        [EWordInputBorderRadius.Cube]: styling.borderRadius.cubeRadius,
    }
    const _borderThickness: Record<EWordInputBorderThickness, number> = {
        [EWordInputBorderThickness.Default]: 2,
        [EWordInputBorderThickness.Thin]: 1
    }

    useEffect(() => {
        setThemeState(() => {
            if(props.error)
                return theme.error;
            return isFocused ? theme.primary : _themes[props.theme ?? EWordInputTheme.Primary].clr!
        })
    }, [isFocused, props.error])

    return(
        <View style={styles.container}>
            { 
            props.title ? 
                <Typo 
                    theme={
                        props.error 
                        ? ETypography_Theme.Error 
                        : isFocused 
                            ? ETypography_Theme.Theme 
                            : ETypography_Theme.Muted
                    }
                >
                    { props.title }
                </Typo> 
                : null
            }
            <TextInput
                style={{
                    color: theme.default,
                    backgroundColor: _themes[props.theme ?? EWordInputTheme.Primary].bgClr,
                    borderColor: themeState,
                    paddingBlock: Platform.OS === "web" ? 12 : 0,
                    paddingInlineStart: 16,
                    borderRadius: _borderRadius[props.borderRadiusMode ?? EWordInputBorderRadius.Cube],
                    borderWidth: _borderThickness[props.borderThicknessMode ?? EWordInputBorderThickness.Default]
                }}

                value={props.value}
                placeholder={props.placeholder}
                placeholderTextColor={themeState}
                onChangeText={(v) => props.onInput ? props.onInput(v) : null}

                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    props.onBlur ? props.onBlur(e) : null;
                    setIsFocused(false);
                }}
            />
            { 
            props.error ? 
                <Typo 
                    theme={ETypography_Theme.Error} 
                    fontSize={ETypography_FontSize.Small}
                    style={{ marginInlineStart: 8 }}>
                        { capitalizeSentence(props.error) }
                </Typo> 
                : null 
            }
        </View>
    )
};

const styles = {
    container: {
        gap: 8
    }
}

export default WordInput;