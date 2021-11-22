import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function FoodBar(props) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          key={props.index + "img"}
          style={styles.photoCss}
          source={{
            uri: `http://proj17.ruppin-tech.co.il/images/${props.item.photoId}.jpg`,
          }}
        />
      </View>

      <View style={{ alignSelf: "center", marginRight: 35, width: "70%" }}>
        <Text style={{ fontSize: 20 }}>{props.item.name}</Text>
        <Text style={{ fontSize: 15 }}>
          {props.item.gram} g = {props.item.kCal} KCal - {props.item.fats} Fats
          - {props.item.kind}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  photoCss: {
    borderRadius: 15,
    margin: 15,
    width: 60,
    height: 60,
  },
});
