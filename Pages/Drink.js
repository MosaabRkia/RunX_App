import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useContext, useReducer } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import DrawCups from "../components/DrawCups";
import Icon from "react-native-vector-icons/AntDesign";
import { UserData } from "../ContextData/MainContextData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { drinksUpdateUser } from "../redux/User/UserActions";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "plus":
//       fetch(
//         `https://localhost:44324/api/UpdateData/updateCupsWater/${action.type}/${action.id}`
//       )
//         .then((r) => r.text())
//         .then((data) => {
//           console.log(data);
//         });
//       return { ...state, drank: state.drank + 1 };
//       break;

//     case "minus":
//       fetch(
//         `https://localhost:44324/api/updateData/updateCupsWater/${action.type}/${action.id}`
//       )
//         .then((r) => r.text())
//         .then((data) => {
//           console.log(data);
//         });
//       return { ...state, drank: state.drank - 1 };
//       break;
//     default:
//       return state;
//   }
// };

export default function Drink(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  const dispatch = useDispatch();

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
          fill={user.drinks.done * (100 / user.drinks.goal)}
          tintColor="#FC7203"
          lineCap="round"
          style={{ margin: 25, alignSelf: "center" }}
          backgroundColor="#404E62"
        >
          {() => (
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>
              {user.drinks.done}/{user.drinks.goal} {"\n"} Cups
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
            Drink
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
        >
          {[...Array(user.drinks.done)].map((e, index) => (
            <View key={index + "_yes"}>
              <DrawCups done="yes" />
            </View>
          ))}

          {[...Array(user.drinks.goal - user.drinks.done)].map((e, index) => (
            <View key={index + "_no"}>
              <DrawCups done="no" />
            </View>
          ))}
        </View>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              if (user.drinks.goal > user.drinks.done) {
                let data = {
                  type: "plus",
                  id: user.drinks.id,
                };
                dispatch(drinksUpdateUser(data));
              }
            }}
          >
            <Icon name={"pluscircleo"} size={100} color="#FC7203" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              if (0 < user.drinks.done) {
                let data = {
                  type: "minus",
                  id: user.drinks.id,
                };
                dispatch(drinksUpdateUser(data));
              }
            }}
          >
            {/* minuscircleo */}
            <Icon name={"minuscircleo"} size={100} color="#FC7203" />
          </TouchableOpacity>
        </View>
      </View>
      {/*addddddddddddddddddd keyyyyyyys  */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
