import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
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
import { UserData } from "../Drawer/Drawer";

export function DrawerContent(props) {
  const fetchData = useContext(UserData);

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
              onPress={() => {}}
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
            {/* sleep */}
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
            AsyncStorage.removeItem("token");
            props.navigation.navigate("loginPage");
          }}
        />
      </Drawer.Section>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
