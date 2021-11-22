import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../UserData/UserDataActions";
import {
  //USER
  FETCH_DATA_FAILURE,
  USER_UP_DRINKS,
  USER_DOWN_DRINKS,
  LOAD_DRINKS_DATA,
  USER_MEAL_PLUS,
  USER_MEAL_MINUS,
  USER_MEDICINE_ADD,
} from "../actionsTypes";

//Drinks Actions
export const userUpDrinks = (content) => ({
  type: USER_UP_DRINKS,
  payload: {
    content,
  },
});
export const userDownDrinks = (content) => ({
  type: USER_DOWN_DRINKS,
  payload: {
    content,
  },
});
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: {
    error,
  },
});
export const updateDrinkData = () => ({
  type: LOAD_DRINKS_DATA,
  payload: {},
});
//drink water function
export function drinkControl(content) {
  console.log(content);
  return (dispatch) => {
    axios
      .get(
        `http://proj17.ruppin-tech.co.il/api/UpdateData/updateCupsWater/${content.type}/${content.id}`
      )
      .then((res) => {
        console.log(res.data);
        res.data === true
          ? content.type === "plus"
            ? dispatch(userUpDrinks())
            : dispatch(userDownDrinks())
          : dispatch(fetchDataFailure(error.message));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(fetchDataFailure(error.message));
      });
  };
}

//meal action updates
export const userMealUpdatePlus = (content) => ({
  type: USER_MEAL_PLUS,
  payload: {
    kCal: content.kCal,
    mealName: content.mealName,
  },
});
export const userMealUpdateMinus = (content) => ({
  type: USER_MEAL_MINUS,
  payload: {
    kCal: content.kCal,
    mealName: content.mealName,
  },
});
//meal function
export function changeMealStatus(content) {
  console.log(content);
  return (dispatch) => {
    axios
      .get(
        `http://proj17.ruppin-tech.co.il/api/updateData/updateEatenFood/${content.mealId}/${content.kCalId}`
      )
      .then((res) => {
        if (res.data !== -1)
          content.TOF === true
            ? dispatch(
                userMealUpdatePlus({
                  mealName: content.mealName,
                  kCal: res.data,
                })
              )
            : dispatch(
                userMealUpdateMinus({
                  mealName: content.mealName,
                  kCal: res.data,
                })
              );
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
}

//Medicine actions
export const medicineRemove = (content) => ({
  type: USER_MEAL_PLUS,
  payload: {
    id: content,
  },
});
export const medicineAdd = (MedicineObj) => ({
  type: USER_MEDICINE_ADD,
  payload: {
    MedicineObj,
  },
});

//Medicine function
export const medicineEdit = (content) => {
  return (dispatch) => {
    if (content.type === "ADD") {
      fetch("http://proj17.ruppin-tech.co.il/api/updateData/addMedicine", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content.MedicineObj),
      })
        .then((r) => r.json())
        .then((data) => {
          dispatch(medicineAdd(content.MedicineObj));
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else {
      axios
        .get(
          `http://proj17.ruppin-tech.co.il/api/updateData/removeMedicine/${content.id}`
        )
        .then((res) => {
          dispatch(medicineRemove(content.id));
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  };
};

//later
export function sendSignUpUser(userData, votes, fundName, chanel) {
  return (dispatch) => {
    axios
      .post("/new-user/add-user", {
        votes,
        fundName,
        chanel,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      })
      .then((res) => {
        console.log(res.data);
        //dispatch(userSignupSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.message);
        ///dispatch(userLoginFailure(error.message));
      });
  };
}
