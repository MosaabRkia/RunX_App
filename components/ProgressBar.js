import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function ProgressBar(props) {
    console.log('joined')
  return (
props.index % 2 == 0 ?
    <View>
        {/**first */}
      <TouchableOpacity style={styles.container}>
        <View style={styles.circleProgress}>
          <AnimatedCircularProgress
            size={115}
            width={15}
            fill={props.item.value}
            tintColor="#323B53"
            lineCap="round"
            style={{ margin: 10 }}
            childrenContainerStyle={{}}
            backgroundColor="#8BA197"
          >
            {(fill) => (
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {fill} {props.item.units}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>

        <View style={styles.containerParagraph}>
          <View>
            <Text style={styles.title}>{props.item.title}</Text>
          </View>
          <View>
            <Text style={styles.text}>
             {props.item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      </View>
        :
        <View>
       {/**second */}
      <TouchableOpacity
        style={[styles.container, { backgroundColor: "#2D3643" }]}
      >
        <View style={[styles.containerParagraph]}>
          <View>
            <Text style={[styles.title, { color: "#B4D1C4" }]}>{props.item.title}</Text>
          </View>
          <View>
            <Text style={[styles.text, { color: "#B4D1C4" }]}>
            {props.item.description}
            </Text>
          </View>
        </View>
        <View style={styles.circleProgress}>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={props.item.value}
            tintColor="#B1C7BD"
            lineCap="round"
            style={{ margin: 10 }}
            childrenContainerStyle={{ }}
            backgroundColor="#393C43"
          >
            {(fill) => (
                
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "#B4D1C4" }}
              >
                 {fill} {props.item.units }
                

                
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </TouchableOpacity>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#B1C7BD",
  },
  circleProgress: {},
  containerParagraph: { maxWidth: "65%", margin: 5 },
  title: { fontWeight: "bold", fontSize: 20, marginBottom: 5 },
  text: { fontSize: 15 },
});
