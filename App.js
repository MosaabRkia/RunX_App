import React from "react";
import StackBeforeLogin from "./Stacks/StackBeforeLogin";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store()}>
      <NavigationContainer>
        <StatusBar style="light" animated />
        <StackBeforeLogin />
      </NavigationContainer>
    </Provider>
  );
}
