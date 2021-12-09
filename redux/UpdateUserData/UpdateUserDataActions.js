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
  USER_MEDICINE_REMOVE,
  STEPS_ACTION_UPDATE,
  SLEEPS_ACTION_UPDATE,
  USER_UPDATE_WEIGHT,
} from "../actionsTypes";

//steps action updates
export const sleepUpdateAction = (content) => ({
  type: SLEEPS_ACTION_UPDATE,
  payload: {
    newSleepRecord: content,
  },
});

//steps action updates
export const stepsUpdateAction = (content) => ({
  type: STEPS_ACTION_UPDATE,
  payload: {
    newSteps: content,
  },
});

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

//drink water function
export function drinkControl(content) {
  return (dispatch) => {
    axios
      .get(
        `http://proj17.ruppin-tech.co.il/api/UpdateData/updateCupsWater/${content.type}/${content.id}`
      )
      .then((res) => {
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
  type: USER_MEDICINE_REMOVE,
  payload: {
    idToRemove: content,
  },
});

//update weight actions
export const updateWeight = (content) => ({
  type: USER_UPDATE_WEIGHT,
  payload: {
    content,
  },
});

export const medicineAdd = (MedicineObj) => ({
  type: USER_MEDICINE_ADD,
  payload: {
    MedicineObj,
  },
});

//weight function
export const weightUpdate = (content) => {
  return (dispatch) => {
    axios
      .post(
        "http://proj17.ruppin-tech.co.il/api/updateData/updateWeight",
        content
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === true) dispatch(updateWeight(content));
      })
      .catch((err) => console.log(err.message, "153"));
  };
};

//sleeps function
export const sleepUpdate = (content) => {
  //{sleepId:user.sleeps.id,sleepTime:(seconds + (minutes * 60) + (hours * 60 * 60))}
  return (dispatch) => {
    axios
      .get(
        `http://proj17.ruppin-tech.co.il/api/updateData/updateSleeps/${
          content.sleepTime / 60 / 60
        }/${content.sleepId}`
      )
      .then((res) => {
        if (res.data === true) dispatch(sleepUpdateAction(content.sleepTime));
        else console.log("error");
      });
  };
};

//steps function
export const stepsUpdate = (content) => {
  return (dispatch) => {
    axios
      .get(
        `http://proj17.ruppin-tech.co.il/api/updateData/updateSteps/${content.steps}/${content.stepsId}`
      )
      .then((res) => {
        if (res.data === true) dispatch(stepsUpdateAction(content.steps));
        else console.log("error");
      });
  };
};

//Medicine function
export const medicineEdit = (content) => {
  console.log(content);
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
        //dispatch(userSignupSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.message);
        ///dispatch(userLoginFailure(error.message));
      });
  };
}
