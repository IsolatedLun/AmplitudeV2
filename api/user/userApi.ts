import { SERVER_URL } from "@/globals";
import { createAuthHeader } from "@/utils/funcs";
import axios from "axios";
import { RToggleFavoriteSong_Ok, RUserLogin_Ok, RUserSignup_Ok, RUserVerify_Ok, TUserLoginForm, TUserSignupForm } from "./types";

const UserApiInstance = axios.create({
    baseURL: SERVER_URL + "/users"
});

export const UserApi_Signup = (data: TUserSignupForm) => UserApiInstance.post<RUserSignup_Ok>("/signup", data);
export const UserApi_Login = (data: TUserLoginForm) => UserApiInstance.post<RUserLogin_Ok>("/login", data);
export const UserApi_Edit = (data: TUserLoginForm, tok: string) => UserApiInstance.put<RUserLogin_Ok>("/edit", data, { headers: createAuthHeader(tok) });
export const UserApi_Verify = (tok: string) => UserApiInstance.post<RUserVerify_Ok>("/verify", {}, { headers: createAuthHeader(tok) });

export const UserApi_ToggleFavorite = (id: string, tok: string) => UserApiInstance.post<RToggleFavoriteSong_Ok>(
    `/toggle-favorite/${id}`, 
    {},
    { headers: createAuthHeader(tok) }
);