import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../redux/User/UserActions";
import { getData } from "../redux/UserData/UserDataActions";
export default function MainPageBeforeLogin({ navigation }) {
  //redux
  const dispatch = useDispatch();
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  //useState
  const [loginData, setLoginData] = useState({
    loginPassword: null,
    loginEmail: null,
  });
  const [messege, setMessege] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // validation email
  function validateEmail(emailAddress) {
    if (emailAddress === null) return false;

    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAddress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    console.log(user);
    console.log(user.login.error || "nothing here");
    if (
      user.login.token !== null &&
      user.login.token !== false &&
      user.login.token !== undefined &&
      user.login.error !== "not correct data"
    ) {
      setLoginLoading(false);
      navigation.navigate("HomeDrawer");
    } else {
      setLoginLoading(false);
      if (user.login.error === "not correct data")
        alertError("Incorrect Email or Password");
      // alertError("Incorrect Email or Password");
    }
  }, [user]);

  const alertError = (text) => {
    setMessege(text);
    setLoginLoading(false);
    setTimeout(() => {
      setMessege(null);
    }, 5 * 1000);
  };

  const checkLogin = () => {
    setLoginLoading(true);
    if (!validateEmail(loginData.loginEmail)) {
      alertError("Email Format isn't correct");
      return;
    }
    if (
      (loginData.loginPassword && loginData.loginPassword.length === 0) ||
      loginData.loginPassword === null
    ) {
      alertError("Please Fill Password Input");
      return;
    }

    dispatch(userLogin(loginData));
    console.log(dispatch(userLogin(loginData)));
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
          top: 80,
        }}
      />
      <Animatable.View style={styles.viewShow} animation={"fadeInUp"}>
        <Text
          style={{
            color: "#CCCCCC",
            fontSize: messege !== null ? 20 : 50,
            marginBottom: 35,
            marginTop: 50,
            alignSelf: "center",
          }}
        >
          {messege !== null ? messege : "Login"}
        </Text>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onChangeText={(e) => setLoginData({ ...loginData, loginEmail: e })}
            value={undefined}
            placeholder="Email Address"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onChangeText={(e) =>
              setLoginData({ ...loginData, loginPassword: e })
            }
            value={(loginData.loginPassword && loginData.loginPassword) || ""}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("forgotPassword");
            }}
          >
            <Text
              style={{
                color: "#CCCCCC",
                fontSize: 10,
                alignSelf: "flex-end",
                marginRight: "10%",
                marginTop: 1,
              }}
            >
              i dont remember my password !
            </Text>
          </TouchableOpacity>
          {loginLoading ? (
            <Animatable.View
              style={{ alignSelf: "center", height: 55 }}
              animation="rubberBand"
              iterationCount={"infinite"}
            >
              <Image
                source={require("../assets/logoOnlyR.png")}
                style={{
                  width: 55,
                  height: 55,
                  alignSelf: "center",
                  margin: 5,
                }}
              />
            </Animatable.View>
          ) : (
            <TouchableOpacity
              style={styles.ButtonStyle}
              onPress={() => checkLogin()}
            >
              <Text style={{ color: "#D5DDDC", fontSize: 20 }}>Login</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("register1");
            }}
          >
            <Text
              style={{ color: "#CCCCCC", fontSize: 20, alignSelf: "center" }}
            >
              i dont have account yet !
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Animatable.View>
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
    height: "70%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#344148",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  ButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 55,
    backgroundColor: "#364057",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
  },
});
