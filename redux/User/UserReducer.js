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
} from "../actionsTypes";
import initialState from "../initialState";

const UserReducer = (state = initialState, action) => {
  console.log(action.payload);
  //login actions
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: { token: action.payload.token, error: "", data: null },
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        login: { error: action.payload.error, data: null, token: null },
      };
    case USER_LOGOUT:
      return {
        ...state,
        login: { error: "", data: null, token: null },
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        login: { data: action.payload.data[0] },
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
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        login: { error: action.payload.error },
      };

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
