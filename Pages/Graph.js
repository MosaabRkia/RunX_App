// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState, useEffect } from "react";
// import { ScrollView } from "react-native";
// import { View, Text, Dimensions } from "react-native";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";
// import { useSelector } from "react-redux";
// import BarDashBoard from "../components/BarDashBoard";

// const Graph = (props) => {
//   let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

//   const [data, setData] = useState({
//     weights: {
//       listDates: [],
//       listWeights: [],
//     },
//     drinks: {
//       listDates: [],
//       listCups: [],
//     },
//     steps: {
//       listDates: [],
//       listSteps: [],
//     },
//     sleeps: {
//       listDates: [],
//       listSleeps: [],
//     },
//     kcals: {
//       listDates: [],
//       listKcals: [],
//     },
//   });

//   useEffect(() => {
//     //weights
//     let weights = {
//       listDates: [],
//       listWeights: [],
//     };
//     user.weights.listWeights.forEach((e) => {
//       weights = {
//         listDates: [...weights.listDates, e.date.substring(0, 10)],
//         listWeights: [...weights.listWeights, e.weight],
//       };
//     });

//     //drinks
//     let drinks = {
//       listDates: [],
//       listCups: [],
//     };
//     user.drinks.listDrinks.forEach((e) => {
//       drinks = {
//         listDates: [...drinks.listDates, e.date.substring(0, 10)],
//         listCups: [...drinks.listCups, e.done],
//       };
//     });

//     //steps
//     let steps = {
//       listDates: [],
//       listSteps: [],
//     };
//     user.Steps.listSteps.forEach((e) => {
//       steps = {
//         listDates: [...steps.listDates, e.date.substring(0, 10)],
//         listSteps: [...steps.listSteps, e.done],
//       };
//     });

//     //sleeps
//     let sleeps = {
//       listDates: [],
//       listSleeps: [],
//     };
//     user.sleeps.listSleeps.forEach((e) => {
//       sleeps = {
//         listDates: [...sleeps.listDates, e.date.substring(0, 10)],
//         listSleeps: [...sleeps.listSleeps, e.done],
//       };
//     });

//     //kcal
//     let kcal = {
//       listDates: [],
//       listKcals: [],
//     };
//     user.kCal.listKcals.forEach((e) => {
//       kcal = {
//         listDates: [...kcal.listDates, e.date.substring(0, 10)],
//         listKcals: [...kcal.listKcals, e.done],
//       };
//     });

//     return () =>
//       setData({
//         ...data,
//         weights: weights,
//         drinks: drinks,
//         steps: steps,
//         sleeps: sleeps,
//         kcals: kcal,
//       });
//   }, []);
//   console.log(data);
//   return (
//     <LinearGradient
//       style={{ flex: 1 }}
//       colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
//     >
//       <BarDashBoard
//         funcCall={() => props.navigation.navigate("DashBoard")}
//         icon={"arrow-left"}
//       />

