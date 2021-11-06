import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Dimensions, View } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/FontAwesome5";
import AppButton from "../components/AppButton";
import { UserData } from "../Drawer/Drawer";

export default function Sport(props) {
  const fetchData = useContext(UserData);

  const windowWidth = Dimensions.get("window").width;
  const [walked, setWalked] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setWalked(
      parseInt(
        fetchData.dataFetch[0].dailySteps[
          fetchData.dataFetch[0].dailySteps.length - 1
        ].done
      )
    );
    setTotal(
      parseInt(
        fetchData.dataFetch[0].dailySteps[
          fetchData.dataFetch[0].dailySteps.length - 1
        ].goal
      )
    );
  }, []);
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
          fill={walked * (100 / total)}
          tintColor="#FC7203"
          lineCap="round"
          style={{ margin: 25, alignSelf: "center" }}
          backgroundColor="#404E62"
        >
          {() => (
            <Text
              style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
            >
              {walked}/{total} {"\n"} Steps
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
            Walk
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            margin: 10,
            borderBottomWidth: 1,
            width: 0.8 * windowWidth,
          }}
        >
          <View style={{ marginLeft: `${walked * (100 / total) - 5}%` }}>
            <Text
              style={{ position: "absolute", top: 30, left: -5, width: 100 }}
            >
              {walked}
            </Text>
            <Icon name="walking" color={"black"} size={25} />
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
          <Text>0</Text>
          <Text>{total}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
