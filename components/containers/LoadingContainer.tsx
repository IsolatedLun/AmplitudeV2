import { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { ColorSchemeContext } from "../scheme/ColorSchemeProvider";
import CenterContainer from "./CenterContainer";

const LoadingContainer = () => {
    const { state: { colors } } = useContext(ColorSchemeContext)!;

    return(
        <CenterContainer>
            <ActivityIndicator size="large" color={colors.textTheme} />
        </CenterContainer>
    )
};

export default LoadingContainer;