//       <ScrollView style={{ alignSelf: "center" }}>
//         <Text
//           style={{
//             alignSelf: "center",
//             fontSize: 25,
//             color: "black",
//             fontStyle: "italic",
//             fontWeight: "bold",
//           }}
//         >
//           Weight Graph
//         </Text>
//         {/* Weights */}
//         <BarChart
//           data={{
//             labels: data.weights.listDates,
//             datasets: [
//               {
//                 data: data.weights.listWeights,
//               },
//             ],
//           }}
//           width={Dimensions.get("window").width * 0.98} // from react-native
//           height={220}
//           yAxisSuffix=" KG"
//           chartConfig={{
//             backgroundColor: "#e26a00",
//             backgroundGradientFrom: "#92C6BC",
//             backgroundGradientTo: "#101011",
//             decimalPlaces: 2, // optional, defaults to 2dp
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             style: {
//               alignSelf: "center",
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: "5",
//               strokeWidth: "2",
//               stroke: "#B4D1C4",
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//         />
//         {/* water drinks */}
//         <Text
//           style={{
//             alignSelf: "center",
//             fontSize: 25,
//             color: "black",
//             fontStyle: "italic",
//             fontWeight: "bold",
//             marginTop: 10,
//           }}
//         >
//           water drink Graph
//         </Text>
//         <BarChart
//           data={{
//             labels: data.drinks.listDates,
//             datasets: [
//               {
//                 data: data.drinks.listCups,
//               },
//             ],
//           }}
//           width={Dimensions.get("window").width * 0.98} // from react-native
//           height={220}
//           // yAxisLabel="KG"
//           yAxisSuffix=" Cups"
//           yAxisInterval={1} // optional, defaults to 1
//           chartConfig={{
//             backgroundColor: "#e26a00",
//             backgroundGradientFrom: "#92C6BC",
//             backgroundGradientTo: "#101011",
//             decimalPlaces: 0, // optional, defaults to 2dp
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             style: {
//               alignSelf: "center",
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: "5",
//               strokeWidth: "2",
//               stroke: "#B4D1C4",
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//         />
//         <Text
//           style={{
//             alignSelf: "center",
//             fontSize: 25,
//             color: "black",
//             fontStyle: "italic",
//             fontWeight: "bold",
//             marginTop: 10,
//           }}
//         >
//           steps Graph
//         </Text>
//         {/* Steps */}
//         <View>
//           <LineChart
//             data={{
//               labels: data.steps.listDates,
//               datasets: [
//                 {
//                   data: data.steps.listSteps,
//                 },
//               ],
//             }}
//             width={Dimensions.get("window").width * 0.98} // from react-native
//             height={220}
//             yAxisLabel="Step "
//             //yAxisSuffix=" "
//             yAxisInterval={1} // optional, defaults to 1
//             chartConfig={{
//               backgroundColor: "#e26a00",
//               backgroundGradientFrom: "#92C6BC",
//               backgroundGradientTo: "#101011",
//               decimalPlaces: 0, // optional, defaults to 2dp
//               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               style: {
//                 alignSelf: "center",
//                 borderRadius: 16,
//               },
//               propsForDots: {
//                 r: "6",
//                 strokeWidth: "2",
//                 stroke: "#B4D1C4",
//               },
//             }}
//             bezier
//             style={{
//               marginVertical: 8,
//               borderRadius: 16,
//             }}
//           />
//         </View>
//         <Text
//           style={{
//             alignSelf: "center",
//             fontSize: 25,
//             color: "black",
//             fontStyle: "italic",
//             fontWeight: "bold",
//             marginTop: 10,
//           }}
//         >
//           sleep Graph
//         </Text>
//         {/* Sleep */}
//         <BarChart
//           data={{
//             labels: data.sleeps.listDates,
//             datasets: [
//               {
//                 data: data.sleeps.listSleeps,
//               },
//             ],
//           }}
//           width={Dimensions.get("window").width * 0.98} // from react-native
//           height={220}
//           // yAxisLabel="KG"
//           yAxisSuffix=" H"
//           yAxisInterval={1} // optional, defaults to 1
//           chartConfig={{
//             backgroundColor: "#e26a00",
//             backgroundGradientFrom: "#92C6BC",
//             backgroundGradientTo: "#101011",
//             decimalPlaces: 2, // optional, defaults to 2dp
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             style: {
//               alignSelf: "center",
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: "5",
//               strokeWidth: "2",
//               stroke: "#B4D1C4",
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//         />
//         <Text
//           style={{
//             alignSelf: "center",
//             fontSize: 25,
//             color: "black",
//             fontStyle: "italic",
//             fontWeight: "bold",
//             marginTop: 10,
//           }}
//         >
//           calories Graph
//         </Text>
//         {/* Calories */}
//         <LineChart
//           data={{
//             labels: data.kcals.listDates,
//             datasets: [
//               {
//                 data: data.kcals.listKcals,
//               },
//             ],
//           }}
//           width={Dimensions.get("window").width * 0.98} // from react-native
//           height={220}
//           // yAxisLabel="KG"
//           yAxisSuffix=" KC"
//           yAxisInterval={1} // optional, defaults to 1
//           chartConfig={{
//             backgroundColor: "#e26a00",
//             backgroundGradientFrom: "#92C6BC",
//             backgroundGradientTo: "#101011",
//             decimalPlaces: 0, // optional, defaults to 2dp
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             style: {
//               alignSelf: "center",
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: "5",
//               strokeWidth: "2",
//               stroke: "#B4D1C4",
//             },
//           }}
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//         />
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// export default Graph;
