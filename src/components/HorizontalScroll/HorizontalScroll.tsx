import React from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Colors } from "../../utils";
import { Fonts } from "../../assets";

interface HorizontalScrollProps {
  handleItemPress: (item: string) => void;
  selectedItem: string;
  items: string[];
}

const HorizontalScroll = ({
  handleItemPress,
  selectedItem,
  items,
}: HorizontalScrollProps) => {
  return (
    <View style={{marginBottom:10}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {items.map((item: string, index: React.Key | null | undefined) => (
          <TouchableOpacity
            key={index}
            style={[
              {
                width: 100,
                height: 35,
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              },
              selectedItem === item && [
                { borderBottomColor: Colors.secondary, borderBottomWidth: 2 },
              ],
            ]}
            onPress={() => handleItemPress(item)}
          >
            <Text
              style={{
                fontSize: 17,
                textAlignVertical: "top",
                height: 35,
                fontFamily: Fonts.Alatsi,
                color: selectedItem === item ? Colors.secondary : Colors.black,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalScroll;
