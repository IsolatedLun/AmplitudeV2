import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorSchemeContext } from './contexts/ColorSchemeContext';

SplashScreen.preventAutoHideAsync();
const RootWrapper = () => {
    const [loaded] = useFonts({
        "FontRegular": require("../assets/fonts/QuicksandMedium.ttf"),
        "FontBold": require("../assets/fonts/QuicksandBold.ttf"),
        ...MaterialCommunityIcons.font
    });

    const { state: { screen, styling } } = useContext(ColorSchemeContext);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, [loaded])

    return !loaded ? null : (
        <Stack 
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    position: "relative",
                    backgroundColor: screen.bg,
                    paddingBlockStart: insets.top + styling.screen.paddingTop,
                    paddingBlockEnd: insets.bottom + styling.screen.paddingBottom,
                    paddingInline: (insets.left + insets.right) + styling.screen.paddingInline
                }
            }}
            initialRouteName='index'
        />
    )
};

export default RootWrapper;