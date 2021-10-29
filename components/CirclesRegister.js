import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CirclesRegister(props) {
  const circle = ({ text, index, fill }) => {
    return (
      <View
        key={index + "_View"}
        style={[
          { backgroundColor: fill ? "#364057" : "#D5DDDC" },
          styles.circle,
        ]}
      >
        <Text
          key={text + index + "_txt"}
          style={[{ color: fill ? "#D5DDDC" : "#364057" }, styles.text]}
        >
          {text}
        </Text>
      </View>
    );
  };

  return (
    <View key={"_View_1"} style={styles.circlesViewStyle}>
      <View
        style={{
          width: `${props.width}%`,
          borderWidth: 4,
          position: "absolute",
          alignSelf: "center",
          borderRadius: 10,
          borderColor: "#D5DDDC",
        }}
      />
      {[...Array(props.amount)].map((e, index) => {
        return circle({
          text: props.titles[index].word,
          index,
          fill: props.titles[index].fill,
        });
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D5DDDC",
  },
  text: {
    //color: "#92C6BC",
    fontWeight: "bold",
    maxWidth: 50 - 10,
  },
  circlesViewStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
  },
});
