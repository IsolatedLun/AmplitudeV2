import { IResponse_Err } from "@/api/types";
import { Yup_SignupValidationSchema } from "@/api/user/schemas";
import { TUserSignupForm } from "@/api/user/types";
import { UserApi_Signup } from "@/api/user/userApi";
import Anchor from "@/components/anchor/Anchor";
import Btn from "@/components/buttons/Btn";
import IndexBackground from "@/components/containers/backgrounds/IndexBackground";
import CenterContainer from "@/components/containers/CenterContainer";
import WordInput from "@/components/inputs/WordInput";
import Icon from "@/components/typography/Icon";
import { EIcon_Size, EIcon_Theme, ETypography_FontSize, ETypography_Theme } from "@/components/typography/types";
import Typo from "@/components/typography/Typo";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const SignupPage = () => {
    const router = useRouter();
    const [signupError, setSignupError] = useState<string | null>(null);

    function handleSubmit(v: TUserSignupForm) {
        UserApi_Signup(v)
            .then(res => router.replace("/auth/login"))
            .catch((err: IResponse_Err) => setSignupError(err.response.data.error));
    }
    
    return(
        <>
            <IndexBackground />
            <Formik
                validationSchema={Yup_SignupValidationSchema}
                initialValues={{ username: "", password: "", repeatPassword: "" }}
                onSubmit={handleSubmit}
            >
                {
                    ({ handleChange, handleBlur, submitForm, values, errors }) => (
                        <CenterContainer style={styles.formContainer}>
                            <View style={styles.titleContainer}>
                                <Icon name="login-variant" theme={EIcon_Theme.Primary} size={EIcon_Size.Huge} />
                                <Typo fontSize={ETypography_FontSize.Title}>
                                    Sign up
                                </Typo>
                            </View>

                            {
                                signupError 
                                ? (
                                    <Typo 
                                        style={{ textAlign: "center" }}
                                        theme={ETypography_Theme.Error}
                                    >
                                        { signupError }
                                    </Typo>
                                )
                                : null
                            }

                            <View style={styles.formContainer}>
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

                                <WordInput
                                    title="Repeat Password"
                                    placeholder="Enter above password"
                                    value={values.repeatPassword}
                                    error={errors.repeatPassword}
                                    onInput={handleChange("repeatPassword")}
                                    onBlur={handleBlur("repeatPassword")}
                                />

                            </View>

                            <View style={styles.loginSubmitContainer}>
                                <Btn text="Sign up" icon="login-variant" onPress={submitForm} />
                                <Anchor text="Already have an account?" href="./login" />
                            </View>
                        </CenterContainer>
                    )
                }
            </Formik>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 48
    },
    loginSubmitContainer: {
        gap: 16
    },
    formContainer: {
        gap: 32
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12
    }
})

export default SignupPage;