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

/**
 * createMealsUpdate24 meals
 * http://proj17.ruppin-tech.co.il/updatedata/update24dailySteps
 * http://proj17.ruppin-tech.co.il/updatedata/update24dailyWaterCups
 * http://proj17.ruppin-tech.co.il/updatedata/update24Sleeps
 * http://proj17.ruppin-tech.co.il/updatedata/update24KcalDaily
 * http://proj17.ruppin-tech.co.il/updatedata/update24meals (list)
 */

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)

export default function BackGroundFetch24() {
  const BACKGROUND_FETCH_TASK_24_DRINK = "background-fetch-24-drink";
  const BACKGROUND_FETCH_TASK_24_FETCH = "background-fetch-24-fetch";
  const BACKGROUND_FETCH_TASK_24_MEDICINE = "background-fetch-24-medicine";

  const [isRegistered, setIsRegistered] = useState(false);
  const [userId, setUserId] = useState(null);
  const [meals, setMeals] = useState(null);
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);

  let date = new Date();

  // useEffect(() => {
  //   if (user !== null && user.login.data.dateOfBirth !== null)
  //     createMealsUpdate24();
  // }, [user]);
  useEffect(() => {
    console.log("started");
    createMealsUpdate24();
    registerBackgroundFetchAsync24Drink();
    registerBackgroundFetchAsync24FetchData();
    registerBackgroundFetchAsync24Medicine();

    return () => setUserId(user.login.userId);
  }, []);

  const createMealsUpdate24 = () => {
    let currentYear = new Date(); // create date now
    let ageCalc = // get age
      currentYear.getFullYear() - String(user.login.dateOfBirth).substr(0, 4);
    var mealsArr = []; //empty array that will return the meals array after created
    var proteins = user.login.weight * 2.1 * 0.25; // protein calculator
    let calories = // calories calculator
      user.login.gender === "male"
        ? +66 +
          6.2 * user.login.weight +
          12.7 * user.login.height -
          6.76 * ageCalc
        : +655.1 +
          4.35 * user.login.weight +
          4.7 * +user.login.height -
          4.7 * ageCalc;

    // switch on the goal of client
    switch (user.login.goal) {
      case "lose":
        calories = calories * 0.71; // create the appropriate calculation of calories
        var fats = 0.7 * user.login.weight * 0.25; // create the appropriate calculation of fats
        createMealsList24(
          0,
          0.17 * calories,
          proteins,
          fats,
          {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          },
          user
        )
          .then((data) => {
            mealsArr.push({
              // send the data to the helper function function
              mealName: "breakfast",
              Date: date,
              UserId: user.login.userId,
              ItemsList: data,
              eaten: false,
            });
          })
          .then(() => {
            createMealsList24(
              1,
              0.14 * calories,
              proteins,
              fats,
              {
                dairy: 1,
                drinks: 1,
                fruits: 2,
                vegatables: 3,
                bakery: 2,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                // send the data to the helper function function
                mealName: "brunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            createMealsList24(
              2,
              0.2 * calories,
              proteins,
              fats,
              {
                meat: 3,
                drinks: 2,
                vegatables: 2,
                bakery: 2,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                // send the data to the helper function function
                mealName: "lunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            createMealsList24(
              3,
              0.2 * calories,
              proteins,
              fats,
              {
                meat: 3,
                drinks: 2,
                vegatables: 2,
                bakery: 1,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                // send the data to the helper function function
                mealName: "dinner",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            setMeals(mealsArr);
          })
          .then(() => {
            // console.log(meals);
          });

        break;

      case "gain":
        calories = calories * 1.2;
        var fats = 1 * +user.login.weight * 0.25;
        createMealsList24(
          0,
          0.27 * calories,
          proteins,
          fats,
          {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          },
          user
        )
          .then((data) => {
            mealsArr.push({
              mealName: "breakfast",
              Date: date,
              UserId: user.login.userId,
              ItemsList: data,
              eaten: false,
            });
          })
          .then(() => {
            createMealsList24(
              1,
              0.2 * calories,
              proteins,
              fats,
              {
                dairy: 3,
                drinks: 1,
                fruits: 2,
                vegatables: 3,
                bakery: 2,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "brunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            createMealsList24(
              2,
              0.19 * calories,
              proteins,
              fats,
              {
                meat: 3,
                drinks: 1,
                vegatables: 3,
                "sea food": 1,
                bakery: 2,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "lunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            createMealsList24(
              3,
              0.3 * calories,
              proteins,
              fats,
              {
                meat: 2,
                drinks: 1,
                fruits: 2,
                vegatables: 3,
                "sea food": 1,
                bakery: 2,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "dinner",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            setMeals(mealsArr);
          })
          .then(() => {
            // console.log(meals);
          });
        break;

      case "healthy":
        calories = calories * 1;
        var fats = 0.85 * +user.login.weight * 0.25;

        createMealsList24(
          0,
          0.28 * calories,
          proteins,
          fats,
          {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          },
          user
        )
          .then((data) => {
            mealsArr.push({
              mealName: "breakfast",
              Date: date,
              UserId: user.login.userId,
              ItemsList: data,
              eaten: false,
            });
          })
          .then(() => {
            createMealsList24(
              1,
              0.2 * calories,
              proteins,
              fats,
              {
                dairy: 3,
                drinks: 1,
                fruits: 3,
                vegatables: 2,
                bakery: 2,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "brunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            createMealsList24(
              2,
              0.29 * calories,
              proteins,
              fats,
              {
                meat: 2,
                drinks: 2,
                vegatables: 3,
                "sea food": 1,
                bakery: 1,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "lunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            createMealsList24(
              3,
              0.23 * calories,
              proteins,
              fats,
              {
                meat: 3,
                drinks: 1,
                fruits: 1,
                vegatables: 3,
                "sea food": 1,
                bakery: 1,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "dinner",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            setMeals(mealsArr);
          })
          .then(() => {
            // console.log(meals);
          });
        break;
      default:
        calories = calories * 1;
        var fats = 0.85 * +user.login.weight * 0.25;

        createMealsList24(
          0,
          0.28 * calories,
          proteins,
          fats,
          {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          },
          user
        )
          .then((data) => {
            mealsArr.push({
              mealName: "breakfast",
              Date: date,
              UserId: user.login.userId,
              ItemsList: data,
              eaten: false,
            });
          })
          .then(() => {
            createMealsList24(
              1,
              0.2 * calories,
              proteins,
              fats,
              {
                dairy: 3,
                drinks: 1,
                fruits: 3,
                vegatables: 2,
                bakery: 2,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "brunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            createMealsList24(
              2,
              0.29 * calories,
              proteins,
              fats,
              {
                meat: 2,
                drinks: 2,
                vegatables: 3,
                "sea food": 1,
                bakery: 1,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "lunch",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
                UserId: user.login.userId,
              });
            });
          })
          .then(() => {
            createMealsList24(
              3,
              0.23 * calories,
              proteins,
              fats,
              {
                meat: 3,
                drinks: 1,
                fruits: 1,
                vegatables: 3,
                "sea food": 1,
                bakery: 1,
                seeds: 1,
              },
              user
            ).then((data) => {
              mealsArr.push({
                mealName: "dinner",
                Date: date,
                UserId: user.login.userId,
                ItemsList: data,
                eaten: false,
              });
            });
          })
          .then(() => {
            setMeals(mealsArr);
          })
          .then(() => {
            // console.log(meals);
          });
        break;
    }
  };

  // 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  const registerBackgroundFetchAsync24Medicine = async () => {
    // checkStatusAsync();
    return BackgroundFetch.registerTaskAsync(
      BACKGROUND_FETCH_TASK_24_MEDICINE,
      {
        minimumInterval: 60, // 1 min
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
      }
    );
  };
  const registerBackgroundFetchAsync24Drink = async () => {
    // checkStatusAsync();
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK_24_DRINK, {
      minimumInterval: 60 * 60 * 2, // 2 hours
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  };
  const registerBackgroundFetchAsync24FetchData = async () => {
    // checkStatusAsync();
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK_24_FETCH, {
      minimumInterval: 60 * 60, // 1 hours
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

  // const checkStatusAsync = async () => {
  //   // const status = await BackgroundFetch.getStatusAsync();
  //   console.log(await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK));
  // };

  const sendPushNotification = async (expoPushToken, body) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "RunX",
      body: body,
      data: { someData: null },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
  TaskManager.defineTask(BACKGROUND_FETCH_TASK_24_MEDICINE, async () => {
    console.log("medicine bg worked");
    user.meds.list.map((e) => {
      e.times.map((p) => {
        let time = new Date();
        console.log(time);
        // console.log(
        //   p.time.substring(11, 13),
        //   String(time.getHours() < 9 ? time.getHours() + "0" : time.getHours()),
        //   p.time.substring(14, 16),
        //   String(
        //     time.getMinutes() < 9 ? time.getMinutes() + "0" : time.getMinutes()
        //   )
        // );
        if (
          p.time.substring(11, 13) ===
            String(
              time.getHours() < 9 ? time.getHours() + "0" : time.getHours()
            ) &&
          p.time.substring(14, 16) ===
            String(
              time.getMinutes() < 9
                ? time.getMinutes() + "0"
                : time.getMinutes()
            )
        ) {
          sendPushNotification(
            user.notifications.token,
            `its time to take your medicine ${e.name} , Amount : ${e.amount}`
          );
        }
      });
    });
  });

  TaskManager.defineTask(BACKGROUND_FETCH_TASK_24_DRINK, async () => {
    console.log("drink bg worked");
    if (
      user.drinks.done < user.drinks.goal &&
      user.notifications.accepted === true
    ) {
      sendPushNotification(
        user.notifications.token,
        "you only drank " + user.drinks.done + " Cups Keep Going !"
      );
    }
  });

  TaskManager.defineTask(BACKGROUND_FETCH_TASK_24_FETCH, async () => {
    console.log("fetch 24 bg worked");
    if (date.getHours() === 0) {
      console.log("new data");

      axios
        .post(
          "http://proj17.ruppin-tech.co.il/api/updatedata/update24dailySteps",
          {
            Date: date,
            Done: 0,
            Goal: user.Steps.goal,
            UserId: user.login.userId,
          }
        )
        .then(() => {
          axios
            .post(
              "http://proj17.ruppin-tech.co.il/api/updatedata/update24dailyWaterCups",
              {
                Date: date,
                Done: 0,
                Goal: user.drinks.goal,
                UserId: user.login.userId,
              }
            )
            .catch((e) => console.log("2", e.message));
        })
        .then(() => {
          axios
            .post(
              "http://proj17.ruppin-tech.co.il/api/updatedata/update24Sleeps",
              {
                Date: date,
                Done: 0,
                Goal: user.sleeps.goal,
                UserId: user.login.userId,
              }
            )
            .catch((e) => console.log("3", e.message));
        })
        .then(() => {
          axios
            .post(
              "http://proj17.ruppin-tech.co.il/api/updatedata/update24KcalDaily",
              {
                Date: date,
                Done: 0,
                Goal: user.kCal.goal,
                UserId: user.login.userId,
              }
            )
            .catch((e) => console.log("4", e.message));
        })
        .then(async () => {
          console.log(meals);
          await axios
            .post(
              "http://proj17.ruppin-tech.co.il/api/updatedata/update24meals",
              meals
            )
            .catch((e) => console.log("5", e.message));
        });
    } else {
      console.log("not yet");
    }
    return "done task";
  });
  return <View></View>;
}
