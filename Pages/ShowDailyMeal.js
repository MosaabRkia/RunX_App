import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import FoodBar from "../components/FoodBar";
import TittleBarAndArrow from "../components/TittleBarAndArrow";

export default function ShowDailyMeal(props) {
  const { title, arrayItems } = props.route.params;

  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  const [data, setData] = useState();
  useEffect(() => {
    let arr = [];
    arrayItems.map((e) => {
      axios
        .get("http://proj17.ruppin-tech.co.il/api/items/" + e.foodId)
        .then((res) => {
          arr = [...arr, res.data];
        })
        .then(() => {
          setData(arr);
        });
    });
    return () => null;
  }, [props.route.params]);
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <TittleBarAndArrow
        goBk={() => {
          props.navigation.navigate("Food");
        }}
        iconName="arrow-left"
        iconSize={40}
        text={`DailyList Of ${title}`}
      />
      <ScrollView>
        {!!data &&
          data.map((e, index) => {
            return <FoodBar index={index} key={index} item={e} />;
          })}
      </ScrollView>
    </LinearGradient>
  );
}
