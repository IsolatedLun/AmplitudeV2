import { StyleSheet, View } from "react-native";
import { ICenterContainer } from "./types";

const CenterContainer = (props: ICenterContainer) => {
    return(
        <View style={{ 
            ...styles.container, 
            alignItems: props.alignCenter ? "center" : "stretch", 
            ...props.style as any }}
        >
            { props.children }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
})

export default CenterContainer;