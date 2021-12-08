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
  STEPS_ACTION_UPDATE,
  SLEEPS_ACTION_UPDATE,
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
          listDrinks: [],
        },
        login: {
          token: null,
          error: "",
          data: null,
          firstName: "",
          weight: 0,
        },
        weight: {
          listWeights: [],
        },
        sleeps: {
          done: 0,
          error: "",
          goal: 0,
          id: "",
          listSleeps: [],
        },
        kCal: {
          done: 0,
          error: "",
          goal: 0,
          id: "",
          listKcals: [],
        },
        Steps: {
          done: 0,
          error: "",
          goal: 0,
          id: "",
          listSteps: [],
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
        notifications: null,
      };
    case STEPS_ACTION_UPDATE:
      return {
        ...state,
        Steps: { ...state.Steps, done: action.payload.newSteps },
      };

    case SLEEPS_ACTION_UPDATE:
      let hours = action.payload.newSleepRecord / 60 / 60;
      return {
        ...state,
        sleeps: { ...state.sleeps, done: hours },
      };

    case FETCH_DATA_SUCCESS:
      let todayData = {
        meals: {
          breakfast: null,
          brunch: null,
          dinner: null,
          lunch: null,
        },
        drinks: {},
        kCals: {},
        sleeps: {},
        steps: {},
        weights: {},
      };
      let date = new Date();
      let dateString = `${date.getFullYear()}-${
        date.getMonth() === 12 ? "01" : date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;

      //sleep
      let sleepArr = [];
      action.payload.data[0].sleeps.forEach((e) => {
        if (e.date.substr(0, 10) === dateString)
          todayData = {
            ...todayData,
            sleeps: { done: e.done, date: e.date, goal: e.goal, id: e.id },
          };
        sleepArr = [...sleepArr, { done: e.done, date: e.date }];
      });

      // meal
      let arrMeals = { breakfast: {}, brunch: {}, lunch: {}, dinner: {} };
      action.payload.data[0].meals.forEach((e) => {
        if (e.date.substr(0, 10) === dateString) {
          todayData = {
            ...todayData,
            meals: {
              ...todayData.meals,
              [e.mealName]: {
                eaten: e.eaten,
                date: e.date,
                itemsList: e.itemsList,
                id: e.id,
              },
            },
          };
        }

        arrMeals = { ...arrMeals, [e.mealName]: e };
      });

      //weights
      let year = 0,
        month = 0,
        day = 0,
        weightArr = [];

      action.payload.data[0].weights.forEach((e) => {
        weightArr = [...weightArr, { weight: e.currentWeight, date: e.date }];
        //add func get last date

        if (
          +e.date.substr(0, 4) >= year &&
          +e.date.substr(5, 2) >= month &&
          +e.date.substr(8, 2) >= day
        )
          todayData = { ...todayData, weights: e };
      });

      //steps
      let stepArr = [];
      action.payload.data[0].dailySteps.forEach((e) => {
        if (e.date.substr(0, 10) === dateString) {
          todayData = {
            ...todayData,
            steps: { done: e.done, date: e.date, goal: e.goal, id: e.id },
          };
        }

        stepArr = [...stepArr, { done: e.done, date: e.date }];
      });

      //drink
      let drinksArr = [];
      action.payload.data[0].dailyWaterCups.forEach((e) => {
        if (e.date.substr(0, 10) === dateString) {
          todayData = {
            ...todayData,
            drinks: { done: e.done, date: e.date, goal: e.goal, id: e.id },
          };
        }

        drinksArr = [...drinksArr, { done: e.done, date: e.date }];
      });

      //kCal
      let kcalArr = [];
      action.payload.data[0].kCalDaily.forEach((e) => {
        if (e.date.substr(0, 10) === dateString) {
          todayData = {
            ...todayData,
            kCals: { done: e.done, date: e.date, goal: e.goal, id: e.id },
          };
        }

        kcalArr = [...kcalArr, { done: e.done, date: e.date }];
      });
      console.log(todayData);
      return {
        ...state,
        weights: { ...state.weight, listWeights: weightArr },
        login: {
          ...state.login,
          weight: todayData.weights.currentWeight,
          height: action.payload.data[0].heights[0].currentHeight,
          firstName: action.payload.data[0].firstName,
          data: action.payload.data[0],
          error: "",
          userId: action.payload.data[0].id,
          dateOfBirth: action.payload.data[0].dateOfBirth,
          gender: action.payload.data[0].gender,
          goal: action.payload.data[0].goal,
        },

        drinks: {
          done: todayData.drinks.done,
          goal: todayData.drinks.goal,
          id: todayData.drinks.id,
          listDrinks: drinksArr,
        },
        sleeps: {
          done: todayData.sleeps.done,
          goal: todayData.sleeps.goal,
          id: todayData.sleeps.id,
          listSleeps: sleepArr,
        },
        kCal: {
          done: todayData.kCals.done,
          goal: todayData.kCals.goal,
          id: todayData.kCals.id,
          listKcals: kcalArr,
        },
        Steps: {
          done: todayData.steps.done,
          goal: todayData.steps.goal,
          id: todayData.steps.id,
          listSteps: sleepArr,
        },
        meals: {
          breakfast: todayData.meals.breakfast,
          brunch: todayData.meals.brunch,
          lunch: todayData.meals.lunch,
          dinner: todayData.meals.dinner,
        },
        meds: {
          list: action.payload.data[0].meds,
        },
        notifications: action.payload.data[0].notifications,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        login: { error: action.payload.error },
      };
    //medicine
    case USER_MEDICINE_ADD:
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
      var filter = state.meds.list.filter((e) => {
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
