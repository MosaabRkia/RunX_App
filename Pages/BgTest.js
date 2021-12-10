// import React, { useEffect, useRef, useState } from "react";
// import { StyleSheet, Text, View, Button } from "react-native";
// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
// //drink notification
// const BACKGROUND_FETCH_TASK = "background-fetch";
// let list = {
//   drank: 0,
//   total: 5,
// };
// // 1. Define the task by providing a name and the function that should be executed
// // Note: This needs to be called in the global scope (e.g outside of your React components)
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   if (
//     list.drank < list.total &&
//     user.pushNotification.accepted === true &&
//     user.pushNotification.token !== null
//   ) {
//     console.log("you drank " + list.drank + Date.now().toISOString());
//     sendPushNotification("ExponentPushToken[1OdkzGNz4MLiFGJtEccKuu]");
//     // 4. Send a push notification
//   } else {
//     console.log("all done");
//   }

//   // Be sure to return the successful result type!
//   return "nothing";
// });

// const sendPushNotification = async (expoPushToken) => {
//   const message = {
//     to: "ExponentPushToken[1OdkzGNz4MLiFGJtEccKuu]",
//     sound: "default",
//     title: "RunX",
//     body: "you drank only " + list.drank,
//     data: { someData: null },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// };
// // 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// // Note: This does NOT need to be in the global scope and CAN be used in your React components!
// async function registerBackgroundFetchAsync() {
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//     minimumInterval: 1 * 1, // 15 sec
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   });
// }

// // 3. (Optional) Unregister tasks by specifying the task name
// // This will cancel any future background fetch calls that match the given name
// // Note: This does NOT need to be in the global scope and CAN be used in your React components!
// async function unregisterBackgroundFetchAsync() {
//   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }

// export default function BgTest() {
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [tokenPushNot, setTokenPushNot] = useState(null);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     checkStatusAsync();

//     return () => null;
//   }, []);

//   async function registerForPushNotificationsAsync() {
//     let token;
//     if (Constants.isDevice) {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log(token);
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [10, 180, 200, 150],
//         lightColor: "#FF231F7C",
//       });
//     }

//     return token;
//   }

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => console.log(token));

//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {});

//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   const checkStatusAsync = async () => {
//     const status = await BackgroundFetch.getStatusAsync();
//     const isRegistered = await TaskManager.isTaskRegisteredAsync(
//       BACKGROUND_FETCH_TASK
//     );
//     setStatus(status);
//     setIsRegistered(isRegistered);
//   };

//   const toggleFetchTask = async () => {
//     if (isRegistered) {
//       await unregisterBackgroundFetchAsync();
//     } else {
//       await registerBackgroundFetchAsync();
//     }

//     checkStatusAsync();
//   };

//   return (
//     <View style={styles.screen}>
//       <View style={styles.textContainer}>
//         <Text>
//           Background fetch status: <Text style={styles.boldText}>{status}</Text>
//         </Text>
//         <Text>
//           Background fetch task name:{" "}
//           <Text style={styles.boldText}>
//             {isRegistered ? BACKGROUND_FETCH_TASK : "Not registered yet!"}
//           </Text>
//         </Text>
//       </View>
//       <View style={styles.textContainer}></View>
//       <Button
//         title={
//           isRegistered
//             ? "Unregister BackgroundFetch task"
//             : "Register BackgroundFetch task"
//         }
//         onPress={toggleFetchTask}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   textContainer: {
//     margin: 10,
//   },
//   boldText: {
//     fontWeight: "bold",
//   },
// });
