import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BarOfFoodChoose from "../components/BarOfFoodChoose";
import foodArray from "../ArraysData/foodArray";
import CirclesRegister from "../components/CirclesRegister";
import { useScrollToTop } from "@react-navigation/native";

/*
            //  plan:null,
            // firstName:null,
            // email:null,
            // password:null,
            // birdthday:Date(null),
            // weight:Number(null),
            // height:Number(null),
            // GoalWeight:Number(null),
            // fruits:[x,y,z],
            // vegetables:[x,y,z],
            // meat:[x,y,z],
            snacks:[x,y,z],
            // drinks:[x,y,z],
            // bakery:[x,y,z],
            // dairy:[x,y,z]
            // fish:[x,y,z],
            seeds:[x,y,z]
            way to calc calories , proteins, water 
*/

export default function RegisterForm3({ route, navigation }) {
  const { data } = route.params;

  //useRef
  const scroll_Ref = useRef(null);

  const kinds = [
    "meat",
    "fruits",
    "vegatables" /*,,'snacks'*/,
    "drinks",
    "sea food",
    "bakery",
    "seeds",
    "dairy",
  ];

  //useState
  const [placeKind, setPlaceKind] = useState(0);
  const [mainData, setMainData] = useState([]);
  const [ButtonText, setButtonText] = useState("Next");
  const [loading, setLoading] = useState(true);

  //useEffect
  useEffect(() => {
    //console.log(data);
    fetch("https://localhost:44324/api/Items")
      .then((r) => r.json())
      .then((data) => {
        var d = data.map((e) => (e = { ...e, selected: false }));
        setMainData(d);
      })
      .then(() => {
        console.log("done");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    scroll_Ref.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [placeKind]);

  //goBack const
  const goBk = () => {
    if (placeKind > 0) setPlaceKind(placeKind - 1);
    else {
      navigation.goBack();
    }
  };

  // functions
  const getAllSelected = () => {
    var newData = mainData.filter((e) => e.selected === true).map((e) => e.id);
    return newData;
  };
  //get data

  const addList = (id) => {
    const elementsIndex = mainData.findIndex((e) => e.id === id);
    let newArray = [...mainData];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      selected: !newArray[elementsIndex].selected,
    };
    setMainData(newArray);
  };

  const createMeals = () => {
    let currentYear = new Date();
    let ageCalc = currentYear.getFullYear() - +data.DateOfBirth.substr(0, 4);
    var mealsArr = [];
    var proteins = +data.Weights[0].CurrentWeight * 2.1 * 0.25;
    let calories =
      data.Gender === "male"
        ? +66 +
          6.2 * +data.Weights[0].CurrentWeight +
          12.7 * +data.Heights[0].CurrentHeight -
          6.76 * ageCalc
        : +655.1 +
          4.35 * +data.Weights[0].CurrentWeight +
          4.7 * +data.Heights[0].CurrentHeight -
          4.7 * ageCalc;

    switch (data.Goal) {
      case "lose":
        calories = calories * 0.71;
        var fats = 0.7 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          breakfast: createMealsList(0, 0.17 * calories, proteins, fats),
        });
        mealsArr.push({
          brunch: createMealsList(1, 0.14 * calories, proteins, fats),
        });
        mealsArr.push({
          lunch: createMealsList(2, 0.2 * calories, proteins, fats),
        });
        mealsArr.push({
          dinner: createMealsList(3, 0.2 * calories, proteins, fats),
        });
        /*
         * breakfast 0.17 - 8:00 -- mealId - 0
         * brunch 0.14 - 13:00 -- mealId - 1
         * lunch 0.20 - 16:00 -- mealId - 2
         * dinner 0.20 - 19:00 -- mealId - 3
         */
        break;

      case "gain":
        calories = calories * 1.2;
        var fats = 1 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          breakfast: createMealsList(0, 0.27 * calories, proteins, fats),
        });
        mealsArr.push({
          brunch: createMealsList(1, 0.2 * calories, proteins, fats),
        });
        mealsArr.push({
          lunch: createMealsList(2, 0.19 * calories, proteins, fats),
        });
        mealsArr.push({
          dinner: createMealsList(3, 0.3 * calories, proteins, fats),
        });
        /*
         * breakfast 0.27 - 8:00
         * brunch 0.20 - 13:00
         * lunch 0.19 - 16:00
         * dinner 0.30 - 19:00
         */
        break;

      case "healthy":
        calories = calories * 1;
        var fats = 0.85 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          breakfast: createMealsList(0, 0.28 * calories, proteins, fats),
        });
        mealsArr.push({
          brunch: createMealsList(1, 0.2 * calories, proteins, fats),
        });
        mealsArr.push({
          lunch: createMealsList(2, 0.29 * calories, proteins, fats),
        });
        mealsArr.push({
          dinner: createMealsList(3, 0.23 * calories, proteins, fats),
        });
        /*
         * breakfast 0.28 - 8:00
         * brunch 0.20 - 13:00
         * lunch 0.29 - 16:00
         * dinner 0.23 - 19:00
         */
        break;
      default:
        calories = calories * 1;
        var fats = 0.85 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          breakfast: createMealsList(0, 0.28 * calories, proteins, fats),
        });
        mealsArr.push({
          brunch: createMealsList(1, 0.2 * calories, proteins, fats),
        });
        mealsArr.push({
          lunch: createMealsList(2, 0.29 * calories, proteins, fats),
        });
        mealsArr.push({
          dinner: createMealsList(3, 0.23 * calories, proteins, fats),
        });
        break;
    }
    return mealsArr;
  };

  const createMealsList = (mealId, cal, proteins, fats) => {
    //[5,1,5,8,6]
    //[{items}]
    var newMeal = [];
    var done = false;
    var flag = false;
    var flagLoop = false;
    var numbersRnd = [];
    var totalCal = 0;
    var totalProtein = 0;
    var totalFats = 0;
    var selectedItemsArr = getAllSelected();
    var rnd = Math.floor(Math.random() * selectedItemsArr.length);
    numbersRnd.push(rnd);
    console.log("226 numberRnds => ", numbersRnd);
    do {
      mainData.forEach((mainItem) => {
        //stop the loop faster
        if (flagLoop) return;
        // stop all loop
        if (
          totalCal + 10 >= cal ||
          totalProtein + 1 >= proteins ||
          totalFats + 1 >= fats
        ) {
          flagLoop = true;
          done = true;
          return;
        }

        //reset the flag
        flag = false;

        //תנאי עצירה 1
        if (+mainItem.id === +selectedItemsArr[rnd]) {
          mainItem.mealTimes.forEach((e) => {
            if (+e.mealId === +mealId) {
              flag = true;
              return;
            }
          });
        } else {
          flag = false;
        }

        if (flag === false) return;
        //תנאי עצירה 2
        /*if (
          totalCal + mainItem.kCal > cal ||
          totalProtein + mainItem.protein > proteins ||
          totalFats + mainItem.fats > fats
        ) {
          done = true;
          return;
        }*/
        //added
        if (
          totalCal + mainItem.kCal <= cal &&
          totalProtein + mainItem.protein <= proteins &&
          totalFats + mainItem.fats <= fats
        ) {
          totalCal += mainItem.kCal;
          totalProtein += mainItem.protein;
          totalFats += mainItem.fats;
          newMeal.push(mainItem.id);
          flagLoop = true;
        }
      });

      flagLoop = false;
      if (numbersRnd.length === selectedItemsArr.length) {
        done = true;
      }

      // undefined or number
      // we didnt arrived to all numbers
      if (!done)
        while (
          numbersRnd.includes(rnd) || // if the numbersRnd array includes the random number
          newMeal.includes(selectedItemsArr[rnd].id) // new meal include the selecteditemsarr in place rnd
        )
          rnd = Math.floor(Math.random() * selectedItemsArr.length);

      numbersRnd.push(rnd);
    } while (!done);
    return newMeal;
  };

  //save data
  const OnSelectSaveData = () => {
    try {
      let steps;
      if (data.Goal === "lose") {
        steps = +data.Weights[0].CurrentWeight * 20 + 10000;
      } else if (data.Goal === "gain") {
        steps = +data.Weights[0].CurrentWeight * 20 + 8000;
      } else {
        steps = 8000;
      }
      if (kinds.length - 1 === placeKind) {
        let currentYear = new Date();
        let ageCalc =
          currentYear.getFullYear() - +data.DateOfBirth.substr(0, 4);
        let calcInfo = {
          ChoosenFood: getAllSelected(),
          Meds: [],
          DailyWaterCups: [
            {
              Goal: parseInt(data.Weights[0].CurrentWeight * 0.2061538461538),
              Done: 0,
              Date: currentYear,
            },
          ],
          DailyProtein: [
            {
              Goal: +data.Weights[0].CurrentWeight * 2.1,
              Done: 0,
              Date: currentYear,
            },
          ],
          KCalDaily: [
            {
              Goal:
                data.Gender === "male"
                  ? +66 +
                    6.2 * +data.Weights[0].CurrentWeight +
                    12.7 * +data.Heights[0].CurrentHeight -
                    6.76 * ageCalc
                  : +655.1 +
                    4.35 * +data.Weights[0].CurrentWeight +
                    4.7 * +data.Heights[0].CurrentHeight -
                    4.7 * ageCalc,
              Done: 0,
              Date: currentYear,
            },
          ],
          DailySteps: [{ Goal: steps, Done: 0, Date: currentYear }],
          Sleeps: [{ Goal: 8, Done: 0, Date: currentYear }],
          Meals: [{ Date: Date(), ItemsList: createMeals() }],
        };
        let lastData = { ...data, ...calcInfo };
        console.log(lastData.Meals[0].ItemsList);
        try {
          fetch("https://localhost:44324/api/user/create", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(lastData),
          })
            .then((r) => r.json())
            .then((data) => {
              console.log(data === "added", "=>", data);
              if (data === "added") {
                //go to dashboard and add auto login for user
                //lastData
                try {
                  fetch("https://localhost:44324/api/token/Authenticate", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      Email: lastData.Email.toLowerCase(),
                      Password: lastData.Password,
                    }),
                  })
                    .then((r) => r.text())
                    .then((token) => {
                      console.log(token);
                      if (token === "false") {
                        navigation.navigate("loginPage");
                      } else {
                        AsyncStorage.setItem("token", token);
                        navigation.navigate("HomeDrawer");
                      }
                    });
                } catch (e) {
                  console.log("error => " + e);
                  navigation.navigate("loginPage");
                }
              }
            });
        } catch (error) {
          console.log("error fetch : " + error);
          navigation.navigate("loginPage");
        }
        // console.log(lastData);
      } else {
        let upOne = placeKind + 1;
        if (upOne === kinds.length - 1) setButtonText("Confirm");
        setPlaceKind(upOne);
      }
    } catch (e) {
      console.log("Error => ", e);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <View
        style={{
          width: "100%",
          alignContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Image
          source={require("../assets/logoNBG.png")}
          style={{ width: 140, height: 60 }}
        />
      </View>
      <Animatable.View style={styles.viewShow} animation={"fadeInUp"}>
        <TittleBarAndArrow
          goBk={goBk}
          iconName="arrow-left"
          iconSize={40}
          text={kinds[placeKind]}
        />
        <>
          <CirclesRegister
            width={80}
            amount={4}
            titles={[
              { word: "Goal", fill: true },
              { word: "Info", fill: true },
              { word: "Bmi", fill: true },
              { word: "Food", fill: true },
            ]}
          />
        </>
        <Text
          style={{
            color: "#CCCCCC",
            fontSize: 20,
            marginTop: 15,
            textAlign: "left",
            alignSelf: "center",
          }}
        >
          tell us what you love
        </Text>

        <View>
          <ScrollView
            ref={scroll_Ref}
            style={{
              width: "97%",
              alignSelf: "center",
              height: "70%",
              marginTop: 10,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              paddingBottom: 5,
            }}
            //  onContentSizeChange={(contentWidth, contentHeight)=>{
            //     console.log(contentHeight,contentWidth)
            //     }}
          >
            {loading ? (
              <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{ textAlign: "center" }}
              >
                <Image
                  source={require("../assets/logoOnlyR.png")}
                  style={{ width: 85, height: 85, alignSelf: "center" }}
                />
              </Animatable.View>
            ) : (
              mainData.filter((item) => item.kind === kinds[placeKind]) &&
              mainData
                .filter((item) => item.kind === kinds[placeKind])
                .map((e, index) => {
                  return (
                    <View key={index + 11}>
                      <BarOfFoodChoose
                        kindPlace={placeKind}
                        addList={(e, isSelected) => addList(e, isSelected)}
                        fullFruitObj={e}
                        index={index}
                      />
                    </View>
                  );
                })
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.ButtonStyle_Next}
          disabled={loading}
          onPress={() => {
            //save data go next page
            OnSelectSaveData();
          }}
        >
          <Text style={{ color: "#D5DDDC", fontSize: 13, textAlign: "center" }}>
            {ButtonText}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    width: "80%",
    height: 55,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "#D5DDDC",
    alignSelf: "center",
    borderRadius: 15,
    textAlign: "center",
    borderColor: "#364057",
    borderWidth: 1,
  },
  viewShow: {
    width: "100%",
    height: "85%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#344148",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  ButtonStyle: {
    alignItems: "center",
    margin: "1%",
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#D5DDDC",
    width: "38%",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
  },
  ButtonStyle_Next: {
    alignItems: "center",
    padding: 15,
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#344148",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
  },
});
