import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { changeMealStatus } from "../redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function BarDailyList(props) {
  //   const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(user.meals[props.title.toLowerCase()]);
  });
  return (
    <View style={styles.text}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 20,
          fontWeight: "bold",
          width: 100,
        }}
      >
        {props.title}
      </Text>
      {loading ? (
        <Image
          source={{
            uri: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
          }}
          style={{ width: 35, height: 35, alignSelf: "center" }}
        />
      ) : (
        <Icon
          style={[
            styles.icon,
            {
              backgroundColor: user.meals[props.title.toLowerCase()].eaten
                ? "green"
                : "red",
            },
          ]}
          onPress={() => {
            setLoading(true);
            dispatch(
              changeMealStatus({
                mealName: props.title.toLowerCase(),
                TOF: !user.meals[props.title.toLowerCase()].eaten,
                mealId: user.meals[props.title.toLowerCase()].id,
                kCalId: user.kCal.id,
              })
            );
            setTimeout(() => {
              setLoading(false);
            }, 3 * 1000);
          }}
          name={
            user.meals[props.title.toLowerCase()].eaten
              ? "checkcircle"
              : "minuscircle"
          }
          color={"white"}
          size={35}
        />
      )}
      {/* fix onpress send data and go to page */}
      <Icon
        onPress={() => props.navTo()}
        style={[styles.icon, { backgroundColor: "black" }]}
        name={"exclamationcircle"}
        color={"white"}
        size={35}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    borderBottomWidth: 1,
    height: 0.1 * windowHeight,
    width: 0.8 * windowWidth,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  icon: {
    alignSelf: "center",
    borderRadius: 20,
  },
});
