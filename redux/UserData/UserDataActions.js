import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  //USER
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  LOAD_DRINKS_DATA,
} from "../actionsTypes";

export const getDataSuccess = (content) => ({
  type: FETCH_DATA_SUCCESS,
  payload: {
    data: content,
  },
});

export const getDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: {
    error,
  },
});

//dispatch(updateDrinkData());

export function getData(token) {
  console.log(token);
  return (dispatch) => {
    try {
      fetch("https://localhost:44324/api/token/decode", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data === false) dispatch(getDataFailure("error"));
          else {
            console.log(data);
            dispatch(getDataSuccess(data));
            return true;
          }
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(getDataFailure(error.message));
        });
    } catch (e) {
      console.log("error => " + e);
      navigation.navigate("loginPage");
    }
  };
  //commit 2
}

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
