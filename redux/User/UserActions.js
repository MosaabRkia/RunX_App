import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../UserData/UserDataActions";
import { updateDrinkData } from "../UpdateUserData/UpdateUserDataActions";
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
} from "../actionsTypes";

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

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: {
    error,
  },
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

//register
export const userSignupRequest = () => ({
  type: USER_SIGNUP_REQUEST,
});

export const userSignupSuccess = (content) => ({
  type: USER_SIGNUP_SUCCESS,
  payload: {
    _id: content._id,
    firstName: content.firstName,
    lastName: content.lastName,
    email: content.email,
    password: content.password,
    status: content.status,
  },
});

export const userSignupFailure = (error) => ({
  type: USER_SIGNUP_FAILURE,
  payload: {
    error,
  },
});

export function userLogin(content) {
  console.log(content);
  return (dispatch) => {
    fetch("https://localhost:44324/api/token/Authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: content.loginEmail.toLowerCase(),
        Password: content.loginPassword,
      }),
    })
      .then((r) => r.json())
      .then((token) => {
        console.log(token);
        if (token === "false") {
          dispatch(userLoginFailure("loginError"));
          return;
        } else {
          console.log(token);
          dispatch(userLoginSuccess(token));
        }
        dispatch(getData(token));
      })
      .then(() => {
        dispatch(updateDrinkData());
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(userLoginFailure(error.message));
      }); //commit 2
  };
}

export const drinksUpdateUser = (content) => {
  return (dispatch) => {
    axios
      .get(
        `https://localhost:44324/api/UpdateData/updateCupsWater/${content.type}/${content.id}`
      )
      .then((res) => {
        console.log(res.data);
        content.type === "plus"
          ? dispatch(userUpDrinks())
          : dispatch(userDownDrinks());
      });
  };
};
/**try {
      fetch("http://proj17.ruppin-tech.co.il/api/token/Authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: loginData.loginEmail.toLowerCase(),
          Password: loginData.loginPassword,
        }),
      })
        .then((r) => r.text())
        .then((token) => {
          if (token === "false") {
            alertError("Email Or Password Isn't Correct");
            return;
          } else {
            AsyncStorage.setItem("token", token);
            navigation.navigate("HomeDrawer");
            setLoginLoading(false);
            setLoginData({ ...loginData, loginPassword: null });
          }
        });
    } catch (e) {
      console.log("error => " + e);
      navigation.navigate("loginPage");
    } */

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
        password: userData.password, //need to be added in page 13
        // fundName: userfundName, //need to be updated in the page 4
        // userchanel: userchanel, //need to be updated in the page 4
        // votes: Votes,
        // newArticle: Article[0],
      })
      .then((res) => {
        console.log(res.data);
        //dispatch(userSignupSuccess(res.data)); //the server team is
      })
      .catch((error) => {
        console.log(error.message);
        ///dispatch(userLoginFailure(error.message));
      }); //commit 2
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