import { IFrontendUser, RUserLogin_Ok } from "@/api/user/types";
import { UserApi_Verify } from "@/api/user/userApi";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useEffect, useState } from "react";
import { IAuthUserContext } from "./types";

const AuthUserContext = createContext<IAuthUserContext>(null as any);

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<IFrontendUser | null>(null);

    useEffect(() => {        
        const tok = SecureStore.getItem("tok");
        if(tok) {
            UserApi_Verify(tok)
                .then((res) => login({ user: res.data.user, token: tok }))
                .catch(() => SecureStore.deleteItemAsync("tok"));
        }
    }, []);

    async function login(data: RUserLogin_Ok) {
        setUser(data.user);
        await SecureStore.setItemAsync("tok", data.token);
        router.push("/(tabs)/songs");
    }

    async function logout() {
        await SecureStore.deleteItemAsync("tok");
        setUser(null);
        router.replace("/");
    }
    
    return(
        <AuthUserContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthUserContext.Provider>
    )
};

export { AuthProvider, AuthUserContext };

