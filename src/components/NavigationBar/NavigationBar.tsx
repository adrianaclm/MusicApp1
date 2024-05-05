import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../utils";
import { Fonts } from "../../assets";

interface NavigationBarProps {
  navigation: () => void;
}

const NavigationBar = ({ navigation }: NavigationBarProps) => {
  const title = "Top 10";

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginTop:15
      }}
    >
      <TouchableOpacity>
        <Ionicons name="arrow-back-outline" size={25} color={Colors.primary} />
      </TouchableOpacity>
      <Text style={{fontFamily: Fonts.Acme, fontSize:25}}>{title}</Text>
      <TouchableOpacity onPress={navigation}>
        <Ionicons name="person" size={25} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;
