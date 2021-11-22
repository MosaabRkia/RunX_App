import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/AntDesign";
import AppButton from "../components/AppButton";
import { UserData } from "../ContextData/MainContextData";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Food(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

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
          fill={parseInt(user.kCal.done) * (100 / parseInt(user.kCal.goal))}
          tintColor="#FC7203"
          lineCap="round"
          style={{ margin: 25, alignSelf: "center" }}
          backgroundColor="#404E62"
        >
          {() => (
            <Text
              style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
            >
              {parseInt(user.kCal.done)}/{parseInt(user.kCal.goal)} {"\n"}{" "}
              calories
            </Text>
          )}
        </AnimatedCircularProgress>

        <View>
          <Text
            style={{
              fontSize: 60,
              fontWeight: "bold",
              alignSelf: "center",
              color: "#1C2023",
            }}
          >
            FOOD
          </Text>
        </View>

        <View style={{ justifyContent: "space-around", alignSelf: "center" }}>
          <View style={{ margin: 5 }}>
            <AppButton
              onPress={() => {
                props.navigation.navigate("DailyListMenu");
              }}
              text={"Today"}
              color={true}
            />
          </View>

          {/* <View style={{ margin: 5 }}>
            <AppButton
              onPress={() => {
                props.navigation.navigate("Food1");
              }}
              text={"Edit Favor Foods"}
              color={false}
            />
          </View> */}

          <Image
            key={"imgGif"}
            style={styles.photoCss}
            source={{
              uri: "https://c.tenor.com/93WSxm8D44gAAAAi/nkf-nkfmy.gif",
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoCss: {
    alignSelf: "center",
    width: 0.6305 * windowWidth,
    height: 0.305 * windowHeight,
  },
});
