import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import Btn from "../buttons/Btn";
import { ETypography_FontSize, ETypography_Theme } from "../typography/types";
import Typo from "../typography/Typo";
import CenterContainer from "./CenterContainer";
import { IErrorContainer } from "./types";

const ErrorContainer = (props: IErrorContainer) => {
    const router = useRouter();

    return(
        <CenterContainer style={styles.container}>
            <Typo
                style={{ textAlign: "center" }} 
                fontSize={ETypography_FontSize.Title}
                theme={ETypography_Theme.Error}
            >
                Something went wrong
            </Typo>
            
            <View style={styles.buttonContainer}>
                <Btn text="Go home" icon="home" onPress={() => router.replace("/(tabs)/songs")} />
            </View>
        </CenterContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 24
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 16
    }
})

export default ErrorContainer;