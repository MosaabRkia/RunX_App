import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import ProgressBar from "../components/ProgressBar";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { updateDrinkData } from "../redux/UpdateUserData/UpdateUserDataActions";
import BackGroundFetch24 from "./BackGroundFetch24";
import BackGroundTask from "./BackGroundTask";

export default function DashBoard(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  useEffect(() => {
    // console.log(user);
    return () => null;
  }, []);
  const arr = [
    {
      title: "Drink",
      units: "Cups",
      value: user.drinks.done,
      data: user.drinks,
      description:
        "drinking water is essential for optimal health. Proper hydration prevents constipation, mood swings, kidney stones, and overheating ",
    },
    {
      title: "Food",
      units: "Cal",
      data: user.kCal,
      value: user.kCal.done,

      description:
        "A  healthy diet rich in fruits, vegetables, whole grains and low-fat dairy can help to reduce your risk of heart disease by maintaining blood pressure and cholesterol levels",
    },
    {
      title: "Sleep",
      units: "Hrs",
      data: user.sleeps,
      value: user.sleeps.done,
      description:
        "Most adults need 7 or more hours of good-quality sleep on a regular schedule each night. Getting enough sleep isnt only about total hours of sleep.",
    },
    {
      title: "Sport",
      units: "ft",
      value: user.Steps.done,
      data: user.Steps,
      description:
        "Keeping active through physical activity and sport has many benefits for the body. Some of these benefits include increased cardiovascular fitness, bone health, decreased risk of obesity...",
    },
  ];
  // we need to get from user the values and total of all each one

  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      {/* <BackGroundTask /> */}
      <BackGroundFetch24 />
      <BarDashBoard
        icon={"text"}
        funcCall={() => {
          props.navigation.openDrawer();
        }}
      />

      <ScrollView>
        {arr.map((item, index) => {
          return (
            <ProgressBar
              key={index}
              data={item.data}
              link={() => {
                props.navigation.navigate(item.title);
              }}
              item={item}
              index={index}
            />
          );
        })}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("MedicineList")}
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: arr % 2 == 0 ? "#2D3643" : "#B4D1C4",
          }}
        >
          <Text
            style={{
              color: arr % 2 == 0 ? "#B4D1C4" : "#2D3643",
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 10,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Medicine
          </Text>
          <TouchableOpacity
            style={{ marginTop: 10, marginRight: 10 }}
            onPress={() => {
              props.navigation.navigate("AddMedicine", {
                mode: "view",
                item: null,
              });
            }}
          >
            <Icon
              name={"pluscircleo"}
              size={65}
              color={arr % 2 == 0 ? "#B4D1C4" : "#2D3643"}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
