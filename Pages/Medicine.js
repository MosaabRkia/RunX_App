import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo-linear-gradient";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import AppButton from "../components/AppButton";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { medicineEdit } from "../redux/UpdateUserData/UpdateUserDataActions";

export default function Medicine(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  const dispatch = useDispatch();

  //dimention
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  //goBack const
  const goBk = () => props.navigation.navigate("DashBoard");

  //useState
  const [medicineName, setMedicineName] = useState(null);
  const [medicineAmount, setMedicineAmount] = useState(null);
  const [time, setTime] = useState("11:11");
  const [clicked, setClicked] = useState(false); //hide time selector
  const [array, setArray] = useState([]);
  const [arrayFetch, setArrayFetch] = useState([]);

  const sendToFetch = async () => {
    console.log(user.login.data.id);
    await dispatch(
      medicineEdit({
        type: "ADD",
        MedicineObj: {
          UserId: user.login.data.id,
          Name: medicineName,
          Amount: medicineAmount,
          Times: arrayFetch,
        },
      })
    );
    props.navigation.navigate("DashBoard");

    // console.log({
    //   UserId: user.login.data.id,
    //   Name: medicineName,
    //   Amount: medicineAmount,
    //   Times: arrayFetch,
    // });
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <TittleBarAndArrow
        goBk={goBk}
        iconName="arrow-left"
        iconSize={40}
        text="Medicine Info"
      />

      <TextInput
        style={[styles.inputStyle, { marginTop: 15 }]}
        placeholderTextColor="#364057"
        onChangeText={setMedicineName}
        placeholder="Medicine Name"
      />

      <TextInput
        style={styles.inputStyle}
        placeholderTextColor="#364057"
        onChangeText={setMedicineAmount}
        placeholder="Amount Of Pills (cc/ml)"
      />

      <View>
        <TouchableOpacity
          onPress={() => setClicked(true)}
          style={[
            styles.inputStyle,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={{ fontSize: 20, textAlign: "center", width: "100%" }}>
            {time}
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (time !== "hh:mm" && !array.find((x) => x === time))
                setArray([...array, time]);
              console.log(time);
              setArrayFetch([
                ...arrayFetch,
                { time: `2021-11-21T${time}:06.750` },
              ]);
              setTime("hh:mm");
            }}
          >
            <Icon name="pluscircleo" color={"black"} size={40} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={clicked}
        mode="time"
        onConfirm={(e) => {
          let time = new Date(e);
          console.log(time.getHours(), time.getMinutes());
          if (time.getHours() < 10 && time.getMinutes() < 10)
            setTime("0" + time.getHours() + ":0" + time.getMinutes());
          else if (time.getHours() < 10)
            setTime("0" + time.getHours() + ":" + time.getMinutes());
          else if (time.getMinutes() < 10)
            setTime(time.getHours() + ":0" + time.getMinutes());
          else setTime(time.getHours() + ":" + time.getMinutes());

          setClicked(false);
        }}
        onCancel={() => setClicked(false)}
      />

      <Text
        style={{
          width: "80%",
          borderBottomWidth: 1,
          alignSelf: "center",
          textAlign: "center",
          marginTop: 20,
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Times
      </Text>

      <ScrollView
        style={{ maxHeight: windowHeight * 0.4, height: windowHeight * 0.4 }}
      >
        {array &&
          array.map((e, index) => {
            return (
              <View key={index}>
                <Text
                  key={index}
                  style={{
                    width: "80%",
                    borderBottomWidth: 1,
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  {e}
                </Text>
                <TouchableOpacity
                  style={[styles.addButton, { right: "13%", marginTop: "1%" }]}
                  onPress={() => {
                    let newArr = array.filter((n) => n !== e);
                    setArray(newArr);
                  }}
                >
                  <Icon name="minuscircleo" color={"black"} size={30} />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
      <View style={{ alignSelf: "center" }}>
        <AppButton
          onPress={() => sendToFetch()}
          text={"Add Medicine"}
          color={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  addButton: {
    position: "absolute",
    top: "10%",
    right: "2%",
  },
});
