import { LinearGradient } from "expo-linear-gradient";
import React, { useState , useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from 'react-native-vector-icons/AntDesign';
import AppButton from "../components/AppButton";
import MealBar from "../components/MealBar";

export default function userMeals(props) {
    const [eaten ,setEaten] = useState(550)
    const [total ,setTotal] = useState(2000)
    const { title } = props.route.params;

    const BreakFast = [
      
      { items : [
                {name:'ice cream', kind:'dairy', kcal:207 , gram:100 , protein: 3.5 ,fats: 11  ,description: "its composition vitamins A, B, C and D"},
        
                {name:'whey', kind:'dairy', kcal:26 , gram:100 , protein: 0.9 ,fats: 0.4  ,description: "gain muscle mass and strength"},
                
                {name:'casein', kind:'dairy', kcal:365 , gram:100 , protein:77  ,fats: 1.9  ,description: "boost muscle growth and aid recovery after exercise"},
                
                {name:'egg', kind:'dairy', kcal:155.1 , gram:100 , protein: 13 ,fats: 11  ,description: "rich in the antioxidants lutein and zeaxanthin"}
                ]}
              ,
              {items : [
                {name:'ice cream', kind:'dairy', kcal:207 , gram:100 , protein: 3.5 ,fats: 11  ,description: "its composition vitamins A, B, C and D"},
        
                {name:'whey', kind:'dairy', kcal:26 , gram:100 , protein: 0.9 ,fats: 0.4  ,description: "gain muscle mass and strength"},
                
                {name:'casein', kind:'dairy', kcal:365 , gram:100 , protein:77  ,fats: 1.9  ,description: "boost muscle growth and aid recovery after exercise"},
                
                {name:'egg', kind:'dairy', kcal:155.1 , gram:100 , protein: 13 ,fats: 11  ,description: "rich in the antioxidants lutein and zeaxanthin"}
                ]},
               { items : [
                  {name:'ice cream', kind:'dairy', kcal:207 , gram:100 , protein: 3.5 ,fats: 11  ,description: "its composition vitamins A, B, C and D"},
          
                  {name:'whey', kind:'dairy', kcal:26 , gram:100 , protein: 0.9 ,fats: 0.4  ,description: "gain muscle mass and strength"},
                  
                  {name:'casein', kind:'dairy', kcal:365 , gram:100 , protein:77  ,fats: 1.9  ,description: "boost muscle growth and aid recovery after exercise"},
                  
                  {name:'egg', kind:'dairy', kcal:155.1 , gram:100 , protein: 13 ,fats: 11  ,description: "rich in the antioxidants lutein and zeaxanthin"}
                  ]}
          
    ]
    console.log(title)
    return (
        <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>
            <BarDashBoard funcCall={()=>props.navigation.goBack()} icon={"arrow-left"} />
            <View style={styles.container}>


  <View>
      <Text style={{fontSize:60,fontWeight:'bold',alignSelf:'center',color:"#1C2023"}}>{title && title}</Text>
  </View>
         
          <View style={{justifyContent:'space-around',alignSelf:'center'}}>
              <View style={{margin:5}}>
                {
                  BreakFast && BreakFast.map((e,index)=>{
                    console.log(e)
                    return  <MealBar index={index} kindMeal={title} items={e.items}/>
                  })
                }
                
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
