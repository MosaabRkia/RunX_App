import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Dimensions, View, Image } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/FontAwesome5";
import AppButton from "../components/AppButton";
import { UserData } from "../ContextData/MainContextData";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Sport(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  // 1 km = 3280.84 ft
  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <BarDashBoard
        funcCall={() => props.navigation.navigate("DashBoard")}
        icon={"arrow-left"}
      />

      <View style={styles.container}>
        <AnimatedCircularProgress
          size={250}
          width={25}
          fill={user.Steps.done * (100 / user.Steps.goal)}
          tintColor="#FC7203"
          lineCap="round"
          style={{ margin: 25, alignSelf: "center" }}
          backgroundColor="#404E62"
        >
          {() => (
            <Text
              style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
            >
              {user.Steps.done}/{user.Steps.goal} {"\n"} Steps
            </Text>
          )}
        </AnimatedCircularProgress>
        <View>
          <Text
            style={{
              fontSize: 60,
              fontWeight: "bold",
              alignSelf: "center",
              color: "white", //#1C2023
            }}
          >
            Walk Steps
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            margin: 10,
            borderBottomWidth: 1,
            width: 0.8 * windowWidth,
            borderBottomColor: "#FC7203",
          }}
        >
          <View
            style={{
              marginLeft: `${user.Steps.done * (100 / user.Steps.goal) - 5}%`,
            }}
          >
            <Text
              style={{
                position: "absolute",
                top: 30,
                left: 5,
                width: 100,
                color: "white",
              }}
            >
              {user.Steps.done}
            </Text>
            <Icon name="walking" color={"white"} size={25} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 0.8 * windowWidth,
            alignSelf: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#FC7203" }}>0</Text>
          <Text style={{ color: "#FC7203" }}>{user.Steps.goal}</Text>
        </View>
      </View>
      <Image
        key={"imgGif"}
        style={styles.photoCss}
        source={{
          uri: "https://c.tenor.com/xyjrFBYQyjcAAAAi/nkf-nkfmy.gif",
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoCss: {
    alignSelf: "center",
    width: 0.61 * windowWidth,
    height: 0.315 * windowHeight,
  },
});
