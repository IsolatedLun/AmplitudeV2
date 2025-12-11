import { IResponse_Err } from "@/api/types";
import { Yup_LoginValidationSchema } from "@/api/user/schemas";
import { TUserLoginForm } from "@/api/user/types";
import { UserApi_Login } from "@/api/user/userApi";
import Btn from "@/components/buttons/Btn";
import IndexBackground from "@/components/containers/backgrounds/IndexBackground";
import CenterContainer from "@/components/containers/CenterContainer";
import { AuthUserContext } from "@/components/contexts/AuthProvider";
import WordInput from "@/components/inputs/WordInput";
import Icon from "@/components/typography/Icon";
import { EIcon_Size, EIcon_Theme, ETypography_FontSize, ETypography_Theme } from "@/components/typography/types";
import Typo from "@/components/typography/Typo";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const LoginPage = () => {
    const router = useRouter();
    const { login } = useContext(AuthUserContext);
    const [loginError, setLoginError] = useState<string | null>(null);

    function handleSubmit(v: TUserLoginForm) {
        UserApi_Login(v)
            .then(res => login(res.data))
            .catch((err: IResponse_Err) => setLoginError(err.response.data.error));
    }
    
    return(
        <>
            <IndexBackground />
            <Formik
                validationSchema={Yup_LoginValidationSchema}
                initialValues={{ username: "", password: "" }}
                onSubmit={handleSubmit}
            >
                {
                    ({ handleChange, handleBlur, submitForm, values, errors }) => (
                        <CenterContainer style={styles.formContainer}>
                            <View style={styles.titleContainer}>
                                <Icon name="login" theme={EIcon_Theme.Primary} size={EIcon_Size.Huge} />
                                <Typo fontSize={ETypography_FontSize.Title}>
                                    Login
                                </Typo>
                            </View>
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

                            </View>

                            <View style={styles.loginSubmitContainer}>
                                <Btn text="Login" icon="login" onPress={submitForm} />
                                {
                                    loginError 
                                    ? (
                                        <Typo 
                                            style={{ textAlign: "center" }}
                                            theme={ETypography_Theme.Error}
                                        >
                                            { loginError }
                                        </Typo>
                                    )
                                    : null
                                }
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

export default LoginPage;