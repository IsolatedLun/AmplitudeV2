import { THEME_DARK } from "@/utils/css";
import { IColorSchemeProvider, TAppThemes } from "@/utils/types";
import { createContext, useState } from "react";

const ColorSchemeContext = createContext<IColorSchemeProvider>(null as any);
const ColorSchemeProvider = ({ children } : { children: React.ReactNode }) => {
    const [state, setState] = useState(THEME_DARK);
    function changeColorScheme(v: TAppThemes) {
        setState(() => {
            switch(v) {
                case "dark": return THEME_DARK;
                case "light": return THEME_DARK; // TODO: implement light theme
                default: return THEME_DARK;
            }
        })
    }

    return(
        <ColorSchemeContext.Provider value={{ state, changeColorScheme }}>
            { children }
        </ColorSchemeContext.Provider>
    )
};

export { ColorSchemeContext, ColorSchemeProvider };

