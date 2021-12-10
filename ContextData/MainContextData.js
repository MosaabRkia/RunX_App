import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

export const UserData = React.createContext();
// const drinkInitialState = null;
const MainContextData = ({ navigation }) => {
  const [dataFetch, setDataFetch] = useState({});
  // let user = useSelector((state) => !!state.UserReducer && state.UserReducer);
  // useEffect(() => {}, [dataFetch]);

  return (
    <UserData.Provider value={{ dataFetch, updateData: () => getData() }}>
      {/* {children} */}
    </UserData.Provider>
  );
};

export default MainContextData;
