import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import BarMedicine from "../components/BarMedicine";
import TittleBarAndArrow from "../components/TittleBarAndArrow";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MedicineList(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  /*const data = [
    { name: "acamol", amount: 5, times: ["11:10", "11:02", "11:00", "11:00"] },
    {
      name: "optalgin",
      amount: 5,
      times: ["22:10", "22:02", "22:00", "22:00"],
    },
    {
      name: "yh nothing",
      amount: 5,
      times: ["00:10", "00:02", "00:00", "00:00"],
    },
  ];*/
  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <TittleBarAndArrow
        goBk={() => props.navigation.navigate("DashBoard")}
        iconName="arrow-left"
        iconSize={40}
        text="Your Medics List"
      />
      <ScrollView
        style={{
          alignSelf: "center",
          marginTop: 10,
          // borderRadius: 10,
          // borderWidth: 1,
        }}
      >
        {user.meds.list &&
          user.meds.list.map((e, index) => {
            return <BarMedicine key={index} key={index} item={e} />;
          })}
      </ScrollView>
      {/* <Image
        key={"imgGif"}
        style={styles.photoCss}
        source={{
          uri: "https://c.tenor.com/wjWgNzw3uw0AAAAi/nkf-nkfmy.gif",
        }}
      /> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoCss: {
    alignSelf: "center",
    width: 0.73 * windowWidth,
    height: 0.345 * windowHeight,
    position: "relative",
    bottom: 0,
  },
});
