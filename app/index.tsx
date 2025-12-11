import Btn from "@/components/buttons/Btn";
import IndexBackground from "@/components/containers/backgrounds/IndexBackground";
import CenterContainer from "@/components/containers/CenterContainer";
import { ETypography_FontSize, ETypography_FontType } from "@/components/typography/types";
import Typo from "@/components/typography/Typo";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";


export default function Index() {  
  const router = useRouter();

  return (
    <View style={styles.container}>
      <IndexBackground />

      <CenterContainer style={styles.contentContainer}>
          <Typo 
            center
            fontSize={ETypography_FontSize.Gigantic} 
            fontType={ETypography_FontType.Bold}
          >
              Amplitude
          </Typo>
          
          <View style={styles.btnContainer}>
            <Btn 
              text="Sign up" 
              icon="login-variant" 
              iconOrientation="row-reverse"
              onPress={() => router.replace("/auth/signup")} 
            />
            <Btn 
              text="Login" 
              icon="login" 
              iconOrientation="row-reverse" 
              onPress={() => router.replace("/auth/login")}
            />
          </View>
      </CenterContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "static", flex: 1 },
  contentContainer: { gap: 32 },
  btnContainer: { gap: 16 }
})