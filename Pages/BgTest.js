import React from "react";
import { View, Text } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BgTest = () => {
  const TASK_NAME = "BACKGROUND_TASK";

  TaskManager.defineTask(TASK_NAME, () => {
    try {
      // fetch data here...
      const receivedNewData = "Simulated fetch " + Math.random();
      console.log("My task ", receivedNewData);
      return receivedNewData
        ? BackgroundFetch.Result.NewData
        : BackgroundFetch.Result.NoData;
    } catch (err) {
      return BackgroundFetch.Result.Failed;
    }
  });

  const RegisterBackgroundTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 5, // seconds,
      });
      console.log("Task registered");
    } catch (err) {
      console.log("Task Register failed:", err);
    }
  };
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default BgTest;
