import { createContext , useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
export type ThemeContextType = {
    theme: Theme;
    toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider : React.FC<{ children: React.ReactNode }>= ({ children }) => {
    const [theme,  setTheme] = useState<Theme>("light");
    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        if(theme === "dark"){
            document.documentElement.dataset.theme = "dark";
        }else{
            document.documentElement.dataset.theme = "light";
        }
        setTheme(theme as Theme);
    },[]);

    const toggle = useCallback(() => {
        if(theme === "dark"){
            document.documentElement.dataset.theme = "light";
            setTheme("light");
            localStorage.setItem("theme", "light");
        }else{
            document.documentElement.dataset.theme = "dark";
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        }
    },[theme])
    return (
        <ThemeContext.Provider value={{ theme , toggle }}>
            {children}
        </ThemeContext.Provider>
    )
};


export const  useTheme = () => {
    const context = useContext(ThemeContext);

    if(!context){
        return null
    }
    return context;
};

