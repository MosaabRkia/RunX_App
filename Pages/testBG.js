import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import BackGroundTask from "./BackGroundTask";
import { Pedometer } from "expo-sensors";
import { useSelector } from "react-redux";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
const BACKGROUND_FETCH_TASK = "background-steps-24";

const testBG = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    console.log("worked");
    _subscribe();
    return "done task";
  });

  useEffect(() => {
    console.log("started steps bg task");
    registerBackgroundFetchAsync();

    return () => null;
  }, []);

  useEffect(() => {
    console.log(currentStepCount, Pedometer.PermissionStatus);
    Pedometer.isAvailableAsync().then((result) => {
      console.log(String(result));
    });
    return () => null;
  }, [currentStepCount]);

  const registerBackgroundFetchAsync = async () => {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1 * 1, // 15 sec
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android onl
    });
  };

  useEffect(() => {
    console.log(user);
    _subscribe();
    return () => null;
  }, []);

  const _subscribe = () => {
    Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
      console.log(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(String(result));
      },
      (error) => {
        setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
      }
    );

    // const _unsubscribe = () => {
    //   _subscription && this._subscription.remove();
    //   _subscription = null;
    // };

    // const end = new Date();
    // const start = new Date();
    // start.setDate(end.getSeconds() - 1);
    // Pedometer.getStepCountAsync(start, end).then(
    //   (result) => {
    //     setPastStepCount(result.steps);
    //     console.log(result.steps);
    //   },
    //   (error) => {
    //     setPastStepCount("Could not get stepCount: " + error);
    //   }
    // );
  };

  // const time = () => {
  //   //const interval = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
  //   var date = new Date();
  //   return date.getHours().toString();
  // };

  return (
    <View>
      <Text style={{ marginTop: 100 }}>
        Walk! And watch this go up: {currentStepCount}
      </Text>
    </View>
  );
};

export default testBG;
