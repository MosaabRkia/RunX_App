import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { useDispatch, useSelector } from "react-redux";
import BarMedicine from "../components/BarMedicine";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import { getData } from "../redux/UserData/UserDataActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MedicineList(props) {
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  const dispatch = useDispatch();

  //alert
  const [alert, setAlert] = useState({
    text: "",
    show: false,
  });

  useEffect(() => {
    dispatch(getData(user.login.token));
  }, []);
  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <TittleBarAndArrow
        goBk={() => props.navigation.navigate("DashBoard")}
        iconName="arrow-left"
        iconSize={40}
        text="Your Medics List"
      />
      <ScrollView
        style={{
          alignSelf: "center",
          marginTop: 10,
          // borderRadius: 10,
          // borderWidth: 1,
        }}
      >
        {user.meds.list &&
          user.meds.list.map((e, index) => {
            return (
              <BarMedicine
                key={index}
                key={index}
                item={e}
                setAlert={(e) => setAlert(e)}
              />
            );
          })}
      </ScrollView>
      {/* <Image
        key={"imgGif"}
        style={styles.photoCss}
        source={{
          uri: "https://c.tenor.com/wjWgNzw3uw0AAAAi/nkf-nkfmy.gif",
        }}
      /> */}
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        showCancelButton={false}
        title="Medicine Form"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoCss: {
    alignSelf: "center",
    width: 0.73 * windowWidth,
    height: 0.345 * windowHeight,
    position: "relative",
    bottom: 0,
  },
});
