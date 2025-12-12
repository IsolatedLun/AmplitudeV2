import * as Yup from "yup";

export const Yup_LoginValidationSchema = Yup.object({
    username: Yup.string().min(2).required(),
    password: Yup.string().min(8).required()
});

export const Yup_SignupValidationSchema = Yup.object({
    username: Yup.string().min(2).required(),
    password: Yup.string().min(8).required(),
    repeatPassword: Yup.string().oneOf([Yup.ref("password"), "Passwords must match"], "Passwords must match").required("Repeat password is a required field")
})