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
  //test arr

  const { data } = route.params;

  //useRef
  const scrollRef = useRef();

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
  const [arr, setArr] = useState([]);
  const [placeKind, setPlaceKind] = useState(0);
  const [mainData, setMainData] = useState([]);
  const [ButtonText, setButtonText] = useState("Next");
  const [loading, setLoading] = useState(true);

  //useEffect
  useEffect(() => {
    fetch("https://localhost:44324/api/Items")
      .then((r) => r.json())
      .then((data) => {
        setMainData(data);
      })
      .then(() => {
        console.log("done");
        setLoading(false);
      });
    return null;
  }, []);

  //goBack const
  const goBk = () => {
    if (placeKind > 0) setPlaceKind(placeKind - 1);
    else {
      navigation.goBack();
    }
  };

  // functions
  //get data

  const addList = (e, isSelected) => {
    // this fix because of the not update fast so it always send the oposite
    isSelected = !isSelected;

    let exists = false;

    arr &&
      arr.forEach((x) => {
        if (e === x.id) {
          exists = true;
        }
      });

    if (isSelected && !exists) {
      setArr([...arr, { foodId: e }]);
    }
    if (!isSelected && exists) {
      let newArr = arr.filter((fruit) => fruit.foodId !== e);
      setArr(newArr);
    }
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
          ChoosenFood: arr,
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
          Meals: [],
        };
        let lastData = { ...data, ...calcInfo };
        console.log(lastData);
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
              console.log(data);
              if (data === true) {
                //go to dashboard and add auto login for user
                navigation.navigate("HomeDrawer");
              }
            });
        } catch (error) {
          console.log("error fetch : " + error);
        }
        // console.log(lastData);
      } else {
        scrollRef.current.scrollTo({
          y: 0,
          animated: true,
        });

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
            ref={scrollRef}
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
