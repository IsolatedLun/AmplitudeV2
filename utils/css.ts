import { IColorScheme, IGlobalStyles } from "./types";

const STYLING_DATA: IGlobalStyles = {
    borderRadius: {
        cubeRadius: 8,
        cylinderRadius: 64
    },

    screen: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingInline: 16
    },

    fontSize: {
        default: 13,
        
        small: 9,
        medium: 16,
        large: 18,
        huge: 22,
        gigantic: 46,

        title: 28,
    },

    iconSize: {
        default: 13,
        
        small: 9,
        medium: 16,
        large: 18,
        huge: 22,
        gigantic: 46,

        page: 54
    },

    iconButtonSize: {
        default: 13,
        
        small: 9,
        medium: 16,
        large: 30,
        huge: 40,
        gigantic: 46,

        page: 54
    }
}

export const THEME_DARK: IColorScheme = {
    deviceTheme: "dark",
    theme: {
        default: "white",
        inverted: "black",

        primary: "hsl(150 70% 50%)",
        muted: "hsl(0 0% 60%)",
        error: "hsl(5 67% 50%)"
    },

    screen: {
        bgClr: "hsl(207 39% 5%)"
    },
    
    button: {
        primary: { bgClr: "white", clr: "black", border: "none" },
        error: { bgClr: "hsl(5 67% 50%)", clr: "white", border: "none" }
    },

    input: {
        primary: { bgClr: "hsl(0 0% 8%)", clr: "hsl(0 0% 40%)", border: "none" }
    },

    styling: STYLING_DATA
}