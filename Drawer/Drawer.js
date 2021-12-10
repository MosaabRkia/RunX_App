import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashBoard from "../Pages/DashBoard";
import Drink from "../Pages/Drink";
import { DrawerContent } from "../Pages/DrawerContent";
import Sleep from "../Pages/Sleep";
import Sport from "../Pages/Sport";
import Medicine from "../Pages/Medicine";
import Food from "../Pages/Food";
import SplashScreen from "../Pages/SplashScreen";
import UserMeals from "../Pages/UserMeals";
import DailyListMenu from "../Pages/DailyListMenu";
import ShowDailyMeal from "../Pages/ShowDailyMeal";
import MedicineList from "../Pages/MedicineList";
import LoadingPageBetween from "../components/LoadingPageBetween";
import { useSelector } from "react-redux";

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
          UserId={user.login.userId}
          meds={user.meds}
        />
      )}
    >
      <Drawer.Screen name="LoadingPageBetween" component={LoadingPageBetween} />
      <Drawer.Screen name="DashBoard" component={DashBoard} />
      <Drawer.Screen name="Drink" component={Drink} />
      <Drawer.Screen name="Sport" component={Sport} />
      <Drawer.Screen name="Food" component={Food} />
      <Drawer.Screen name="Sleep" component={Sleep} />
      <Drawer.Screen name="Logout" component={SplashScreen} />
      <Drawer.Screen name="AddMedicine" component={Medicine} />
      <Drawer.Screen name="drawerContent" component={DrawerContent} />
      <Drawer.Screen name="UserMeals" component={UserMeals} />
      <Drawer.Screen name="ShowDailyMeal" component={ShowDailyMeal} />
      <Drawer.Screen name="DailyListMenu" component={DailyListMenu} />
      <Drawer.Screen name="MedicineList" component={MedicineList} />
    </Drawer.Navigator>
  );
}
