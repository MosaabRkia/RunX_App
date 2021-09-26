import { LinearGradient } from "expo-linear-gradient";
import React, { useState , useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from 'react-native-vector-icons/AntDesign';
import AppButton from "../components/AppButton";

export default function Food() {

    const [eaten ,setEaten] = useState(550)
    const [total ,setTotal] = useState(2000)

    return (
        <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>
            <BarDashBoard funcCall={()=>props.navigation.goBack()} icon={"arrow-left"} />
            <View style={styles.container}>

<AnimatedCircularProgress
  size={250}
  width={25}
  fill={eaten*(100/total)}
  tintColor="#FC7203"
  lineCap="round"
  style={{ margin: 25 , alignSelf:'center' }}
  backgroundColor="#404E62"
>
  {() => (
    <Text style={{ fontWeight: "bold", fontSize: 30 ,textAlign:'center'}}>
      {eaten}/{total} {'\n'} calories
    </Text>
  )}
</AnimatedCircularProgress>

  <View>
      <Text style={{fontSize:60,fontWeight:'bold',alignSelf:'center',color:"#1C2023"}}>FOOD</Text>
  </View>
         
          <View style={{justifyContent:'space-around',alignSelf:'center'}}>
              <View style={{margin:5}}>
                  <AppButton onPress={{}} text={'Today'} color={true}/>
              </View>
          
              <View style={{margin:5}}>
          <AppButton onPress={{}} text={'Edit Favor Foods'} color={false}/>
          </View>

           </View>
</View>
          
</LinearGradient>
);
}

const styles = StyleSheet.create({
container:{
flex:1
}
})
