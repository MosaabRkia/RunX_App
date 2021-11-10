import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import BackGroundTask from "./BackGroundTask";
import { Pedometer } from "expo-sensors";

function testBG() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    _subscribe();
  }, []);

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(String(result));
      },
      (error) => {
        setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
      }
    );

    _unsubscribe = () => {
      _subscription && this._subscription.remove();
      _subscription = null;
    };

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        setPastStepCount(result.steps);
      },
      (error) => {
        setPastStepCount("Could not get stepCount: " + error);
      }
    );
  };

  const time = () => {
    //const interval = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
    var date = new Date();
    return date.getHours().toString();
  };

  return (
    <View>
      <BackGroundTask
        interval={60 * 10000}
        function={() => {
          time() === "00"
            ? console.log("passed day")
            : console.log("not passed day");
          //   try {
          //     fetch("https://localhost:44324/api/items/5")
          //       .then((r) => r.json())
          //       .then((data) => console.log(data));
          //   } catch (error) {
          //     console.log(error.message);
          //   }
        }}
      />

      <Text style={{ marginTop: 100 }}>
        Walk! And watch this go up: {pastStepCount - 8172}
      </Text>
    </View>
  );
}

export default testBG;
