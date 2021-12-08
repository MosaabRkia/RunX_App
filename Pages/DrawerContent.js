import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

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
import { UserData } from "../ContextData/MainContextData";
import { useDispatch, useSelector } from "react-redux";
import { sendLogOutUserAction } from "../redux/User/UserActions";
import AwesomeAlert from "react-native-awesome-alerts";

export function DrawerContent(props) {
  const dispatch = useDispatch();
  //alert
  const [alert, setAlert] = useState({
    text: "",
    show: false,
  });
  const text = () => <Text>hello!</Text>;
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
                Hello {props.firstName}
              </Text>
              <Caption style={[styles.caption, { fontWeight: "bold" }]}>
                {props.currentWeight} KiloGram
              </Caption>
              <TouchableOpacity
                style={[styles.ButtonStyle_Next, { right: -35, top: 50 }]}
                onPress={() => {
                  //save data go next page
                  console.log(alert);
                  setAlert({
                    text: text,
                    show: true,
                  });
                }}
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
            {/* graph */}
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
            />
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

const styles = StyleSheet.create({
  ButtonStyle_Next: {
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    position: "absolute",
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: 25,
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
});
