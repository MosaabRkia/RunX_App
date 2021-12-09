import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CirclesRegister from "../components/CirclesRegister";
import AwesomeAlert from "react-native-awesome-alerts";

/*
             plan:null,
            firstName:null,
            email:null,
            password:null,
            birdthday:Date(null),
            weight:Number(null),
            height:Number(null),
            GoalWeight:Number(null),
            fruits:[x,y,z],
            vegetables:[x,y,z],
            meats:[x,y,z],
            snacks:[x,y,z],
            drinks:[x,y,z],
            bakery:[x,y,z],
            fish:[x,y,z],
            dairy:[x,y,z],
            seeds:[x,y,z]
            add water calculator by weight
*/

export default function RegisterForm2({ route, navigation }) {
  //useState
  const [info, setInfo] = useState({
    DateOfBirth: "1999-02-15T16:53:06.750", //yyyy-mm-dd
    Weights: [{ CurrentWeight: null, Date: null }],
    Heights: [{ CurrentHeight: null, Date: null }],
    GoalWeight: null,
  });

  //alert
  const [alert, setAlert] = useState({
    text: "",
    show: false,
  });

  const [healthyWeight, setHealthyWeight] = useState(null);
  const [showCalcWeight, setShowCalcWeight] = useState(false);
  const [showGoalInputText, setShowGoalInputText] = useState(true);
  const [message, setMessage] = useState(null);

  // date
  const formatDateToday = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-").toString() + "T16:53:06.750";
  };

  //date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateState, setDate] = useState(null);

  //route
  const { data } = route.params;

  //function format date
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-").toString();
  }

  //goBack const
  const goBk = () => navigation.goBack();

  // functions
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setInfo({ ...info, DateOfBirth: date });
    console.log(date);
    hideDatePicker();
  };

  //handle weight numberic
  const handleWeightInputChange = (text) => {
    if (/^\d+$/.test(text)) {
      setInfo({
        ...info,
        Weights: [{ CurrentWeight: +text, Date: formatDateToday() }],
      });
    }
  };
  //handle height numberic
  const handleHeightInputChange = (text) => {
    if (/^\d+$/.test(text)) {
      setInfo({
        ...info,
        Heights: [{ CurrentHeight: +text, Date: formatDateToday() }],
      });
    }
  };

  //handle goal weight numberic
  const handleGoalWeightInputChange = (text) => {
    if (/^\d+$/.test(text)) {
      setInfo({ ...info, GoalWeight: +text });
    }
  };

  //useEffect
  useEffect(() => {
    if (data.Goal === "healthy") {
      setShowGoalInputText(false);
    }
  }, []);

  //loop on calc healthy weight
  useEffect(() => {
    if (
      info.Heights[0].CurrentHeight !== "" &&
      info.Weights[0].CurrentWeight !== "" &&
      info.Heights[0].CurrentHeight !== null &&
      info.Weights[0].CurrentWeight !== null &&
      50 + 0.91 * (info.Heights[0].CurrentHeight - 152.4) > 0 &&
      45.5 + 0.91 * (info.Heights[0].CurrentHeight - 152.4) > 0
    ) {
      setShowCalcWeight(true);

      if (data.Gender === "male") {
        setHealthyWeight(
          (50 + 0.91 * (info.Heights[0].CurrentHeight - 152.4)).toFixed(2)
        );
        if (data.Goal === "healthy") {
          setInfo({
            ...info,
            GoalWeight:
              50 + 0.91 * (info.Heights[0].CurrentHeight - 152.4).toFixed(2),
          });
        }
      }

      if (data.Gender === "female") {
        setHealthyWeight(
          45.5 + 0.91 * (info.Heights[0].CurrentHeight - 152.4).toFixed(2)
        );
        if (data.Goal === "healthy") {
          setInfo({
            ...info,
            GoalWeight:
              45.5 + 0.91 * (info.Heights[0].CurrentHeight - 152.4).toFixed(2),
          });
        }
      }
    } else {
      setShowCalcWeight(false);
    }
  }, [info.Heights[0].CurrentHeight, info.Weights[0].CurrentWeight]);

  //const error creator
  const setMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  //save data
  const OnSelectSaveData = async () => {
    try {
      if (info.DateOfBirth === "yyyy-mm-dd") {
        setAlert({ show: true, text: "Date Is Not Valid" });
        return;
      }

      if (
        +info.Weights[0].CurrentWeight <= 0 ||
        info.Weights[0].CurrentWeight === null ||
        info.Weights[0].CurrentWeight === ""
      ) {
        setAlert({ show: true, text: "Weight Is Not A Number Or Empty" });
        return;
      }

      if (
        +info.Heights[0].CurrentHeight <= 0 ||
        info.Heights[0].CurrentHeight === null ||
        info.Heights[0].CurrentHeight === ""
      ) {
        setAlert({ show: true, text: "Height Is Not A Number Or Empty" });
        return;
      }
      if (
        +info.GoalWeight <= 0 ||
        info.GoalWeight === null ||
        info.GoalWeight === ""
      ) {
        setAlert({ show: true, text: "Goal Weight Is Not A Number Or Empty" });
        return;
      }
      if (
        data.Goal === "Gain" &&
        Number(info.Weights[0].CurrentWeight) > Number(info.GoalWeight)
      ) {
        setAlert({
          show: true,
          text: "Your Goal Must Be Higher Than You Current Weight",
        });
        return;
      }
      if (
        data.Goal === "lose" &&
        Number(info.Weights[0].CurrentWeight) < Number(info.GoalWeight)
      ) {
        setAlert({
          show: true,
          text: "Your Goal Must Be Lower Than You Current Weight",
        });
        return;
      }

      let allData = { ...data, ...info };
      navigation.navigate("register4", { data: allData });
    } catch (e) {
      console.log("Error in line 29 => ", e);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      {message === null ? (
        <Image
          source={require("../assets/logoNBG.png")}
          style={{
            width: 280,
            height: 150,
            alignSelf: "center",
            position: "absolute",
            top: 20,
          }}
        />
      ) : (
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: 18,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            position: "absolute",
            top: 20,
          }}
        >
          {message && message}
        </Text>
      )}

      <Animatable.View style={styles.viewShow} animation={"fadeInUp"}>
        <TittleBarAndArrow
          goBk={goBk}
          iconName="arrow-left"
          iconSize={40}
          text="Your Info"
        />
        <Text style={{ color: "#CCCCCC", fontSize: 25, alignSelf: "center" }}>
          Welcome {data.FirstName}
        </Text>
        <CirclesRegister
          width={70}
          amount={4}
          titles={[
            { word: "Goal", fill: true },
            { word: "Info", fill: true },
            { word: "Bmi", fill: true },
            { word: "Food", fill: false },
          ]}
        />
        <Text
          style={{
            color: "#CCCCCC",
            fontSize: 20,
            marginTop: 15,
            textAlign: "left",
            alignSelf: "center",
          }}
        >
          status of using
        </Text>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onFocus={showDatePicker}
            onChangeText={showDatePicker}
            value={formatDate(info.DateOfBirth)}
            placeholder="Birthday"
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onChangeText={handleWeightInputChange}
            value={undefined}
            keyboardType={"numeric"}
            placeholder="Weight KG"
          />

          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onChangeText={handleHeightInputChange}
            value={undefined}
            keyboardType={"numeric"}
            placeholder="Height CM"
          />

          {showGoalInputText ? (
            <TextInput
              style={styles.inputStyle}
              placeholderTextColor="#364057"
              onChangeText={handleGoalWeightInputChange}
              value={undefined}
              placeholder="Goal Weight KG"
              keyboardType={"numeric"}
            />
          ) : (
            <View></View>
          )}

          {showCalcWeight ? (
            <Text
              style={{ alignSelf: "center", fontSize: 15, color: "#D5DDDC" }}
            >
              your healthy weight is {healthyWeight}
            </Text>
          ) : (
            <View></View>
          )}

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
              Confirm
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
    height: "80%",
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
