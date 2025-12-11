import { StyleSheet, View } from "react-native";
import Icon from "../typography/Icon";
import { EIcon_Size, EIcon_Theme, ETypography_FontSize } from "../typography/types";
import Typo from "../typography/Typo";

const Navbar = () => {
    return(
        <View style={styles.container}>
            <Icon name="music-circle" size={EIcon_Size.Huge} theme={EIcon_Theme.Primary} />
            <Typo fontSize={ETypography_FontSize.Title}>Ampl</Typo>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBlockEnd: 18,
        gap: 10
    }
});

export default Navbar;