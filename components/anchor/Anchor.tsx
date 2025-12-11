import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import Typo from "../typography/Typo";
import { ETypography_Theme } from "../typography/types";
import { IAnchor } from "./types";

const Anchor = (props: IAnchor) => {
    const router = useRouter();
    const { state: { theme } } = useContext(ColorSchemeContext);

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.replace(props.href)}>
                <View style={styles.innerContainer}>
                    <Typo theme={ETypography_Theme.Theme}>{ props.text }</Typo>
                    <View style={{ ...styles.underline, backgroundColor: theme.primary }} />
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start"
    },
    innerContainer: {
        gap: 1
    },
    underline: {
        width: "auto",
        height: 2,
        borderRadius: 16,
    }
})

export default Anchor;