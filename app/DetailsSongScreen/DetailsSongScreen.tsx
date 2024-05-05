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


export interface Artist {
  album:      Album;
  artist:     ArtistClass;
  duration:   number;
  image:      string;
  listeners:  string;
  mbid:       string;
  name:       string;
  playcount:  string;
  streamable: Streamable;
  url:        string;
  wiki:       Wiki;
}

export interface Album {
  image: string;
  mbid:  string;
  title: string;
  url:   string;
}

export interface ArtistClass {
  mbid: string;
  name: string;
  url:  string;
}

export interface Streamable {
  "#text":   string;
  fulltrack: string;
}

export interface Wiki {
  content:   string;
  published: string;
  summary:   string;
}


const DetailsSongScreen = () => {
  const [artistInfo, setArtistInfo] = useState<formattedArtistInfo>();

  const navigation = () => router.back();

  const [colorHeart, setColorHeart] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);

  const LASTFM_API_URL = "https://ws.audioscrobbler.com/2.0/"; 
  const apiKey = "ea1d26aaa70940854e8b51b5aff829ea"; 

  const [infoTrack, setInfoTrack] = useState<Artist>();

  async function getTrackInfo(artist: string, track: string, apiKey: string) {
    if (!artist || !track || !apiKey) {
      throw new Error("Missing required parameters: artist, track, or apiKey");
    }

    const params = {
      method: "track.getInfo",
      artist,
      track,
      api_key: apiKey,
      format: "json", 
    };

    try {
      const response = await axios.get(LASTFM_API_URL, { params });

      if (response.data.error) {
        console.error("Error fetching track info:", response.data.error);
        throw new Error("Error fetching track info"); 
      } else {
        const trackInfo = response.data.track;

        if (!trackInfo) {
          console.warn("Track not found");
          return null; 
        }

        const {
          name,
          mbid,
          url,
          image = {}, // Handle optional image object
          duration,
          streamable,
          listeners,
          playcount,
          artist: artistInfo,
          album,
          toptags = [],
          wiki = {},
        } = trackInfo;

        const formattedTrackInfo: Artist = {
          name,
          mbid,
          url,
          image: image.size ? image[image.size] : null, 
          duration: duration / 1000, 
          streamable,
          listeners,
          playcount,
          artist: {
            name: artistInfo.name,
            mbid: artistInfo.mbid,
            url: artistInfo.url,
          },
          album: {
            title: album?.title,
            mbid: album?.mbid,
            url: album?.url,
            image: album?.image?.[album?.image.size], 
          },
          wiki: {
            published: wiki.published,
            summary: wiki.summary,
            content: wiki.content,
          },
        };

        // console.log(formattedTrackInfo)
        setInfoTrack(formattedTrackInfo)
        return formattedTrackInfo;
      }
    } catch (error) {
      console.error("Error fetching track info:", error);
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
    getTrackInfo(params.artist, params.song, apiKey);

    // console.log(params)
  }, []);

  return (
    <ScreenContainer>
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
            infoTrack?.image === null
              ? Images.userProfile
              : { uri: artistInfo?.image }
          }
          style={{ width: "100%", height: "55%" }}
          resizeMode="cover"
        />
      {/* detalles de cancion */}
        <Text
          style={{
            fontFamily: Fonts.Chilanka,
            fontSize: 35,
            width: "100%",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {infoTrack?.name}
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
          {infoTrack?.artist.name}
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
          {infoTrack?.wiki.published}
        </Text>

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
                marginTop:5
              }}
            >
              Mas Informacion Del Artista
            </Text>
          </TouchableOpacity>


      {/* opciones dispo */}
      <View
        style={{
          width: "100%",
          height: "6%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={() => setColorHeart(!colorHeart)}>
          <Ionicons
            name="heart"
            size={30}
            color={colorHeart ? Colors.subtitle : "red"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-social" size={30} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* reproductor dispo */}

      <View
        style={{
          width: "90%",
          height: 7,
          backgroundColor: Colors.subtitle,
          borderRadius: 20,
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: Colors.secondary,
            borderRadius: 20,
            top: -5,
            right: -5,
          }}
        />
      </View>
      <Text
        style={{
          width: "85%",
          textAlign: "right",
          fontFamily: Fonts.Acme,
          // backgroundColor: "red",
          alignSelf: "center",
        }}
      >
        9:00s
      </Text>

      <View
        style={{
          width: "100%",
          height: "13%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={30} color={Colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPause(!pause)}>
          <Ionicons
            name={pause ? "pause-circle" : "play-circle"}
            size={70}
            color={Colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="play-skip-forward"
            size={30}
            color={Colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default DetailsSongScreen;
