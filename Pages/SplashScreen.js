import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { autoLogin } from "../redux/User/UserActions";
import { useDispatch } from "react-redux";

export default function SplashScreen({ navigation }) {
  //states
  const [smallLogo, setSmallLogo] = useState(true);
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    //create load unit load all data
    // AsyncStorage.removeItem("token");
    AsyncStorage.getItem("token").then((data) => {
      console.log(data);

      setTimeout(
        () => {
          console.log(data);
          if (data !== null) {
            dispatch(autoLogin(data));
            navigation.navigate("HomeDrawer");
          } else {
            navigation.navigate("loginPage");
          }
        },
        data === null ? 3500 : 0
      );
    });
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <View style={{ justifyContent: "center" }}>
        {smallLogo ? (
          <Animatable.View
            animation={moveleft}
            onAnimationEnd={() => setSmallLogo(false)}
          >
            <Image
              source={require("../assets/logoOnlyR.png")}
              style={{ width: 85, height: 85, alignSelf: "center" }}
            />
          </Animatable.View>
        ) : (
          <Animatable.View animation={"bounceInLeft"}>
            <Image
              source={require("../assets/logoNBG.png")}
              style={{ width: 280, height: 150, alignSelf: "center" }}
            />
          </Animatable.View>
        )}
      </View>
    </LinearGradient>
  );
}

// moves css
const moveleft = {
  0: {
    opacity: 1,
    marginRight: 0,
  },
  0.9: {
    opacity: 1,
    marginRight: 0,
  },
  1: {
    opacity: 0,
    marginRight: 250,
  },
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
