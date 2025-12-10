import Btn from "@/components/buttons/Btn";
import CenterContainer from "@/components/containers/CenterContainer";
import { ETypography_FontSize, ETypography_FontType } from "@/components/typography/types";
import Typo from "@/components/typography/Typo";
import { StyleSheet, View } from "react-native";
import LandingSvg from "../assets/svg/landingPage.svg";

export default function Index() {  
  return (
    <View style={styles.container}>
      <LandingSvg style={styles.landingSvg} />

      <CenterContainer alignCenter>
          <Typo fontSize={ETypography_FontSize.Gigantic} fontType={ETypography_FontType.Bold}>Amplitude</Typo>
          <Btn text="Login" icon="login" />
      </CenterContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "static", flex: 1 },
  landingSvg: { position: "absolute", inset: -50 }
})