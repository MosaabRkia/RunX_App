import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export default function ProgressBar() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.circleProgress}>
        
      </View>

      <View style={styles.containerParagraph}>
        <View style={styles.title}>
        <Text>Drink</Text>

        </View>

        <View style={styles.text}>
            <Text> job? The reason Lorem Ipsum is such a mistake, is because you are actively acknowledging that you have no idea what the content for a product is or even what it should be</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  circleProgress: {},
  containerParagraph: {},
  title: {},
  text: {},
});
