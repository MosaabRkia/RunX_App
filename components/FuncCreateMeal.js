import axios from "axios";
import { useSelector } from "react-redux";

export const createMealsList24 = async (
  mealId,
  cal,
  proteins,
  fats,
  kindsAmount,
  user
) => {
  let mainData = [],
    selectedItems = [];

  await axios.get("http://proj17.ruppin-tech.co.il/api/items").then((res) => {
    var d = res.data;
    mainData = d;
  });

  //
  await axios
    .get(
      `http://proj17.ruppin-tech.co.il/api/UpdateData/getChoosenFood/${user.login.userId}`
    )
    .then((res) => {
      selectedItems = res.data;
    });

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
  var selectedItemsArr = selectedItems; // selected items array what choosen in register
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
        newMeal.includes((e) => e.id === selectedItemsArr[rnd].foodId) // new meal include the selecteditemsarr in place rnd
      )
        rnd = Math.floor(Math.random() * selectedItemsArr.length); // random new number

    numbersRnd.push(rnd); // push the new number
  } while (!done); //while not done means done not true so complete
  return newMeal; // return new meal with , {eaten : false }
};
