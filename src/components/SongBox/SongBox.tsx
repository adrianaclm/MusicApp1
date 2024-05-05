import React, { useContext, useState } from "react";
import { Colors, width } from "../../utils";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { Fonts, Images } from "../../assets";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Root2 } from "../../../app/HomeScreen/HomeScreen";
import { PlayContext, PlayProvider } from "../../../src/contexts/context";

interface SongBoxProps {
  navigationArtist: (artist: string) => void;
  navigationSong: (song: string) => void;

  track: Root2;
  // setIsPlaying: (i:any) => void;
  selectedItem: () => void;

  // isPlaying: boolean;
}

const SongBox = ({
  navigationArtist,
  navigationSong,
  track,
  selectedItem,
}: // isPlaying,
SongBoxProps) => {
  const [pause, setPause] = useState<boolean>(false);
  const { setIsPlaying, isPlaying } = useContext(PlayContext);
  // const startMusic = () => {
  //   setIsPlaying(!isPlaying);
  // };

  return (
    <PlayProvider>
      <View style={styles.container}>
        <Text style={styles.text}>#{track.key + 1}</Text>
        <TouchableOpacity onPress={() => navigationSong(track.artist)}>
          <Image
            source={{ uri: track.image } || Images.userProfile}
            style={{
              width: 55,
              height: 55,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.secondary,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: "50%",
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.Chilanka,
              fontSize: 17,
            }}
          >
            {track.name}
          </Text>
          <TouchableOpacity onPress={() => navigationArtist(track.artist)}>
            <Text
              style={{
                color: Colors.subtitle,
                fontFamily: Fonts.ABeeZeeRegular,
                fontSize: 11,
              }}
            >
              {track.artist}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          // onPress={() => selectedItem === track.url && setIsPlaying(!isPlaying)}
          onPress={() => selectedItem}
        >
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={35}
            color={Colors.secondary}
            style={{ width: "100%" }}
          />
        </TouchableOpacity>
      </View>
    </PlayProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: 80,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  text: {
    color: Colors.white,
    width: "12%",
    fontFamily: Fonts.Acme,
    fontSize: 25,
    fontWeight: "500",
  },
});

export default SongBox;
