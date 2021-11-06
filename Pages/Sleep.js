import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/AntDesign";
import AppButton from "../components/AppButton";
import { UserData } from "../Drawer/Drawer";

export default function Sleep(props) {
  const [slept, setSleep] = useState(0);
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const fetchData = useContext(UserData);
  useEffect(() => {
    setSleep(
      parseInt(
        fetchData.dataFetch[0].sleeps[fetchData.dataFetch[0].sleeps.length - 1]
          .done
      )
    );
    setTotal(
      parseInt(
        fetchData.dataFetch[0].sleeps[fetchData.dataFetch[0].sleeps.length - 1]
          .goal
      )
    );
  }, []);

  const onStart = () =>
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

  useEffect(() => {
    onStart();
  }, []);

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
          fill={slept * (100 / total)}
          tintColor="#FC7203"
          lineCap="round"
          style={{ margin: 25, alignSelf: "center" }}
          backgroundColor="#404E62"
        >
          {() => (
            <Text
              style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
            >
              {slept}/{total} {"\n"} Hrs
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
            Sleep
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            flexWrap: "wrap",
            margin: 10,
            justifyContent: "center",
          }}
        ></View>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <AppButton
            onPress={() => setStarted(!started)}
            text={started ? "Stop Sleep Timer" : "Start Sleep Timer"}
            color={1}
          />
          {/* <Text>{seconds}</Text>            */}
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
