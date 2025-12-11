import * as yup from "yup";
import { IResponse_Err, IResponse_Ok } from "../types";
import { Yup_LoginValidationSchema, Yup_SignupValidationSchema } from "./schemas";

export interface IFrontendUser {
    _id: string,
    username: string,
    profile: string,
    favorites: string[]
}

export type TUserSignupForm = yup.InferType<typeof Yup_SignupValidationSchema>;
export type TUserLoginForm = yup.InferType<typeof Yup_LoginValidationSchema>;

export type RUserSignup_Ok = IResponse_Ok;
export type RUserSignup_Err = IResponse_Err;

export type RUserLogin_Ok = { token: string, user: IFrontendUser };
export type RUserLogin_Err = IResponse_Err;

export type RUserVerify_Ok = { user: IFrontendUser };
export type RUserVerify_Err = IResponse_Err;