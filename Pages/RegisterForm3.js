import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BarOfFoodChoose from "../components/BarOfFoodChoose";
import Icon from "react-native-vector-icons/Ionicons";
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
  const [foodData, setFoodData] = useState([]);
  const [text, setText] = useState("");
  //useEffect
  useEffect(() => {
    fetch(
      "http://proj17.ruppin-tech.co.il/api/Items" /*"http://proj17.ruppin-tech.co.il/api/Items"*/
    )
      .then((r) => r.json())
      .then((data) => {
        var d = data.map((e) => (e = { ...e, selected: false }));
        setMainData(d);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    search();
  }, [text]);

  useEffect(() => {
    let arr = [];
    mainData
      .filter((item) => item.kind === kinds[placeKind])
      .map((e) => {
        arr.push(e);
      });
    setFoodData(arr);
    search();
  }, [mainData]);

  useEffect(() => {
    scroll_Ref.current?.scrollTo({ x: 0, y: 0, animated: true });
    search();
  }, [placeKind]);

  //goBack const
  const goBk = () => {
    if (placeKind > 0) setPlaceKind(placeKind - 1);
    else {
      navigation.goBack();
    }
  };

  // functions
  const formatDateToday = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-").toString() + "T16:53:06.750";
  };

  const getAllSelected = () => {
    var newData = mainData.filter((e) => e.selected === true).map((e) => e.id);
    return newData;
  };
  const getAllSelectedIds = () => {
    let arrIds = [];
    getAllSelected().forEach((e) => {
      arrIds.push({ foodId: e });
    });
    return arrIds;
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

  const search = () => {
    let arr = [];
    mainData
      .filter((item) => item.kind === kinds[placeKind])
      .forEach((e) => {
        if (e.name.toLowerCase().includes(text && text.toLowerCase())) {
          arr.push(e);
        }
      });
    setFoodData(arr);
  };

  const createMeals = () => {
    let currentYear = new Date();
    let ageCalc =
      currentYear.getFullYear() - String(data.DateOfBirth).substr(0, 4);
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
    /**
 * "meat",
    "fruits",
    "vegatables" ,,'snacks',
    "drinks",
    "sea food",
    "bakery",
    "seeds",
    "dairy",
 */
    switch (data.Goal) {
      case "lose":
        calories = calories * 0.71;
        var fats = 0.7 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.17 * calories, proteins, fats, {
            dairy: 2,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.14 * calories, proteins, fats, {
            dairy: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 2,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.2 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            vegatables: 3,
            bakery: 1,
            seeds: 3,
          }),
        });
        mealsArr.push({
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.2 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
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
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.27 * calories, proteins, fats, {
            dairy: 2,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.2 * calories, proteins, fats, {
            dairy: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 2,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.19 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            vegatables: 3,
            bakery: 1,
            seeds: 3,
          }),
        });
        mealsArr.push({
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.3 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
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
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.28 * calories, proteins, fats, {
            dairy: 2,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.2 * calories, proteins, fats, {
            dairy: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 2,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.29 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            vegatables: 3,
            bakery: 1,
            seeds: 3,
          }),
        });
        mealsArr.push({
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.23 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
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
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.28 * calories, proteins, fats, {
            dairy: 2,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.2 * calories, proteins, fats, {
            dairy: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 2,
            seeds: 1,
          }),
        });
        mealsArr.push({
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.29 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            vegatables: 3,
            bakery: 1,
            seeds: 3,
          }),
        });
        mealsArr.push({
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.23 * calories, proteins, fats, {
            meat: 1,
            drinks: 1,
            fruits: 1,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
        });
        break;
    }
    return mealsArr;
  };

  const createMealsList = (mealId, cal, proteins, fats, kindsAmount) => {
    //[5,1,5,8,6]
    //[{items}]
    let thisKindsAmounts = {
      meat: 0,
      fruits: 0,
      vegatables: 0,
      drinks: 0,
      "sea food": 0,
      bakery: 0,
      seeds: 0,
      dairy: 0,
    };
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

        /*if () {
          thisKindsAmounts[mainItem.kind] += 1;
        } else flag = false;*/

        if (flag === false) return;
        //תנאי עצירה 2
        if (
          totalCal + mainItem.kCal <= cal &&
          totalProtein + mainItem.protein <= proteins &&
          totalFats + mainItem.fats <= fats &&
          thisKindsAmounts[mainItem.kind] + 1 <= kindsAmount[mainItem.kind]
        ) {
          totalCal += mainItem.kCal;
          totalProtein += mainItem.protein;
          totalFats += mainItem.fats;
          newMeal.push({ foodId: mainItem.id });
          flagLoop = true;
          thisKindsAmounts[mainItem.kind] += 1;
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
          currentYear.getFullYear() - String(data.DateOfBirth).substr(0, 4);
        let calcInfo = {
          ChoosenFood: getAllSelectedIds(),
          Meds: [],
          DailyWaterCups: [
            {
              Goal: parseInt(data.Weights[0].CurrentWeight * 0.2061538461538),
              Done: 0,
              Date: formatDateToday(),
            },
          ],
          DailyProtein: [
            {
              Goal: +data.Weights[0].CurrentWeight * 2.1,
              Done: 0,
              Date: formatDateToday(),
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
              Date: formatDateToday(),
            },
          ],
          DailySteps: [{ Goal: steps, Done: 0, Date: formatDateToday() }],
          Sleeps: [{ Goal: 8, Done: 0, Date: formatDateToday() }],
          Meals: createMeals(),
        };
        let lastData = { ...data, ...calcInfo };

        try {
          fetch(
            /*"http://proj17.ruppin-tech.co.il*/ "http://proj17.ruppin-tech.co.il/api/user/create",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(lastData),
            }
          )
            .then((r) => {
              r.json();
            })
            .then((data) => {
              if (data === undefined) navigation.navigate("loginPage");
              if (data === true) {
                //go to dashboard and add auto login for user
                //lastData
                try {
                  fetch(
                    "http://proj17.ruppin-tech.co.il/api/token/Authenticate",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        Email: lastData.Email.toLowerCase(),
                        Password: lastData.Password,
                      }),
                    }
                  )
                    .then((r) => r.text())
                    .then((token) => {
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
      } else {
        let upOne = placeKind + 1;
        if (upOne === kinds.length - 1) setButtonText("Confirm");
        setText("");
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
          alignItems: Platform.OS === "ios" ? "center" : "flex-start",
          marginTop: Platform.OS === "ios" ? 25 : 0,
        }}
      >
        <Image
          source={require("../assets/logoNBG.png")}
          style={{ width: 140, height: 60 }}
        />
      </View>
      <Animatable.View style={styles.viewShow} animation={"fadeInUp"}>
        <TittleBarAndArrow
          goBk={() => navigation.goBack()}
          iconName="arrow-left"
          iconSize={40}
          text={"Choose Your Food"}
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
        <View>
          {/* ios-search-sharp */}

          <View style={{ position: "relative" }}>
            {placeKind > 0 ? (
              <TouchableOpacity
                style={[styles.ButtonStyle_Next, { left: 8, top: 55 }]}
                disabled={loading}
                onPress={() => {
                  //save data go next page
                  goBk();
                }}
              >
                <Text
                  style={{
                    color: "#D5DDDC",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Prev
                </Text>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            <TouchableOpacity
              style={[styles.ButtonStyle_Next, { right: 8, top: 55 }]}
              disabled={loading}
              onPress={() => {
                //save data go next page
                OnSelectSaveData();
              }}
            >
              <Text
                style={{ color: "#D5DDDC", fontSize: 13, textAlign: "center" }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#364057"
            onChangeText={setText}
            value={text}
            placeholder="Search..."
          />
        </View>
        <Text
          style={{
            color: "#CCCCCC",
            fontSize: 20,
            marginTop: 8,
            textAlign: "left",
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          {kinds[placeKind]}
        </Text>

        <View>
          <ScrollView
            ref={scroll_Ref}
            style={{
              width: "97%",
              alignSelf: "center",
              height: "67%",
              marginTop: 10,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              paddingBottom: 5,
            }}
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
            ) : foodData.length > 0 ? (
              foodData &&
              foodData.map((e, index) => {
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
            ) : (
              <View>
                <Image
                  source={require("../assets/notFoundX.gif")}
                  style={{ width: 85, height: 85, alignSelf: "center" }}
                />
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 17,
                    alignSelf: "center",
                  }}
                >
                  Unfortunately The Item Was Not Found
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
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
    height: 45,
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
    height: "93%",
    position: "relative",
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
    padding: 5,
    justifyContent: "center",
    width: "13%",
    backgroundColor: "#344148",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    position: "absolute",
  },
});
