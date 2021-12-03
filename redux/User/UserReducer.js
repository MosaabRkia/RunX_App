import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  USER_UP_DRINKS,
  USER_DOWN_DRINKS,
  USER_ERROR_DRINKS,
  USER_MEAL_PLUS,
  USER_MEAL_MINUS,
  USER_MEDICINE_ADD,
  USER_MEDICINE_REMOVE,
} from "../actionsTypes";
import initialState from "../initialState";

const UserReducer = (state = initialState, action) => {
  //login actions
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: { ...state.login, token: action.payload.token, error: "" },
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        login: { ...state.login, error: "not correct data" },
      };
    case USER_LOGOUT:
      return {
        drinks: {
          done: 0,
          error: "",
          goal: 0,
          id: "",
        },
        login: {
          token: null,
          error: "",
          data: null,
          firstName: "",
          weight: 0,
        },
        sleeps: {
          done: 0,
          error: "",
          goal: 0,
          id: "",
        },
        kCal: {
          done: 0,
          error: "",
          goal: 0,
          id: "",
        },
        Steps: {
          done: 0,
          error: "",
          goal: 0,
          id: "",
        },
        meals: {
          error: "",
          dinner: [],
          breakfast: [],
          brunch: [],
          launch: [],
        },
        meds: {
          error: "",
          list: [],
        },
        register: {
          error: "",
          success: false,
        },
      };
    case FETCH_DATA_SUCCESS:
      //sleep
      let sleepArr = [];
      action.payload.data[0].sleeps.forEach((e) => {
        sleepArr = [...sleepArr, { done: e.done, date: e.date }];
      });
      // meal
      let arrMeals = { breakfast: {}, brunch: {}, lunch: {}, dinner: {} };
      action.payload.data[0].meals.forEach((e) => {
        arrMeals = { ...arrMeals, [e.mealName]: e };
      });
      //weights
      let weightArr = [];
      action.payload.data[0].weights.forEach((e) => {
        weightArr = [...weightArr, { weight: e.currentWeight, date: e.date }];
      });
      //steps
      let stepArr = [];
      action.payload.data[0].dailySteps.forEach((e) => {
        stepArr = [...stepArr, { done: e.done, date: e.date }];
      });
      //drink
      let drinksArr = [];
      action.payload.data[0].dailyWaterCups.forEach((e) => {
        drinksArr = [...drinksArr, { done: e.done, date: e.date }];
      });

      //kCal
      let kcalArr = [];
      action.payload.data[0].kCalDaily.forEach((e) => {
        kcalArr = [...kcalArr, { done: e.done, date: e.date }];
      });

      return {
        ...state,
        weight: { ...state.weight, listWeights: weightArr },
        login: {
          ...state.login,
          weight: action.payload.data[0].weights[0].currentWeight,
          firstName: action.payload.data[0].firstName,
          data: action.payload.data[0],
          error: "",
        },
        drinks: {
          done: action.payload.data[0].dailyWaterCups[
            action.payload.data[0].dailyWaterCups.length - 1
          ].done,
          goal: action.payload.data[0].dailyWaterCups[
            action.payload.data[0].dailyWaterCups.length - 1
          ].goal,
          id: action.payload.data[0].dailyWaterCups[
            action.payload.data[0].dailyWaterCups.length - 1
          ].id,
          listDrinks: drinksArr,
        },
        sleeps: {
          done: action.payload.data[0].sleeps[
            action.payload.data[0].sleeps.length - 1
          ].done,
          goal: action.payload.data[0].sleeps[
            action.payload.data[0].sleeps.length - 1
          ].goal,
          id: action.payload.data[0].sleeps[
            action.payload.data[0].sleeps.length - 1
          ].id,
          listSleeps: sleepArr,
        },
        kCal: {
          done: action.payload.data[0].kCalDaily[
            action.payload.data[0].kCalDaily.length - 1
          ].done,
          goal: action.payload.data[0].kCalDaily[
            action.payload.data[0].kCalDaily.length - 1
          ].goal,
          id: action.payload.data[0].kCalDaily[
            action.payload.data[0].kCalDaily.length - 1
          ].id,
          listKcals: kcalArr,
        },
        Steps: {
          done: action.payload.data[0].dailySteps[
            action.payload.data[0].dailySteps.length - 1
          ].done,
          goal: action.payload.data[0].dailySteps[
            action.payload.data[0].dailySteps.length - 1
          ].goal,
          id: action.payload.data[0].dailySteps[
            action.payload.data[0].dailySteps.length - 1
          ].id,
          listSteps: sleepArr,
        },
        meals: {
          breakfast: arrMeals.breakfast,
          brunch: arrMeals.brunch,
          lunch: arrMeals.lunch,
          dinner: arrMeals.dinner,
        },
        meds: {
          list: action.payload.data[0].meds,
        },
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        login: { error: action.payload.error },
      };
    //medicine
    case USER_MEDICINE_ADD:
      console.log(action.payload.MedicineObj);
      return {
        ...state,
        meds: {
          list: [
            ...state.meds.list,
            {
              id: 0,
              name: action.payload.MedicineObj.Name,
              amount: action.payload.MedicineObj.Amount,
              times: action.payload.MedicineObj.Times,
            },
          ],
        },
      };
    case USER_MEDICINE_REMOVE:
      console.log(state.meds.list);
      var filter = state.meds.list.filter((e) => {
        console.log(e.id);
        return e.id !== action.payload.idToRemove;
      });
      return {
        ...state,
        meds: { ...state.meds, list: filter },
      };
    //drinks
    case USER_UP_DRINKS:
      return {
        ...state,
        drinks: { ...state.drinks, done: state.drinks.done + 1 },
      };
    case USER_DOWN_DRINKS:
      return {
        ...state,
        drinks: { ...state.drinks, done: state.drinks.done - 1 },
      };
    case USER_ERROR_DRINKS:
      return {
        ...state,
        drinks: { ...state.drinks, error: action.payload.error },
      };
    //meals
    case USER_MEAL_MINUS:
      return {
        ...state,
        meals: {
          ...state.meals,
          [action.payload.mealName]: {
            ...state.meals[action.payload.mealName],
            eaten: false,
          },
        },
        kCal: { ...state.kCal, done: state.kCal.done - action.payload.kCal },
      };
    case USER_MEAL_PLUS:
      return {
        ...state,
        meals: {
          ...state.meals,
          [action.payload.mealName]: {
            ...state.meals[action.payload.mealName],
            eaten: true,
          },
        },
        kCal: { ...state.kCal, done: state.kCal.done + action.payload.kCal },
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        register: { ...state.register, success: true },
      };

    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        register: { success: false, error: "error in register" },
      };
    default:
      return state;
  }
};

export default UserReducer;
