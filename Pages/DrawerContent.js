import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import Dialog from "react-native-dialog";
import {
  Avatar,
  Title,
  Paragraph,
  Drawer,
  Text,
  Caption,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { sendLogOutUserAction } from "../redux/User/UserActions";
import AwesomeAlert from "react-native-awesome-alerts";
import { weightUpdate } from "../redux/UpdateUserData/UpdateUserDataActions";

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [newWeight, setNewWeight] = useState(0);

  let date = new Date();
  const [welcomeWord, setWelcomeWord] = useState("Hello");

  useEffect(() => {
    // 4 10 good morning - 11 16 good afternoon - 17 20 good evening - 21 3 good night
    if (date.getHours() >= 4 && date.getHours() <= 10)
      setWelcomeWord("Good Morning");
    else if (date.getHours() >= 11 && date.getHours() <= 16)
      setWelcomeWord("Good AfterNoon");
    else if (date.getHours() >= 17 && date.getHours() <= 20)
      setWelcomeWord("Good Evening");
    else if (date.getHours() >= 21 || date.getHours() <= 3)
      setWelcomeWord("Good Night");
  }, []);
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = () => {
    var date = new Date();
    if (newWeight > 0 && props.currentWeight !== newWeight)
      dispatch(
        weightUpdate({
          UserId: props.UserId,
          date: date,
          CurrentWeight: Number(newWeight),
        })
      );

    setVisible(false);
  };

  //alert

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#92C6BC", "#8D9A93", "#536976"]}
    >
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Image
              source={require("../assets/logoOnlyR.png")}
              style={{ width: 75, height: 75, marginRight: 20 }}
            />
            <View style={styles.title}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {welcomeWord} {props.firstName}
              </Text>
              <Caption style={[styles.caption, { fontWeight: "bold" }]}>
                {props.currentWeight} KiloGram
              </Caption>
              <TouchableOpacity
                style={styles.ButtonStyle_Next}
                onPress={() => showDialog()}
              >
                <Text
                  style={{
                    color: "rgba(28, 28, 30, 0.68)",
                    fontSize: 13,
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                    minWidth: 100,
                  }}
                >
                  Update Weight
                </Text>
              </TouchableOpacity>
              {/* <Button
                color="transparent"
                title="Update Weight"
                onPress={showDialog}
              /> */}
              <Dialog.Container
                contentStyle={{
                  borderRadius: 25,
                  backgroundColor: "#8D9A93",
                  borderWidth: 1,
                }}
                visible={visible}
              >
                <Dialog.Title style={{ fontWeight: "bold" }}>
                  Weight Update
                </Dialog.Title>
                {/* <Dialog.input></Dialog.input> */}
                <TextInput
                  style={styles.inputStyle}
                  placeholderTextColor="#364057"
                  value={undefined}
                  maxlength={3}
                  onChangeText={setNewWeight}
                  keyboardType="numeric"
                  placeholder="Weight"
                />

                <Dialog.Description style={{ fontWeight: "bold" }}>
                  Enter Your New Weight :
                </Dialog.Description>
                <Dialog.Button
                  label="Cancel"
                  style={{ color: "black", fontWeight: "bold" }}
                  onPress={handleCancel}
                />
                <Dialog.Button
                  label="Update"
                  style={{ color: "black", fontWeight: "bold" }}
                  onPress={handleUpdate}
                />
              </Dialog.Container>
            </View>
          </View>
          <Drawer.Section style={styles.drawersection}>
            {/* food */}
            <DrawerItem
              labelStyle={{ fontWeight: "bold" }}
              style={styles.iconSpace}
              icon={({ color, size }) => (
                <Icon name="food-fork-drink" color={color} size={size} />
              )}
              label="Food"
              onPress={() => {
                props.navigation.navigate("Food");
              }}
            />
            {/* water */}
            <DrawerItem
              labelStyle={{ fontWeight: "bold" }}
              style={styles.iconSpace}
              icon={({ color, size }) => (
                <Icon name="water" color={color} size={size} />
              )}
              label="Drink"
              onPress={() => {
                props.navigation.navigate("Drink");
              }}
            />
            {/* sleep */}
            <DrawerItem
              labelStyle={{ fontWeight: "bold" }}
              style={styles.iconSpace}
              icon={({ color, size }) => (
                <Icon name="sleep" color={color} size={size} />
              )}
              label="Sleep"
              onPress={() => {
                props.navigation.navigate("Sleep");
              }}
            />
            {/* sport */}
            <DrawerItem
              labelStyle={{ fontWeight: "bold" }}
              style={styles.iconSpace}
              icon={({ color, size }) => (
                <Icon name="run" color={color} size={size} />
              )}
              label="Sport"
              onPress={() => {
                props.navigation.navigate("Sport");
              }}
            />
            {/* graph
            <DrawerItem
              labelStyle={{ fontWeight: "bold" }}
              style={styles.iconSpace}
              icon={({ color, size }) => (
                <Icon name="history" color={color} size={size} />
              )}
              label="History Graph"
              onPress={() => {
                props.navigation.navigate("Graph");
              }}
            /> */}
            {/* medicine */}
            {props.meds.list.length > 0 ? (
              <DrawerItem
                labelStyle={{ fontWeight: "bold" }}
                icon={({ color, size }) => (
                  <Icon name="medical-bag" color={color} size={size} />
                )}
                label="Medicine"
                onPress={() => {
                  props.navigation.navigate("MedicineList");
                }}
              />
            ) : (
              <View />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{ fontWeight: "bold" }}
          icon={({ color, size }) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            AsyncStorage.removeItem("token")
              .then(() => {
                dispatch(sendLogOutUserAction());
              })
              .then(() => {
                props.navigation.navigate("loginPage");
              });
          }}
        />
      </Drawer.Section>
      {/* <AwesomeAlert
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
      /> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonStyle_Next: {
    padding: 5,
    width: "80%",
    // alignSelf: "flex-end",
    position: "relative",
    right: -55,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontFamily: "monospace",
    marginTop: 25,
    fontWeight: "bold",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    fontSize: 14,
    fontFamily: "monospace",
    lineHeight: 14,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawersection: {
    borderTopWidth: 1,
  },
  iconSpace: {
    marginBottom: 10,
  },
  bottomDrawerSection: {
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputStyle: {
    width: "90%",
    height: 45,
    marginBottom: 0,

    backgroundColor: "#D5DDDC",
    alignSelf: "center",
    borderRadius: 15,
    textAlign: "center",
    borderColor: "#364057",
    borderWidth: 1,
  },
});
