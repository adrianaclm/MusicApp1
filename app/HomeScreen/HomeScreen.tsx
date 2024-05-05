import { View, FlatList, Text } from "react-native";
import {
  HorizontalScroll,
  NavigationBar,
  ScreenContainer,
  Searcher,
  SongBox,
} from "../../src/components";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PlayContext } from "../../src/contexts";
import { PlayProvider } from "../../src/contexts/context";

export interface Root {
  tracks: Tracks;
}

export interface Tracks {
  track: Track[];
  "@attr": Attr2;
}

export interface Track {
  name: string;
  duration: string;
  mbid: string;
  url: string;
  streamable: Streamable;
  artist: Artist;
  image: Image[];
  "@attr": Attr;
}

export interface Streamable {
  "#text": string;
  fulltrack: string;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
}

export interface Image {
  "#text": string;
  size: string;
}

export interface Attr {
  rank: string;
}

export interface Attr2 {
  tag: string;
  page: string;
  perPage: string;
  totalPages: string;
  total: string;
}

export type Root1 = Root2[];

export interface Root2 {
  artist: string;
  image: string;
  key: number;
  name: string;
  url: string;
}

const HomeScreen = () => {
  ScreenOrientation.unlockAsync();
  const { setIsPlaying, isPlaying } = useContext(PlayContext);
  const [orientation, setOrientation] = useState<any>();
  const [isLandscape, setIsLandscape] = useState(false);
  useEffect(() => {
    checkOrientation();
    const subscription: any = ScreenOrientation.addOrientationChangeListener(
      handleOrientationChange
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  });
  const checkOrientation = async () => {
    const orientation: any = await ScreenOrientation.getOrientationAsync();
    setIsLandscape(orientation >= ScreenOrientation.Orientation.LANDSCAPE_LEFT);
  };
  const handleOrientationChange = (o: {
    orientationInfo: { orientation: any };
  }) => {
    setOrientation(o.orientationInfo.orientation);
  };

  const placeholder = "Busca aqui tu cancion favorita";

  const navigation = () => router.navigate("/ProfileScreen/ProfileScreen");
  const navigationArtist = (artist: string) =>
    router.push({
      pathname: "/DetailsArtistScreen/DetailsArtistScreen",
      params: { id: artist },
    });
  const navigationSong = (artist: string, song: string) =>
    router.push({
      pathname: "/DetailsSongScreen/DetailsSongScreen",
      params: { artist: artist, song: song },
    });

  const items: string[] = [
    "Venezuela",
    "Colombia",
    "Peru",
    "Espana",
    "Brazil",
    "Dinamarca",
    "Italia",
    "Argentina",
  ];

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [topDiscoTracks, setTopDiscoTracks] = useState<Root1[]>();

  const handleItemPress = (item: string) => {
    setSelectedItem(item);
  };

  const LASTFM_API_URL = "http://ws.audioscrobbler.com/2.0/?";

  const getTopDiscoTracks = async () => {
    try {
      const apiKey = "ea1d26aaa70940854e8b51b5aff829ea";
      const tag = "disco";
      const format = "json";

      const params = {
        method: "tag.gettoptracks",
        tag,
        api_key: apiKey,
        format,
      };

      const response = await axios.get(LASTFM_API_URL, { params });

      console.log(response)
      if (response.data.tracks && response.data.tracks.track) {
        const tracks: Root1[] = response.data.tracks.track
          .slice(0, 10)
          .map((track: Track, index: any) => {
            return {
              key: index,
              name: track.name,
              artist: track.artist.name,
              image: track.image[3]["#text"],
              url: track.url,
            };
          });
        setTopDiscoTracks(tracks);
        return tracks;
      } else {
        throw new Error("Failed to fetch top disco tracks");
      }
    } catch (error) {
      console.error("Error fetching top disco tracks:", error);
      throw error;
    }
  };

  useEffect(() => {
    getTopDiscoTracks();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const numColumns = isLandscape ? 2 : 1;
  const key = isLandscape ? "two-columns" : "one-column";

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLandscape]);

  return (
    <>
      <NavigationBar navigation={navigation} />
      <Searcher placeholder={placeholder} />
      <HorizontalScroll
        handleItemPress={handleItemPress}
        selectedItem={selectedItem}
        items={items}
      />

      <FlatList
        key={key}
        initialNumToRender={1}
        numColumns={numColumns}
        data={topDiscoTracks}
        renderItem={({ item, index }: any) => (
          <View style={{ flex: 1, paddingRight: 1 }}>
            <SongBox
              key={index}
              navigationArtist={() => navigationArtist(item.artist)}
              track={item}
              selectedItem={() => setIsPlaying(!isPlaying)} //   setIsPlaying={()=>setPlaying(item.url)}
              navigationSong={() => navigationSong(item.artist, item.name)}
            />
          </View>
        )}
        keyExtractor={(item, index) => `item-${index}`}
        ListEmptyComponent={() =>
          isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Loading ...</Text>
            </View>
          ) : null
        }
      />
    </>
  );
};

export default HomeScreen;
