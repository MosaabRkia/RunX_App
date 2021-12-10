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
import { useDispatch, useSelector } from "react-redux";
import { sleepUpdate } from "../redux/UpdateUserData/UpdateUserDataActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Sleep(props) {
  // const [started, setStarted] = useState(false);
  // const [seconds, setSeconds] = useState(0);
  // const [hour, setHour] = useState(0);

  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  const dispatch = useDispatch();
  // const StartTimer = () => func();
  // const StopTimer = () => clearInterval(func);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    if (isActive === true) {
      dispatch(
        sleepUpdate({
          sleepId: user.sleeps.id,
          sleepTime: seconds + minutes * 60 + hours * 60 * 60,
        })
      );
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }

    setIsActive(!isActive);
  };

  const reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    if (seconds == 60) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }

    if (minutes == 60) {
      setHours((hours) => hours + 1);
      setMinutes(0);
    }

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

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
          fill={user.sleeps.done.toFixed(2) * (100 / user.sleeps.goal)}
          tintColor="#FC7203"
          lineCap="round"
          style={{ margin: 25, alignSelf: "center" }}
          backgroundColor="#404E62"
        >
          {() => (
            <Text
              style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
            >
              {user.sleeps.done.toFixed(2)}/{user.sleeps.goal} {"\n"} Hrs
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
            onPress={() => {
              toggle();
            }}
            text={isActive ? "Stop Sleep Timer" : "Start Sleep Timer"}
            color={1}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 50, color: "white", marginTop: 10 }}>
            {hours <= 9 ? "0" + hours : hours}:
            {minutes <= 9 ? "0" + minutes : minutes}:
            {seconds <= 9 ? "0" + seconds : seconds}
          </Text>
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
    width: 0.61 * windowWidth,
    height: 0.315 * windowHeight,
  },
});
