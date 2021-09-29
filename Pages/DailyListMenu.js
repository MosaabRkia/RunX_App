import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, Dimensions, StyleSheet } from 'react-native'
import BarDailyList from '../components/BarDailyList'
import BarDashBoard from '../components/BarDashBoard'
import TittleBarAndArrow from '../components/TittleBarAndArrow'



const windowWidth = Dimensions.get('window').width;

const meals =['BreakFast','AfterNoon Stack','Lunch','Dinner']

export default function DailyListMenu(props) {



    return (
        <LinearGradient
        style={{flex:1}}
        colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
      >
              <TittleBarAndArrow
     goBk={()=>{props.navigation.goBack()}}
     iconName="arrow-left"
     iconSize={40}
     text="Daily List"
     />
     <Text style={styles.text}>Click The Circle To Swap Eaten / UnEaten</Text>
     {
         meals && meals.map((e,index)=>{
             return <BarDailyList key={index} title={e} navTo={()=>props.navigation.navigate('ShowDailyMeal',{title:e})} />
         })
     }
     
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    text:{marginTop:60,borderBottomWidth:1,width:0.9*windowWidth,alignSelf:'center',color:'white',borderColor:'white',fontWeight:'bold',fontSize:15}
})