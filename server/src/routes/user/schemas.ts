import * as Joi from "joi";

export const loginValidationSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(64)
        .required(),
    password: Joi.string()
        .min(8)
        .max(64)
        .required(),
});

export const signUpValidationSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(64)
        .required(),
    password: Joi.string()
        .min(8)
        .max(64)
        .required(),
    repeatPassword: Joi.valid(Joi.ref("password")).required()
});

export const editUserValidationSchema = loginValidationSchema;