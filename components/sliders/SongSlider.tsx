import Slider from "@react-native-community/slider";
import { useContext } from "react";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import { ISongSlider } from "./types";

const SongSlider = (props: ISongSlider) => {
    const { state: { theme } } = useContext(ColorSchemeContext);

    return(
        <Slider
            style={{ flex: 1 }}
            thumbTintColor={theme.primary}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.muted}
            onValueChange={props.onChange}

            value={props.value}
            minimumValue={0} 
            maximumValue={1}
        />
    )
};

export default SongSlider;