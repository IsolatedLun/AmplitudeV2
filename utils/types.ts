export interface ISizeOptions {
    default: number,
    small: number,
    medium: number,
    large: number,
    huge: number,
    gigantic: number,
}

export interface IGlobalStyles {    
    borderRadius: {
        cubeRadius: number,
        cylinderRadius: number,
    },

    screen: {
        paddingTop: number,
        paddingBottom: number,
        paddingInline: number
    },

    fontSize: {
        title: number
    } & ISizeOptions,

    iconSize: {
        page: number
    } & ISizeOptions
}

export type TAppThemes = "light" | "dark";
export interface IColorScheme {
    deviceTheme: TAppThemes,
    text: {
        default: string,
        inverted: string,
        theme: string,
        muted: string,
        error: string
    },

    screen: {
        bg: string
    },

    button: {
        primary: { bgColor: string, clr: string, border: string | null }
    },

    styling: IGlobalStyles
}


export interface IColorSchemeProvider {
    state: IColorScheme,
    changeColorScheme: (deviceTheme: TAppThemes) => void
}