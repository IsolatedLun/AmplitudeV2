import * as Yup from "yup";

export const Yup_SongValidationSchema = Yup.object<any>().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    image: Yup.mixed().required(),
    audio: Yup.object().required(),
});