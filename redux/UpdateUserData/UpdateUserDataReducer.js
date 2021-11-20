import {
  FETCH_DATA_FAILURE,
  USER_UP_DRINKS,
  USER_DOWN_DRINKS,
  FETCH_DATA_SUCCESS,
  LOAD_DRINKS_DATA,
} from "../actionsTypes";
import initalState from "../initialState";

const UserDataReducer = (state = initalState, action) => {
  console.log("here ", state);
  //login actions
  switch (action.type) {
    case LOAD_DRINKS_DATA:
      return {
        ...state,
        drinks: {
          drank:
            state.data[0].dailyWaterCups[
              state.data[0].dailyWaterCups.length - 1
            ].done,
          total:
            state.data[0].dailyWaterCups[
              state.data[0].dailyWaterCups.length - 1
            ].goal,
        },
      };
    case USER_UP_DRINKS:
      return {
        ...state,
        loading: true,
      };
    case USER_DOWN_DRINKS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default UserDataReducer;
