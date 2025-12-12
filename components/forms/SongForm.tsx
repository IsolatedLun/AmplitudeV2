import { useRouter } from "expo-router"
import { Formik } from "formik"
import { ScrollView, StyleSheet, View } from "react-native"
import * as Yup from "yup"
import Btn from "../buttons/Btn"
import AudioInput from "../inputs/AudioInput"
import ImageInput from "../inputs/ImageInput"
import WordInput from "../inputs/WordInput"
import { ETypography_FontSize } from "../typography/types"
import Typo from "../typography/Typo"
import { ESongFormikMode, ISongFormik } from "./types"

const SongForm = (props: ISongFormik) => {
    const router = useRouter();
    const songValidationSchema = Yup.object().shape({
        title: Yup.string().required(),
        author: Yup.string().required(),
        image: Yup.mixed().required(),
        audio: Yup.object().required(),
    });

    const songEditValidationSchema = Yup.object().shape({
        title: Yup.string().required(),
        author: Yup.string().required(),
        image: Yup.mixed(),
        audio: Yup.object(),
    });

    function cancelEdit() {
        router.replace("/(tabs)/songs");
    }

    return (
        <ScrollView>
            <Formik
                validationSchema={props.mode === ESongFormikMode.Upload ? songValidationSchema : songEditValidationSchema}
                initialValues={{ ...props.initialValues }}
                onSubmit={(v, formik) => props.onSubmit(v, formik.resetForm)}
            >
                {
                    ({ handleChange, handleBlur, setFieldValue, setValues, submitForm, resetForm, values,  errors }) => {
                        return (
                            <View style={styles.formContainer}>
                                <View style={styles.titleContainer}>
                                    <Typo fontSize={ETypography_FontSize.Title}>
                                        { props.mode === ESongFormikMode.Upload ? "Upload" : "Edit" } Music
                                    </Typo>
                                </View>

                                <View style={styles.formInputContainer}>
                                    <WordInput
                                        title="Title"
                                        placeholder="Enter song title"
                                        value={values.title}
                                        error={errors.title as any}

                                        onInput={handleChange("title")}
                                        onBlur={handleBlur("title")}
                                    />

                                    <WordInput
                                        title="Author"
                                        placeholder="Enter author's name"
                                        value={values.author}
                                        error={errors.author as any}

                                        onInput={handleChange("author")}
                                        onBlur={handleBlur("author")}
                                    />

                                    <ImageInput
                                        value={values.image}
                                        error={errors.image as any}
                                        onInput={v => setFieldValue("image", v)} 
                                    />

                                    <AudioInput
                                        value={values.audio}
                                        error={errors.audio as any}
                                        onInput={v => setFieldValue("audio", v)} 
                                    />
                                </View>

                                <View style={styles.formButtonContainer}>
                                    {
                                        props.mode === ESongFormikMode.Upload
                                        ? (
                                            <>
                                                <Btn 
                                                    text="Upload"
                                                    icon="upload"
                                                    onPress={submitForm}
                                                    loading={props.isSubmitting}
                                                />
                                                <Btn 
                                                    text="Reset" 
                                                    icon="restore" 
                                                    onPress={resetForm}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Btn 
                                                    text="Save changes"
                                                    icon="update"
                                                    onPress={submitForm}
                                                    loading={props.isSubmitting}
                                                />
                                                <Btn 
                                                    text="Cancel" 
                                                    icon="cancel"
                                                    onPress={cancelEdit}
                                                />
                                            </>
                                        )
                                    }
                                </View>
                            </View>
                        )
                    }
                }
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        gap: 24
    },
    formInputContainer: {
        gap: 22
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12
    },
    formButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    }
});

export default SongForm;