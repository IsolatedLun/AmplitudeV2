import { IndexApi_ResetApp } from "@/api/index/indexApi";
import Btn from "@/components/buttons/Btn";
import { AuthUserContext } from "@/components/contexts/AuthProvider";
import EditUserInfo from "@/page_components/settings/EditUserInfo";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const SettingsTab = () => {
    const router = useRouter();
    const { user, logout } = useContext(AuthUserContext);
    const [isResetting, setIsResetting] = useState(false);

    function handleLogoutPress() {
        logout();
        router.replace("/");
    }

    async function handleResetAppData() {
        setIsResetting(true);

        const tok = await SecureStore.getItemAsync("tok");
        await IndexApi_ResetApp(tok!)
            .then(() => logout());

        setIsResetting(false);
    }

    return(
        <View style={styles.container}>
            <EditUserInfo />

            <View style={styles.buttonContainer}>
                <Btn text="Log out" icon="logout" onPress={handleLogoutPress} />
                <Btn
                    onPress={handleResetAppData}
                    text="Reset app data" 
                    icon="trash-can"
                    loading={isResetting}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 38
    },
    buttonContainer: {
        gap: 16
    }
})

export default SettingsTab;