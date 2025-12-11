import { StyleSheet } from "react-native";
import LandingSvg from "../../../assets/svg/landingPage.svg";

const IndexBackground = () => {
    return <LandingSvg style={styles.landingSvg} />
};

const styles = StyleSheet.create({
    landingSvg: { position: "absolute", inset: -50 },
})

export default IndexBackground;