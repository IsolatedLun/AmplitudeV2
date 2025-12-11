import { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import CenterContainer from "./CenterContainer";

const LoadingContainer = () => {
    const { state: { theme } } = useContext(ColorSchemeContext);

    return(
        <CenterContainer>
            <ActivityIndicator size="large" color={theme.primary} />
        </CenterContainer>
    )
};

export default LoadingContainer;