import { Yup_LoginValidationSchema } from "@/api/user/schemas";
import { TUserLoginForm } from "@/api/user/types";
import { UserApi_Edit } from "@/api/user/userApi";
import Btn from "@/components/buttons/Btn";
import { EButtonBorderRadius } from "@/components/buttons/types";
import { AuthUserContext } from "@/components/contexts/AuthProvider";
import WordInput from "@/components/inputs/WordInput";
import { ETypography_FontSize } from "@/components/typography/types";
import Typo from "@/components/typography/Typo";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const EditUserInfo = () => {
    const { user } = useContext(AuthUserContext);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleUserEditSubmit(v: TUserLoginForm) {
        setLoading(true);

        const tok = await SecureStore.getItemAsync("tok");
        UserApi_Edit(v, tok!)
            .then(() => {
                setLoading(false);
                setDisableSaveButton(true);
            })
            .catch(err => {
                setLoading(false);
                setDisableSaveButton(false);
            })
    }

    return(
        <View style={styles.container}>
            <Typo fontSize={ETypography_FontSize.Title} center>My Account</Typo>
            <Formik
                validationSchema={Yup_LoginValidationSchema}
                initialValues={{ username: user!.username, password: "" }}
                onSubmit={handleUserEditSubmit}
            >
                {
                    ({ handleChange, handleBlur, submitForm, resetForm, values, errors }) => (
                        <View style={styles.innerFormContainer}>
                            <WordInput 
                                title="Username"
                                placeholder="Enter username"
                                value={values.username}
                                error={errors.username}

                                onInput={handleChange("username")}
                                onBlur={handleBlur("username")}
                            />
                            <WordInput 
                                title="Password"
                                placeholder="Enter password"
                                value={values.password}
                                error={errors.password}

                                onInput={handleChange("password")}
                                onBlur={handleBlur("password")}
                            />

                            <Btn 
                                onPress={submitForm}
                                text="Save Changes" 
                                icon="update" 
                                borderRadiusMode={EButtonBorderRadius.Cube}
                                disabled={disableSaveButton}
                                loading={loading}
                            />
                        </View>
                    )
                }
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginInline: 32,
        gap: 12
    },
    formContainer: {
        gap: 16
    },
    innerFormContainer: {
        gap: 24
    },
})

export default EditUserInfo;