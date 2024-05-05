import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { ScreenContainer } from "../../src/components";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../src/utils";
import { Fonts, Images } from "../../src/assets";
import axios from "axios";

export interface formattedArtistInfo {
  biography: string;
  image: string | null;
  listeners: string;
  mbid: string;
  name: string;
  plays: string;
  streamable: string;
  url: string;
}
const DetailsArtistScreen = () => {
  const [artistInfo, setArtistInfo] = useState<formattedArtistInfo>();

  const navigation = () => router.back();

  const LASTFM_API_URL = "https://ws.audioscrobbler.com/2.0/"; // Base URL for Last.fm API
  const API_KEY = "ea1d26aaa70940854e8b51b5aff829ea"; // Replace with your actual Last.fm API key

  async function getArtistInfo(artistName: string) {
    const params = {
      method: "artist.getinfo",
      artist: artistName,
      api_key: API_KEY,
      format: "json",
    };

    try {
      const response = await axios.get(LASTFM_API_URL, { params });

      if (response.data.error) {
        console.error("Error fetching artist info:", response.data.error);
        throw new Error("Error fetching artist info");
      } else {
        const artist = response.data.artist;

        const {
          name,
          mbid,
          url,
          image = {}, // Handle optional image object
          streamable,
          stats: { listeners, plays },
          similar = [], // Handle optional similar artists array
          tags = [], // Handle optional tags array
          bio: { content }, // Extract bio content
        } = artist;

        const formattedArtistInfo: formattedArtistInfo = {
          name,
          mbid,
          url,
          image: image.size ? image[image.size] : null, // Extract image URL based on size
          streamable,
          listeners,
          plays,
          // similarArtists: similar.map((similarArtist: { name: any; }) => similarArtist.name),
          // tags: tags.map((tag: { name: any; }) => tag.name),
          biography: content,
        };
        setArtistInfo(formattedArtistInfo);
        console.log(formattedArtistInfo);
        return formattedArtistInfo;
      }
    } catch (error) {
      console.error("Error fetching artist info:", error);
      throw error; // Re-throw for proper error handling
    }
  }

  const MAX_LINES_TO_SHOW = 15;

  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };
  const params: any = useLocalSearchParams();

  useEffect(() => {
    getArtistInfo(params.id);
  }, []);

  return (
    <ScreenContainer>
      {/* imagen*/}
      <View style={{ height: "35%", width: "100%" }}>
        <TouchableOpacity
          style={{ padding: 10, position: "absolute", zIndex: 1, top: 10 }}
          onPress={navigation}
        >
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <Image
          source={
            artistInfo?.image === null
              ? Images.userProfile
              : { uri: artistInfo?.image }
          }
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      {/* detalles de cancion */}
      <View style={{ height: "65%" }}>
        <Text
          style={{
            fontFamily: Fonts.Chilanka,
            fontSize: 40,
            width: "100%",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          {artistInfo?.name}
        </Text>

        <Text
          numberOfLines={showFullText ? 0 : MAX_LINES_TO_SHOW}
          ellipsizeMode="tail"
          style={{
            fontFamily: Fonts.Alatsi,
            fontSize: 20,
            width: "100%",
            textAlign: "justify",
            paddingHorizontal: 15,
          }}
        >
          {artistInfo?.biography}
        </Text>
        {showFullText ? null : (
          <TouchableOpacity>
            <Text
              style={{
                height: 50,
                fontFamily: Fonts.Alatsi,
                fontSize: 20,
                width: "100%",
                textDecorationStyle: "dotted",
                textDecorationColor: Colors.black,
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              Leer Mas ...
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
};
export default DetailsArtistScreen;
