import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, Dimensions, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import BarDailyList from "../components/BarDailyList";
import BarDashBoard from "../components/BarDashBoard";
import TittleBarAndArrow from "../components/TittleBarAndArrow";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const meals = ["BreakFast", "Brunch", "Lunch", "Dinner"];

export default function DailyListMenu({ navigation }) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <TittleBarAndArrow
        goBk={() => {
          navigation.navigate("Food");
        }}
        iconName="arrow-left"
        iconSize={40}
        text="Daily List"
      />
      <Text style={styles.text}>Click The Circle To Swap Eaten / UnEaten</Text>
      {meals &&
        meals.map((e, index) => {
          return (
            <BarDailyList
              key={index}
              title={e}
              navTo={() =>
                navigation.navigate("ShowDailyMeal", {
                  title: e,
                  arrayItems: user.meals[e.toLowerCase()].itemsList,
                })
              }
            />
          );
        })}
      <Image
        key={"imgGif"}
        style={styles.photoCss}
        source={{
          uri: "https://c.tenor.com/PcHWCPTymUIAAAAi/nkf-nkfmy.gif",
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 60,
    borderBottomWidth: 1,
    width: 0.9 * windowWidth,
    alignSelf: "center",
    color: "white",
    borderColor: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  photoCss: {
    alignSelf: "center",
    width: 0.636 * windowWidth,
    height: 0.33 * windowHeight,
  },
});
