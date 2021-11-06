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
import { UserData } from "../Drawer/Drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashBoard(props) {
  const fetchData = useContext(UserData);

  useEffect(() => {
    if (
      fetchData.dataFetch[0] === undefined ||
      fetchData.dataFetch[0] === null
    ) {
      AsyncStorage.removeItem("token");
      props.navigation.navigate("loginPage");
    }
  }, []);

  const arr = [
    {
      title: "Drink",
      units: "Cups",
      value: parseInt(
        fetchData.dataFetch[0].dailyWaterCups[
          fetchData.dataFetch[0].dailyWaterCups.length - 1
        ].done
      ),
      description:
        "drinking water is essential for optimal health. Proper hydration prevents constipation, mood swings, kidney stones, and overheating ",
    },
    {
      title: "Food",
      units: "Cal",
      value: parseInt(
        fetchData.dataFetch[0].kCalDaily[
          fetchData.dataFetch[0].kCalDaily.length - 1
        ].done
      ),
      description:
        "A  healthy diet rich in fruits, vegetables, whole grains and low-fat dairy can help to reduce your risk of heart disease by maintaining blood pressure and cholesterol levels",
    },
    {
      title: "Sleep",
      units: "Hrs",
      value: parseInt(
        fetchData.dataFetch[0].sleeps[fetchData.dataFetch[0].sleeps.length - 1]
          .done
      ),
      description:
        "Most adults need 7 or more hours of good-quality sleep on a regular schedule each night. Getting enough sleep isnt only about total hours of sleep.",
    },
    {
      title: "Sport",
      units: "ft",
      value: parseInt(
        fetchData.dataFetch[0].dailySteps[
          fetchData.dataFetch[0].dailySteps.length - 1
        ].done
      ),
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
