import React, { useEffect, useState } from "react";
import { View } from "react-native-animatable";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import DashBoard from "../Pages/DashBoard";
import Drink from "../Pages/Drink";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DrawerContent } from "../Pages/DrawerContent";
import Sleep from "../Pages/Sleep";
import Sport from "../Pages/Sport";
import Medicine from "../Pages/Medicine";
import Food from "../Pages/Food";
import SplashScreen from "../Pages/SplashScreen";
import StackBeforeLogin from "../Stacks/StackBeforeLogin";
import Food1 from "../Pages/Food1";
import UserMeals from "../Pages/UserMeals";
import DailyListMenu from "../Pages/DailyListMenu";
import ShowDailyMeal from "../Pages/ShowDailyMeal";
import MedicineList from "../Pages/MedicineList";
import BarMedicine from "../components/BarMedicine";
import EditMedicine from "../Pages/EditMedicine";
import Pedometter1 from "../components/Pedometter1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPageBetween from "../components/LoadingPageBetween";
import MainContextData from "../ContextData/MainContextData";
import { Provider, useSelector } from "react-redux";
import testBG from "../Pages/testBG";
import MainPageBeforeLogin from "../Pages/MainPageBeforeLogin";
import Graph from "../Pages/Graph";

export default function Drawer({ navigation }) {
  const Drawer = createDrawerNavigator();
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <DrawerContent
          {...props}
          firstName={user.login.firstName}
          currentWeight={user.login.weight}
          meds={user.meds}
        />
      )}
    >
      {/* <Drawer.Screen name="PedoMetter1" component={Pedometter1} /> */}

      <Drawer.Screen name="LoadingPageBetween" component={LoadingPageBetween} />

      {/* <Drawer.Screen name="testBg" component={testBG} /> */}
      <Drawer.Screen name="DashBoard" component={DashBoard} />
      <Drawer.Screen name="Graph" component={Graph} />
      <Drawer.Screen name="Drink" component={Drink} />
      <Drawer.Screen name="Sport" component={Sport} />
      <Drawer.Screen name="Food" component={Food} />
      {/* <Drawer.Screen name="Food1" component={Food1} /> */}
      <Drawer.Screen name="Sleep" component={Sleep} />
      <Drawer.Screen name="Logout" component={SplashScreen} />
      <Drawer.Screen name="AddMedicine" component={Medicine} />
      {/* <Drawer.Screen name="splash" component={StackBeforeLogin} /> */}
      <Drawer.Screen name="drawerContent" component={DrawerContent} />
      <Drawer.Screen name="UserMeals" component={UserMeals} />
      <Drawer.Screen name="ShowDailyMeal" component={ShowDailyMeal} />
      <Drawer.Screen name="DailyListMenu" component={DailyListMenu} />
      <Drawer.Screen name="MedicineList" component={MedicineList} />
      {/* <Drawer.Screen name="EditMedicine" component={EditMedicine} /> */}
      {/* <Drawer.Screen name="loginPage" component={MainPageBeforeLogin} /> */}
      {/* <Drawer.Screen name="SplashScreen" component={SplashScreen}/> */}
    </Drawer.Navigator>
  );
}
