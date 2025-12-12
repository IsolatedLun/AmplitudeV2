import { TSongForm } from "@/api/types";

export enum ESongFormikMode { Upload, Edit };
export interface ISongFormik {
    mode: ESongFormikMode,
    onSubmit: (v: TSongForm, resetFormFunc: () => void) => void,
    initialValues: TSongForm,

    isSubmitting: boolean
}