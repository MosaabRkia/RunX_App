import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CirclesRegister from "../components/CirclesRegister";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AwesomeAlert from "react-native-awesome-alerts";

//notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RegisterForm({ navigation }) {
  //notifications
  const [accepted, setAccepted] = useState(false);
  const [notificationAlert, setNotificationAlert] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    setNotificationAlert(true);
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: "../assets/notification-sound.wav",
  //     title: "RunX",
  //     body: "Test Notification",
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
  // }
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [10, 180, 200, 150],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  //useEffect
  useEffect(() => {
    deleteData();
  }, []);

  //goBack const
  const goBk = () => navigation.goBack();

  // functions

  // restore data
  const deleteData = async () => {
    (await AsyncStorage.getItem("registerData")) !== null &&
      AsyncStorage.removeItem("registerData");
  };

  const OnSelectSaveData = async (selectedGoal) => {
    try {
      // await AsyncStorage.setItem('registerData', JSON.stringify({
      //     plan: selectedGoal
      // })).then(async () => {
      //     //go to next page
      //     const data = await AsyncStorage.getItem('registerData')
      //     console.log(data)

      navigation.navigate("register2", {
        Goal: selectedGoal,
        PushNotifications: {
          Token: expoPushToken === undefined ? null : expoPushToken,
          Accepted: accepted,
        },
      });
      // })
    } catch (e) {
      console.log("Error in line 29 => ", e);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <Image
        source={require("../assets/logoNBG.png")}
        style={{
          width: 280,
          height: 150,
          alignSelf: "center",
          position: "absolute",
          top: 60,
        }}
      />

      <Animatable.View style={styles.viewShow} animation={"fadeInUp"}>
        <TittleBarAndArrow
          goBk={goBk}
          iconName="arrow-left"
          iconSize={40}
          text="Your Plan"
        />
        <Text
          style={{
            color: "#CCCCCC",
            fontSize: 25,
            marginBottom: 15,
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          what's your goal?
        </Text>
        <KeyboardAwareScrollView>
          <CirclesRegister
            width={20}
            amount={4}
            titles={[
              { word: "Goal", fill: true },
              { word: "Info", fill: false },
              { word: "Bmi", fill: false },
              { word: "Food", fill: false },
            ]}
          />

          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={() => {
              //   setSelectedGoal('lose')
              OnSelectSaveData("lose");
            }}
          >
            <Text style={{ color: "#364057", fontSize: 20, marginBottom: 7 }}>
              Lose Weight
            </Text>
            <Text
              style={{ color: "#364057", fontSize: 13, textAlign: "center" }}
            >
              it does not matter how slowly you go as long as you do not stop
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={() => {
              // setSelectedGoal('healthy')
              OnSelectSaveData("healthy");
            }}
          >
            <Text style={{ color: "#364057", fontSize: 20, marginBottom: 7 }}>
              Healthy Weight
            </Text>
            <Text
              style={{ color: "#364057", fontSize: 13, textAlign: "center" }}
            >
              a healthy outside starts from inside
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={() => {
              //setSelectedGoal('Gain')
              OnSelectSaveData("Gain");
            }}
          >
            <Text style={{ color: "#364057", fontSize: 20, marginBottom: 7 }}>
              Gain Weight
            </Text>
            <Text
              style={{ color: "#364057", fontSize: 13, textAlign: "center" }}
            >
              A little Progress each day adds up to big results
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Animatable.View>
      <AwesomeAlert
        show={notificationAlert}
        showProgress={false}
        showCancelButton={true}
        title="Notification Access"
        titleStyle={{ fontWeight: "bold" }}
        message={
          "Hello Dear, this app using notification to be more helpful by notification reminders for you . \n Do You Agree To Push You A Notifications ?"
        }
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmButtonColor="#364057"
        cancelButtonColor={"red"}
        confirmText={"I Agree"}
        cancelText={"I Don't Agree"}
        onCancelPressed={() => setNotificationAlert(false)}
        onConfirmPressed={() => {
          setAccepted(true);
          setNotificationAlert(false);
        }}
      />
    </LinearGradient>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    width: "80%",
    height: 55,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "#D5DDDC",
    alignSelf: "center",
    borderRadius: 15,
    textAlign: "center",
    borderColor: "#364057",
    borderWidth: 1,
  },
  viewShow: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#344148",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  ButtonStyle: {
    alignItems: "center",
    padding: 15,
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#D5DDDC",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
  },
});
