import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  createMealsList24,
  createMealsUpdate24,
} from "../components/FuncCreateMeal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Pedometer } from "expo-sensors";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)

export default function BackGroundTask() {
  const BACKGROUND_FETCH_TASK = "background-steps-24";
  const [isRegistered, setIsRegistered] = useState(false);
  const [userId, setUserId] = useState(null);
  const [meals, setMeals] = useState(null);
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  let date = new Date();
  useEffect(() => {
    console.log("started steps bg task");
    registerBackgroundFetchAsync();
  }, []);

  // 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  const registerBackgroundFetchAsync = async () => {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1 * 1, // 15 sec
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  };

  // 3. (Optional) Unregister tasks by specifying the task name
  // This will cancel any future background fetch calls that match the given name
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  const unregisterBackgroundFetchAsync = async () => {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  };

  const checkStatusAsync = async () => {
    // const status = await BackgroundFetch.getStatusAsync();
    console.log(await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK));
  };

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    console.log("worked");
    Pedometer.watchStepCount((result) => {
      console.log("worked 1");
      console.log("58", result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        console.log("63", String(result));
      },
      (error) => {
        console.log("error");
        console.log(error);
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        console.log("76", result.steps);
      },
      (error) => {
        console.log("Could not get stepCount: " + error);
      }
    );

    return "done task";
  });
  return <View></View>;
}
