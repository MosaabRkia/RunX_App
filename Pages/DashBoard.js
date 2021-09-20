import { LinearGradient } from 'expo-linear-gradient'
import React,{useState} from 'react'
import { StyleSheet, View } from 'react-native'
import BarDashBoard from '../components/BarDashBoard'
import ProgressBar from '../components/ProgressBar'

export default function DashBoard(props) {
    const arr = [
        {title:'Drink',units:'Cups',value:36,
        description:"To maintain a high level of health , drinking water is essential for optimal health. Proper hydration prevents constipation, mood swings, kidney stones, and overheating "}
        ,{title:'Food',units:'Cal',value:1000,
        description:"A  healthy diet rich in fruits, vegetables, whole grains and low-fat dairy can help to reduce your risk of heart disease by maintaining blood pressure and cholesterol levels"}
        ,{title:'Sleep',units:'Hrs',value:10,
        description:"Most adults need 7 or more hours of good-quality sleep on a regular schedule each night. Getting enough sleep isnt only about total hours of sleep. Its also important to get good quality sleep on a regular schedule so you feel rested when you wake up"}
        ,{title:'Sport',units:'Km',value:10,
        description:"Keeping active through physical activity and sport has many benefits for the body. Some of these benefits include increased cardiovascular fitness, bone health, decreased risk of obesity, improved sleep, and better coordination and balance        "}
    ]
    return (
        <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>
           <BarDashBoard icon={'text'} />
                {
                    arr.map((item,index)=>{
                        return <ProgressBar item={item} index={index} />  
                    })
                }
           
           
          
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }})
