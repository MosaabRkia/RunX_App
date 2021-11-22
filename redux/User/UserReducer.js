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
  LOAD_DRINKS_DATA,
  USER_DOWN_DRINKS,
  USER_ERROR_DRINKS,
  USER_MEAL_PLUS,
  USER_MEAL_MINUS,
  USER_MEDICINE_ADD,
} from "../actionsTypes";
import initialState from "../initialState";

const UserReducer = (state = initialState, action) => {
  //login actions
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: { ...state.login, token: action.payload.token },
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        login: { ...state.login, error: action.payload.error },
      };
    case USER_LOGOUT:
      return {
        ...state,
        login: { error: "", data: null, token: null },
      };
    case FETCH_DATA_SUCCESS:
      let arrMeals = { breakfast: {}, brunch: {}, lunch: {}, dinner: {} };
      action.payload.data[0].meals.forEach((e) => {
        arrMeals = { ...arrMeals, [e.mealName]: e };
      });
      return {
        ...state,
        login: {
          ...state.login,
          weight: action.payload.data[0].weights[0].currentWeight,
          firstName: action.payload.data[0].firstName,
          data: action.payload.data[0],
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

    // case USER_SIGNUP_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case USER_SIGNUP_SUCCESS:
    //   return {
    //     userid: action.payload._id,
    //     userFirstName: action.payload.firstName,
    //     userlastName: action.payload.lastName,
    //     userEmail: action.payload.email,
    //     userPassword: action.payload.password,
    //     userStatus: action.payload.status,
    //     loading: false,
    //     error: "",
    //   };
    // case USER_SIGNUP_FAILURE:
    //   return {
    //     userid: "",
    //     userFirstName: "",
    //     userlastName: "",
    //     userEmail: "",
    //     userPassword: "",
    //     userStatus: "",
    //     loading: false,
    //     error: action.payload.error,
    //   };
    default:
      return state;
  }
};

export default UserReducer;
