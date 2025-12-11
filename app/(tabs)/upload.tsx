import { Yup_SongValidationSchema } from "@/api/song/schemas";
import { SongApi_UploadSong } from "@/api/song/songApi";
import { RUploadSong_Ok } from "@/api/song/types";
import { TSongForm } from "@/api/types";
import Btn from "@/components/buttons/Btn";
import AudioInput from "@/components/inputs/AudioInput";
import ImageInput from "@/components/inputs/ImageInput";
import WordInput from "@/components/inputs/WordInput";
import Icon from "@/components/typography/Icon";
import { EIcon_Size, EIcon_Theme, ETypography_FontSize } from "@/components/typography/types";
import Typo from "@/components/typography/Typo";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const UploadTab = () => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    async function uploadSong(v: TSongForm, resetFormFunc: any) {
        const data = new FormData();
        data.append("title", v.title);
        data.append("author", v.author);
        data.append("image", v.image);
        data.append("audio", v.audio);

        const tok = await SecureStore.getItemAsync("tok");

        setIsUploading(true);
        await SongApi_UploadSong(data, tok!)
            .then(res => res.json())
            .then((body: RUploadSong_Ok) => router.replace("/player/" + body.insertedId as any))
            .catch(err => console.log(err))
        setIsUploading(false);
    }

    return(
        <ScrollView>
            <Formik
                validationSchema={Yup_SongValidationSchema}
                initialValues={{ title: "", author: "", image: "", audio: "" }}
                onSubmit={(v, formik) => uploadSong(v, formik.resetForm)}
            >
                {
                    ({ handleChange, handleBlur, setFieldValue, submitForm, resetForm, values,  errors }) => {

                        return (
                            <View style={styles.formContainer}>
                                <View style={styles.titleContainer}>
                                    <Icon name="wifi" size={EIcon_Size.Huge} theme={EIcon_Theme.Primary} />
                                    <Typo fontSize={ETypography_FontSize.Title}>
                                        Upload Music
                                    </Typo>
                                </View>

                                <View style={styles.formInputContainer}>
                                    <WordInput
                                        title="Title"
                                        placeholder="Enter song title"
                                        value={values.title}
                                        error={errors.title}

                                        onInput={handleChange("title")}
                                        onBlur={handleBlur("title")}
                                    />

                                    <WordInput 
                                        title="Author"
                                        placeholder="Enter author's name"
                                        value={values.author}
                                        error={errors.author}

                                        onInput={handleChange("author")}
                                        onBlur={handleBlur("author")}
                                    />

                                    <ImageInput 
                                        value={values.image}
                                        error={errors.image}
                                        onInput={v => setFieldValue("image", v)} 
                                    />

                                    <AudioInput 
                                        value={values.audio}
                                        error={errors.audio}
                                        onInput={v => setFieldValue("audio", v)} 
                                    />
                                </View>

                                <View style={styles.formButtonContainer}>
                                    <Btn 
                                        text="Upload"
                                        icon="upload"
                                        onPress={submitForm}
                                        loading={isUploading}
                                    />
                                    <Btn 
                                        text="Reset" 
                                        icon="restore" 
                                        onPress={resetForm}
                                    />
                                </View>
                            </View>
                        )
                    }
                }
            </Formik>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    formContainer: {
        gap: 24
    },
    formInputContainer: {
        gap: 22
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12
    },
    formButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    }
})

export default UploadTab;