import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { ScrollView,Text } from 'react-native'
import FoodBar from '../components/FoodBar'
import TittleBarAndArrow from '../components/TittleBarAndArrow'

export default function ShowDailyMeal(props) {
    const { title } = props.route.params;
    const [data,setData] = useState([{name:'whey', kind:'dairy', kcal:26 , gram:100 , protein: 0.9 ,fats: 0.4  ,description: "gain muscle mass and strength"},
    
    {name:'casein', kind:'dairy', kcal:365 , gram:100 , protein:77  ,fats: 1.9  ,description: "boost muscle growth and aid recovery after exercise"},
    
    {name:'egg', kind:'dairy', kcal:155.1 , gram:100 , protein: 13 ,fats: 11  ,description: "rich in the antioxidants lutein and zeaxanthin"}
    ])
    return (
        <LinearGradient
        style={{flex:1}}
        colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
      >
          <TittleBarAndArrow
            goBk={()=>{props.navigation.goBack()}}
            iconName="arrow-left"
            iconSize={40}
            text={`DailyList Of ${title}`}
            />
            <ScrollView>
                {data && data.map((e,index)=>{
                    return <FoodBar index={index} key={index} item={e} />
                })}
            </ScrollView>
        </LinearGradient>
    )
}
