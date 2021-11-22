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

export default function Sleep(props) {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

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
          fill={user.sleeps.done * (100 / user.sleeps.goal)}
          tintColor="#FC7203"
          lineCap="round"
          style={{ margin: 25, alignSelf: "center" }}
          backgroundColor="#404E62"
        >
          {() => (
            <Text
              style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
            >
              {user.sleeps.done}/{user.sleeps.goal} {"\n"} Hrs
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
        </View>
      </View>
      <Image
        key={"imgGif"}
        style={styles.photoCss}
        source={{
          uri: "https://c.tenor.com/ppJgYaFs_ysAAAAi/nkf-nkfmy.gif",
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
