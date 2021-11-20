import React from "react";
import StackBeforeLogin from "./Stacks/StackBeforeLogin";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "./Drawer/Drawer";
import { StatusBar } from "react-native";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store()}>
      <NavigationContainer>
        <StatusBar style="light" animated />
        {/* <Drawer/> */}
        <StackBeforeLogin />
      </NavigationContainer>
    </Provider>
  );
}
