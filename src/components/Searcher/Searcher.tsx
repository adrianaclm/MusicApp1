import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../utils";

interface SearcherProps {
  placeholder: string;
}

const Searcher = ({ placeholder }: SearcherProps) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} />
      <TouchableOpacity>
        <Ionicons name="search-outline" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default Searcher;
