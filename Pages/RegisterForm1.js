import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import CirclesRegister from "../components/CirclesRegister";
import AwesomeAlert from "react-native-awesome-alerts";

export default function RegisterForm1({ route, navigation }) {
  //useState
  const [data, setData] = useState({
    FirstName: null,
    Email: null,
    Password: null,
    Gender: null,
  });

  //alert
  const [alert, setAlert] = useState({
    text: "",
    show: false,
  });

  const [currentPassword, setCurrentPassword] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    showPassword: true,
    showCurPassword: true,
  });
  const [message, setMessage] = useState(null);

  const firstData = route.params;
  //useEffect
  useEffect(() => {
    console.log(firstData);
  }, []);

  //goBack const
  const goBk = () => navigation.goBack();

  // functions
  const setMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  //valid Email check
  function validateEmail(EmailAdress) {
    if (EmailAdress === null) return false;

    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (EmailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

  //save data
  const OnSelectSaveData = async () => {
    try {
      if (
        data.FirstName === null ||
        (data.FirstName.length < 3 && /^[a-zA-Z]+$/.test(data.FirstName))
      ) {
        setAlert({ show: true, text: "Enter 3 Letters At Least - First Name" });
        return;
      }
      if (!validateEmail(data.Email)) {
        setAlert({ show: true, text: "Email Format Is Not Valid" });
        return;
      }
      if (data.Password === null || data.Password.length < 6) {
        setAlert({
          show: true,
          text: "Password Empty or Shorter Than 6 Characters",
        });
        return;
      }
      if (data.Password !== currentPassword) {
        setAlert({ show: true, text: "Passwords Do Not Match " });
        return;
      }
      if (data.Gender === null) {
        setAlert({ show: true, text: "Please Select Gender" });
        return;
      }
      console.log(data);
      navigation.navigate("register3", {
        data: {
          ...data,
          PushNotifications: firstData.PushNotifications,
          Goal: firstData.Goal,
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
          height: 130,
          alignSelf: "center",
          position: "absolute",
          top: 20,
        }}
      />
      <Animatable.View style={styles.viewShow} animation={"fadeInUp"}>
        <TittleBarAndArrow
          goBk={goBk}
          iconName="arrow-left"
          iconSize={40}
          text="Your Info"
        />
        <Text
          style={{
            color: "#CCCCCC",
            fontSize: 40,
            alignSelf: "center",
          }}
        >
          {message ? message : "HELLO!"}
        </Text>
        <CirclesRegister
          width={45}
          amount={4}
          titles={[
            { word: "Goal", fill: true },
            { word: "Info", fill: true },
            { word: "Bmi", fill: false },
            { word: "Food", fill: false },
          ]}
        />

        <Text
          style={{
            color: "#CCCCCC",
            fontSize: 25,
            marginBottom: 15,
            alignSelf: "center",
          }}
        >
          lets start with your basic info
        </Text>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onChangeText={(e) =>
              setData({ ...data, FirstName: e.toLowerCase() })
            }
            value={undefined}
            placeholder="First Name"
          />
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onChangeText={(e) => setData({ ...data, Email: e.toLowerCase() })}
            value={undefined}
            placeholder="Email"
          />

          <View>
            <TextInput
              style={styles.inputStyle}
              placeholderTextColor="#364057"
              onChangeText={(e) => setData({ ...data, Password: e })}
              value={undefined}
              placeholder="Password"
              secureTextEntry={showPasswords.showPassword}
            />

            <View style={{ position: "absolute", right: "12%", bottom: "20%" }}>
              <TouchableOpacity
                style={{ width: 24, height: 24 }}
                onPress={() => {
                  setShowPasswords({
                    ...showPasswords,
                    showPassword: !showPasswords.showPassword,
                  });
                }}
              >
                <Icon
                  name={showPasswords.showPassword ? "eye-slash" : "eye"}
                  size={15}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TextInput
              style={styles.inputStyle}
              placeholderTextColor="#364057"
              onChangeText={setCurrentPassword}
              value={undefined}
              placeholder="ReEnter Password"
              secureTextEntry={showPasswords.showCurPassword}
            />

            <View style={{ position: "absolute", right: "12%", bottom: "20%" }}>
              <TouchableOpacity
                style={{ width: 24, height: 24 }}
                onPress={() => {
                  setShowPasswords({
                    ...showPasswords,
                    showCurPassword: !showPasswords.showCurPassword,
                  });
                }}
              >
                <Icon
                  name={showPasswords.showCurPassword ? "eye-slash" : "eye"}
                  size={15}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                margin: "1%",
                padding: 15,
                justifyContent: "center",
                backgroundColor:
                  data.Gender && data.Gender === "male" ? "#364057" : "#D5DDDC",
                width: "38%",
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 15,
                borderColor: "white",
                borderWidth: 1,
              }}
              onPress={() => {
                setData({ ...data, Gender: "male" });
              }}
            >
              <Text
                style={{
                  color:
                    data.Gender && data.Gender === "male"
                      ? "#D5DDDC"
                      : "#364057",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                margin: "1%",
                padding: 15,
                justifyContent: "center",
                backgroundColor:
                  data.Gender && data.Gender === "female"
                    ? "#364057"
                    : "#D5DDDC",
                width: "38%",
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 15,
                borderColor: "white",
                borderWidth: 1,
              }}
              onPress={() => {
                setData({ ...data, Gender: "female" });
              }}
            >
              <Text
                style={{
                  color:
                    data.Gender && data.Gender === "female"
                      ? "#D5DDDC"
                      : "#364057",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.ButtonStyle_Next}
            onPress={() => {
              //save data go next page
              OnSelectSaveData();
            }}
          >
            <Text
              style={{ color: "#D5DDDC", fontSize: 13, textAlign: "center" }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Animatable.View>
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        showCancelButton={false}
        title="Register Form"
        titleStyle={{ fontWeight: "bold" }}
        message={alert.text}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmButtonColor="#364057"
        onConfirmPressed={() => {
          setAlert({ ...alert, show: false });
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
    height: "83%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#344148",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  ButtonStyle: {
    alignItems: "center",
    margin: "1%",
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#D5DDDC",
    width: "38%",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
  },
  ButtonStyle_Next: {
    alignItems: "center",
    padding: 15,
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#344148",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
  },
});
