import React, { useState, useCallback, useContext } from "react";
import { ScrollView, Platform, RefreshControl, StatusBar } from "react-native";
import { Colors, width } from "../../utils";
import { Props } from "./ScreenContainerInterface";

const wait = () => {
  return new Promise((resolve) => {
    resolve(1);
  });
};

const ScreenContainer = ({
  backgroundColor,
  children,
  onRefresh,
  disabledPaddingTop,
  disabledPaddingBottom,
  disabledStatusBar,
}: Props) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    setRefreshing(true);
    wait().then(() => {
      onRefresh();
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: backgroundColor || Colors.background,
        paddingTop:
          Platform.OS == "ios" && !disabledPaddingTop
            ? 50
            : Platform.OS === "android" && !disabledStatusBar
            ? 10
            : 0,
        paddingBottom:
          Platform.OS == "ios" && !disabledPaddingBottom
            ? 50
            : Platform.OS === "android"
            ? 20
            : 0,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            onRefresh ? onSubmit() : null;
          }}
        />
      }
    >
      {disabledStatusBar ?? (
        <StatusBar barStyle={"dark-content"} backgroundColor={Colors.background} />
      )}
      {children}
    </ScrollView>
  );
};

export default ScreenContainer;
