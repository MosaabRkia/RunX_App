import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const LoadingPageBetween = ({ navigation }) => {
  //useEffect
  useEffect(() => {
    //create load unit load all data
    setTimeout(() => {
      navigation.navigate("DashBoard");
    }, 5000);

    return () => null;
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <View style={{ justifyContent: "center" }}>
        <Animatable.View animation={moveleft} iterationCount={"infinite"}>
          <Image
            source={require("../assets/logoOnlyR.png")}
            style={{ width: 85, height: 85, alignSelf: "center" }}
          />
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

// moves css
const moveleft = {
  0: {
    opacity: 0.3,
    marginRight: 250,
    marginLeft: 0,
  },
  0.2: {
    opacity: 1,
    marginRight: 0,
    marginLeft: 0,
  },
  0.8: {
    opacity: 1,
    marginRight: 0,
    marginLeft: 0,
  },
  1: {
    opacity: 0,
    marginRight: 0,
    marginLeft: 250,
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

export default LoadingPageBetween;
