import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import { EIcon_Size, EIcon_Theme, IIcon } from "./types";

const Icon = (props: IIcon) => {
    const { state: { theme, styling } } = useContext(ColorSchemeContext);
    const _themes: Record<EIcon_Theme, string> = {
        [EIcon_Theme.Default]: theme.default,
        [EIcon_Theme.Primary]: theme.primary,
        [EIcon_Theme.Muted]: theme.muted
    };
    const _sizes: Record<EIcon_Size, number> = {
        [EIcon_Size.Default]: styling.iconSize.default,
        
        [EIcon_Size.Small]: styling.iconSize.small,
        [EIcon_Size.Medium]: styling.iconSize.medium,
        [EIcon_Size.Large]: styling.iconSize.large,
        [EIcon_Size.Huge]: styling.iconSize.huge,
        [EIcon_Size.Gigantic]: styling.iconSize.gigantic,
        
        [EIcon_Size.Page]: styling.iconSize.page
    };

    return(
        <MaterialCommunityIcons 
            style={{ ...props.style as any }}
            name={props.name}
            color={_themes[props.theme ?? EIcon_Theme.Default]}
            size={_sizes[props.size ?? EIcon_Size.Default]}
        />
    )
};

export default Icon;