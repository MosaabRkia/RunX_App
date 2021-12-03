import axios from "axios";
import { getData } from "../UserData/UserDataActions";
import {
  //USER
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_UP_DRINKS,
  USER_DOWN_DRINKS,
  USER_ERROR_DRINKS,
} from "../actionsTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

//USER Actions

// login actions
export const sendLogOutUserAction = () => ({
  type: USER_LOGOUT,
});

export const userLoginSuccess = (content) => ({
  type: USER_LOGIN_SUCCESS,
  payload: {
    token: content,
  },
});

export const userLoginFailure = () => ({
  type: USER_LOGIN_FAILURE,
  payload: {},
});

//drinks update
export const userUpDrinks = () => ({
  type: USER_UP_DRINKS,
  payload: {},
});

export const userDownDrinks = () => ({
  type: USER_DOWN_DRINKS,
  payload: {},
});

export const userErrorDrinks = (content) => ({
  type: USER_ERROR_DRINKS,
  payload: { error: content },
});

//register
export const userRegisterSuccess = () => ({
  type: USER_SIGNUP_SUCCESS,
  payload: {},
});

export const userRegisterFailure = () => ({
  type: USER_SIGNUP_FAILURE,
  payload: {},
});

export const autoLogin = (token) => {
  return (dispatch) => {
    dispatch(userLoginSuccess(token));
    dispatch(getData(token));
  };
};

export const userLogin = (content) => {
  return (dispatch) => {
    axios
      .post("https://localhost:44324/api/token/Authenticate", {
        Email: content.loginEmail.toLowerCase(),
        Password: content.loginPassword,
      })
      .then((res) => {
        if (res.data === false) {
          dispatch(userLoginFailure());
          return;
        } else {
          AsyncStorage.setItem("token", res.data);
          dispatch(userLoginSuccess(res.data));
        }
        dispatch(getData(res.data));
      })
      // .then((token) => {
      //   console.log("2");
      //   console.log(token);
      //   console.log("3");
      //   if (token === false) {
      //     dispatch(userLoginFailure());
      //     return;
      //   } else {
      //     AsyncStorage.setItem("token", token);
      //     dispatch(userLoginSuccess(token));
      //   }
      //   dispatch(getData(token));
      // })
      .catch((error) => {
        console.log(error.message);
        dispatch(userLoginFailure());
      });
  };
};

export const drinksUpdateUser = (content) => {
  return (dispatch) => {
    axios
      .get(
        `https://localhost:44324/api/UpdateData/updateCupsWater/${content.type}/${content.id}`
      )
      .then((res) => {
        if (res.data === true)
          content.type === "plus"
            ? dispatch(userUpDrinks())
            : dispatch(userDownDrinks());
        else dispatch(userErrorDrinks("Error in Fetch"));
      });
  };
};

export function sendRegisterUser(content) {
  console.log(content);
  return (dispatch) => {
    axios
      .post("https://localhost:44324/api/user/create", content)
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          dispatch(userRegisterSuccess());
          return;
        } else {
          dispatch(userRegisterFailure());
          return;
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(userRegisterFailure());
        ///dispatch(error register);
      });
  };
}

export function sendLogOutUser() {
  return (dispatch) => {
    axios
      .post("/user/Logout", {})
      .then((res) => {
        console.log(res.data);
        dispatch(sendLogOutUserAction()); //the server team is
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
