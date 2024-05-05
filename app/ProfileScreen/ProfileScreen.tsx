import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NavigationBar } from "../../src/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, width } from "../../src/utils";
import { Fonts, Images } from "../../src/assets";
import { router } from "expo-router";

const ProfileScreen = () => {
  const [colorHeart, setColorHeart] = useState<boolean>(false);
  const navigation = () => router.back();


  return (
    <>
      <TouchableOpacity style={{ padding: 10 }} onPress={navigation}>
        <Ionicons name="arrow-back-outline" size={25} color={Colors.primary} />
      </TouchableOpacity>

      {/* perfil de usuario */}
      <View
        style={{
          width: "100%",
          height: "25%",
          // backgroundColor: "red",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Image
          resizeMode="cover"
          source={Images.userProfile}
          style={{ width: "45%", height: "80%", borderRadius: 50 }}
        />

        <View
          style={{
            width: "45%",
            height: "80%",
            // backgroundColor: "green",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text>@uusario</Text>
          <Text>correo</Text>
          <Ionicons name="pencil-outline" size={25} color={Colors.primary} />
        </View>
      </View>

      {/* titulo*/}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>Ultimas 10 Reproducciones</Text>

        <TouchableOpacity>
          <Ionicons name="chevron-down" size={15} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* canciones*/}

      <View
        style={{
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
        }}
      >
        <TouchableOpacity style={{ width: "15%" }}>
          <Ionicons
            name="play"
            size={35}
            color={Colors.secondary}
            style={{ width: "100%" }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 55,
            height: 55,
            backgroundColor: "red",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.secondary,
          }}
        ></View>

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
            Titulo cancion
          </Text>
          <Text
            style={{
              color: Colors.subtitle,
              fontFamily: Fonts.ABeeZeeRegular,
              fontSize: 11,
            }}
          >
            Nombre del artista
          </Text>
        </View>

        <TouchableOpacity style={{ width: "15%" }} onPress={()=>setColorHeart(!colorHeart)}>
          <Ionicons
            name="heart"
            size={35}
            color={colorHeart ? 'red' : Colors.white}
            style={{ width: "100%" }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileScreen;
