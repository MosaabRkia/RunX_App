import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import DrawCups from "../components/DrawCups";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { drinksUpdateUser } from "../redux/User/UserActions";
import AwesomeAlert from "react-native-awesome-alerts";
import * as Animatable from "react-native-animatable";

export default function Drink(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  const dispatch = useDispatch();

  //useState
  const [loading, setLoading] = useState();

  //alert
  const [alert, setAlert] = useState({
    text: "",
    show: false,
  });

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
          {user.drinks.done === user.drinks.goal ? (
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              You Have Reached Your Goal!
            </Text>
          ) : (
            <></>
          )}
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
        {loading ? (
          //loading
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: "center" }}
          >
            <Image
              source={require("../assets/logoOnlyR.png")}
              style={{ width: 85, height: 85, alignSelf: "center" }}
            />
          </Animatable.View>
        ) : (
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={async () => {
                if (user.drinks.goal > user.drinks.done) {
                  let data = {
                    type: "plus",
                    id: user.drinks.id,
                  };
                  setLoading(true);
                  await dispatch(drinksUpdateUser(data));
                  setTimeout(() => {
                    setLoading(false);
                    setAlert({
                      show: true,
                      text: "Added a Cup",
                    });
                  }, 2 * 1000);
                } else {
                  setAlert({
                    show: true,
                    text: "You Reached Your Goal Already!",
                  });
                }
              }}
            >
              <Icon name={"pluscircleo"} size={100} color="#FC7203" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={async () => {
                if (0 < user.drinks.done) {
                  let data = {
                    type: "minus",
                    id: user.drinks.id,
                  };
                  setLoading(true);
                  await dispatch(drinksUpdateUser(data));
                  setTimeout(() => {
                    setLoading(false);
                    setAlert({
                      show: true,
                      text: "Removed a Cup",
                    });
                  }, 2 * 1000);
                } else {
                  setAlert({
                    show: true,
                    text: "Nothing To Remove!",
                  });
                }
              }}
            >
              {/* minuscircleo */}
              <Icon name={"minuscircleo"} size={100} color="#FC7203" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        showCancelButton={false}
        title="Drink Form"
        titleStyle={{ fontWeight: "bold" }}
        message={alert.text}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmButtonColor="#364057"
        onConfirmPressed={() => {
          setAlert({ ...alert, show: false });
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
