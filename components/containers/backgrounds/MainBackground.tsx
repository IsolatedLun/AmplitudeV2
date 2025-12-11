import { ImageBackground, StyleSheet } from "react-native";

const MainBackground = () => {
    return <ImageBackground source={require("../../../assets/images/mainBg.png")} style={styles.mainBg} />
};

const styles = StyleSheet.create({
    mainBg: { position: "absolute", inset: 0 },
})

export default MainBackground;