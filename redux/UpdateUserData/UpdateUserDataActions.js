import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../UserData/UserDataActions";
import {
  //USER
  FETCH_DATA_FAILURE,
  USER_UP_DRINKS,
  USER_DOWN_DRINKS,
  LOAD_DRINKS_DATA,
} from "../actionsTypes";

//USER Actions

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

export function drinkControl(content) {
  console.log(content);
  return (dispatch) => {
    axios
      .get(
        `https://localhost:44324/api/UpdateData/updateCupsWater/${content.type}/${content.id}`
      )
      .then((res) => {
        console.log(res.data);
        res.data === true
          ? dispatch(userUpDrinks())
          : dispatch(userDownDrinks());
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(fetchDataFailure(error.message));
      });
  };
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
