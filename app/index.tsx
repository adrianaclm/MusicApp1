import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { ScreenContainer } from "../src/components";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { router } from "expo-router";
import { PlayState } from "../src/contexts";
import AppMultiContext from "../AppMultiContext";

const AppContainer = () => {
  const ContextProviders = [<PlayState />];

  return <AppMultiContext providers={ContextProviders}></AppMultiContext>;
};

const AvoidingView = (props: any) => {
  if (Platform.OS == "ios") {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        {props.children}
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView focusable={false} style={{ flex: 1 }}>
        {props.children}
      </KeyboardAvoidingView>
    );
  }
};
const Page = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      ABeeZeeRegular: require("../src/assets/fonts/ABeeZee-Regular.ttf"),
      ABeeZeeItalic: require("../src/assets/fonts/ABeeZee-Italic.ttf"),
      Acme: require("../src/assets/fonts/Acme-Regular.ttf"),
      Alatsi: require("../src/assets/fonts/Alatsi-Regular.ttf"),
      Baaloo: require("../src/assets/fonts/BalooBhai2-VariableFont_wght.ttf"),
      Chilanka: require("../src/assets/fonts/Chilanka-Regular.ttf"),
    });
  }

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
    fontsLoaded === true && router.navigate("/HomeScreen/HomeScreen");
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ScreenContainer>
        <Text>Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <AvoidingView>
      <AppContainer />
    </AvoidingView>
  );
};

export default Page;
