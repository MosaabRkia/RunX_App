import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { medicineEdit } from "../redux/UpdateUserData/UpdateUserDataActions";
import { getData } from "../redux/UserData/UserDataActions";

export default function BarMedicine(props) {
  //dimention
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  //redux
  const dispatch = useDispatch();

  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: "#B4D1C4",
        borderWidth: 1,
        borderRadius: 10,
        width: 0.9 * windowWidth,
      }}
    >
      <Text
        style={{ marginLeft: 5, fontSize: 25, fontWeight: "bold", padding: 3 }}
      >
        {props.item.name}
      </Text>
      <Text
        style={{ fontSize: 15, fontWeight: "bold", padding: 3, marginLeft: 10 }}
      >
        {!!props.item.times.length && props.item.times.length} times a day
      </Text>
      <View
        style={{
          position: "absolute",
          top: "10%",
          right: "2%",
        }}
      >
        {loading ? (
          <Image
            source={{
              uri: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
            }}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(medicineEdit({ type: "REMOVE", id: props.item.id }));
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                props.showAlert;
              }, 2 * 1000);
            }}
          >
            <Icon name="closecircleo" color={"black"} size={50} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* <TouchableOpacity style={{paddingRight:10}}>
              <Icon
              onPress={()=>{props.goEditPageMedic()}}
             name="form"
             color={'black'}
             size={25}
         />  
          </TouchableOpacity> */
