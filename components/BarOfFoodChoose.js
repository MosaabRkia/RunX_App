import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, CheckBox } from "react-native";
import { vw, vh /*, vmin, vmax */ } from "react-native-expo-viewport-units";

export default function BarOfFoodChoose(props) {
  const [isSelected, setSelection] = useState(false);

  //useEffect
  useEffect(() => {
    setSelection(false);
  }, [props.kindPlace]);

  const addToList = async () => {
    setSelection(!isSelected);
    props.addList(props.fullFruitObj.id, isSelected);
  };

  return (
    <View style={styles.container} key={props.index}>
      <View
        key={(props.index, 1)}
        style={{
          width: "25%",
          alignSelf: "flex-start",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          key={props.index + "img"}
          style={styles.photoCss}
          source={{
            uri: `http://proj17.ruppin-tech.co.il/images/${props.fullFruitObj.photoId}.jpg`,
          }}
        />
      </View>
      <View
        key={(props.index, 2)}
        style={{
          width: "60%",
          marginLeft: 10,
          padding: 10,
          alignSelf: "flex-end",
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            right: 25,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {props.fullFruitObj.name}
        </Text>
        <Text style={{ alignSelf: "flex-start", right: 25, fontSize: 15 }}>
          {props.fullFruitObj.description}
        </Text>
        <Text style={{ alignSelf: "flex-end", right: 25 }}>
          {props.fullFruitObj.gram}g = {props.fullFruitObj.kcal} calories
        </Text>
      </View>
      <View
        key={(props.index, 3)}
        style={{ width: "15%", justifyContent: "center", alignItems: "center" }}
      >
        <CheckBox
          key={(props.index, 4)}
          value={isSelected}
          onValueChange={addToList}
          style={{ alignSelf: "center" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D5DDDC",
    margin: 15,
    borderRadius: 15,
    flexDirection: "row",
  },
  photoCss: {
    borderRadius: 15,
    margin: 15,
    width: 60,
    height: 60,
  },
});
