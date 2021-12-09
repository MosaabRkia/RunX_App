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
} from "react-native";
import * as Animatable from "react-native-animatable";
import TittleBarAndArrow from "../components/TittleBarAndArrow";
import BarOfFoodChoose from "../components/BarOfFoodChoose";
import CirclesRegister from "../components/CirclesRegister";
import { useDispatch, useSelector } from "react-redux";
import {
  sendLogOutUserAction,
  sendRegisterUser,
  userLogin,
} from "../redux/User/UserActions";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";

export default function RegisterForm3({ route, navigation }) {
  const { data } = route.params;
  const [age, setAge] = useState(0);
  useEffect(() => {
    let currentYear = new Date(); // create date now
    // get age
    setAge(
      Number(currentYear.getFullYear()) -
        Number(String(data.DateOfBirth).substring(11, 15))
    );
  }, []);
  useEffect(() => {
    console.log("ageee =>", age);
  }, [age]);
  const dispatch = useDispatch();
  let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  //useRef
  const scroll_Ref = useRef(null);

  const kinds = [
    "meat",
    "fruits",
    "vegatables",
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
  const [fetched, setFetched] = useState(false);
  //alert
  const [alert, setAlert] = useState({
    text: "",
    show: false,
  });
  //useEffect
  useEffect(() => {
    axios
      .get("http://proj17.ruppin-tech.co.il/api/items")
      .then((res) => {
        var d = res.data.map((e) => (e = { ...e, selected: false }));
        setMainData(d);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user.register.success === true && fetched === false) {
      setFetched(true);
      dispatch(
        userLogin({
          loginEmail: data.Email,
          loginPassword: data.Password,
        })
      );
      navigation.navigate("HomeDrawer");
    }
    if (
      user.register.success === false &&
      user.register.error === "error in register"
    ) {
      dispatch(sendLogOutUserAction());
      navigation.navigate("loginPage");
    }
  }, [user]);

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
    let currentYear = new Date(); // create date now
    let ageCalc = // get age
      currentYear.getFullYear() - String(data.DateOfBirth).substr(0, 4);
    var mealsArr = []; //empty array that will return the meals array after created
    var proteins = +data.Weights[0].CurrentWeight * 2.1 * 0.25; // protein calculator
    let calories = // calories calculator
      data.Gender === "male"
        ? +66 +
          6.2 * +data.Weights[0].CurrentWeight +
          12.7 * +data.Heights[0].CurrentHeight -
          6.76 * age
        : +655.1 +
          4.35 * +data.Weights[0].CurrentWeight +
          4.7 * +data.Heights[0].CurrentHeight -
          4.7 * age;

    // switch on the goal of client
    switch (data.Goal) {
      case "lose":
        calories = calories * 0.71; // create the appropriate calculation of calories
        var fats = 0.7 * +data.Weights[0].CurrentWeight * 0.25; // create the appropriate calculation of fats
        mealsArr.push({
          // send the data to the helper function function
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.17 * calories, proteins, fats, {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          // send the data to the helper function function
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.14 * calories, proteins, fats, {
            dairy: 1,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 2,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          // send the data to the helper function function
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.2 * calories, proteins, fats, {
            meat: 3,
            drinks: 2,
            vegatables: 2,
            bakery: 2,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          // send the data to the helper function function
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.2 * calories, proteins, fats, {
            meat: 3,
            drinks: 2,
            vegatables: 2,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        break;

      case "gain":
        calories = calories * 1.2;
        var fats = 1 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.27 * calories, proteins, fats, {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.2 * calories, proteins, fats, {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 2,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.19 * calories, proteins, fats, {
            meat: 3,
            drinks: 1,
            vegatables: 3,
            "sea food": 1,
            bakery: 2,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.3 * calories, proteins, fats, {
            meat: 2,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            "sea food": 1,
            bakery: 2,
            seeds: 1,
          }),
          eaten: false,
        });
        break;

      case "healthy":
        calories = calories * 1;
        var fats = 0.85 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.28 * calories, proteins, fats, {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.2 * calories, proteins, fats, {
            dairy: 3,
            drinks: 1,
            fruits: 3,
            vegatables: 2,
            bakery: 2,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.29 * calories, proteins, fats, {
            meat: 2,
            drinks: 2,
            vegatables: 3,
            "sea food": 1,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.23 * calories, proteins, fats, {
            meat: 3,
            drinks: 1,
            fruits: 1,
            vegatables: 3,
            "sea food": 1,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });

        break;
      default:
        calories = calories * 1;
        var fats = 0.85 * +data.Weights[0].CurrentWeight * 0.25;
        mealsArr.push({
          mealName: "breakfast",
          Date: formatDateToday(),
          ItemsList: createMealsList(0, 0.28 * calories, proteins, fats, {
            dairy: 3,
            drinks: 1,
            fruits: 2,
            vegatables: 3,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "brunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(1, 0.2 * calories, proteins, fats, {
            dairy: 3,
            drinks: 1,
            fruits: 3,
            vegatables: 2,
            bakery: 2,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "lunch",
          Date: formatDateToday(),
          ItemsList: createMealsList(2, 0.29 * calories, proteins, fats, {
            meat: 2,
            drinks: 2,
            vegatables: 3,
            "sea food": 1,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        mealsArr.push({
          mealName: "dinner",
          Date: formatDateToday(),
          ItemsList: createMealsList(3, 0.23 * calories, proteins, fats, {
            meat: 3,
            drinks: 1,
            fruits: 1,
            vegatables: 3,
            "sea food": 1,
            bakery: 1,
            seeds: 1,
          }),
          eaten: false,
        });
        break;
    }
    return mealsArr;
  };
  const createMealsList = (mealId, cal, proteins, fats, kindsAmount) => {
    let thisKindsAmounts = {
      // counter for all kinds to know when stop
      meat: 0,
      fruits: 0,
      vegatables: 0,
      drinks: 0,
      "sea food": 0,
      bakery: 0,
      seeds: 0,
      dairy: 0,
    };
    var newMeal = []; // the value returns the meal
    var done = false;
    var flagLoop = false;
    var flag = false; // flag helper to stop the loop for item
    // var flagLoop = false; // stop varible will stop the loop
    var numbersRnd = []; // array  of numbers done in random to not reply on item 2 times in meal
    var totalCal = 0; // calc of calories total in meal
    var totalProtein = 0; // calc of protein total in meal
    var totalFats = 0; // calc of fats total in meal
    var selectedItemsArr = getAllSelectedIds(); // selected items array what choosen in register
    var rnd = Math.floor(Math.random() * selectedItemsArr.length); // create random number in the selected items to randomly item
    numbersRnd.push(rnd); // push the randomed item to not duplicate the item in the meal
    do {
      mainData.forEach((mainItem) => {
        //stop the loop faster
        if (flagLoop) return;
        // if (flagLoop) return;

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

        //stop condition 1
        if (+mainItem.id === +selectedItemsArr[rnd].foodId) {
          // check if item added before in meal so stop
          mainItem.mealTimes.forEach((e) => {
            if (+e.mealId === +mealId) {
              // check if item kind same of what in the map now
              flag = true;
              return;
            }
          });
        } else {
          // stop at condition 2
          flag = false;
        }

        //stop condition 2
        if (flag === false) return;

        if (
          // if we add all in the calories not up on the meal calories limit and protein and fats so add values
          totalCal + mainItem.kCal <= cal &&
          totalProtein + mainItem.protein <= proteins &&
          totalFats + mainItem.fats <= fats &&
          thisKindsAmounts[mainItem.kind] + 1 <= kindsAmount[mainItem.kind]
        ) {
          totalCal += mainItem.kCal; // add calories
          totalProtein += mainItem.protein; // add protein
          totalFats += mainItem.fats; // add fats
          newMeal.push({ foodId: mainItem.id }); // push meal
          // flagLoop = true;
          thisKindsAmounts[mainItem.kind] += 1; // count +1 in place of kind
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
          numbersRnd.includes(rnd) || // if the numbersRnd array includes the random number (while already added before so rnd new number)
          newMeal.includes(selectedItemsArr[rnd].foodId) // new meal include the selecteditemsarr in place rnd
        )
          rnd = Math.floor(Math.random() * selectedItemsArr.length); // random new number

      numbersRnd.push(rnd); // push the new number
    } while (!done); //while not done means done not true so complete
    console.log(newMeal);
    return newMeal; // return new meal with , {eaten : false }
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
          currentYear.getFullYear() -
          +String(data.DateOfBirth).substring(11, 15);

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
                    6.76 * age
                  : Number(
                      +655.1 +
                        4.35 * +data.Weights[0].CurrentWeight +
                        4.7 * +data.Heights[0].CurrentHeight -
                        4.7 * age
                    ),
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
          if (getAllSelected().length >= 20) {
            console.log("lastttttttttttttdata ", lastData);
            dispatch(sendRegisterUser(lastData));
          } else
            setAlert({
              show: true,
              text: "Please Select At Least 20 Item",
            });
        } catch (error) {
          console.log("error fetch : " + error);
          navigation.navigate("loginPage");
        }
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
                {ButtonText}
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
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        showCancelButton={false}
        title="Register Form"
        titleStyle={{ fontWeight: "bold" }}
        message={alert.text}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmButtonColor="#364057"
        onConfirmPressed={() => {
          setAlert({ ...alert, show: false });
        }}
      />
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
    width: "20%",
    backgroundColor: "#344148",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    position: "absolute",
  },
});
