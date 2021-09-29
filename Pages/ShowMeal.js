import React from 'react'
import { ScrollView } from 'react-native'

export default function ShowMeal() {

    const today = [
        {name:'ice cream', kind:'dairy', kcal:207 , gram:100 , protein: 3.5 ,fats: 11  ,description: "its composition vitamins A, B, C and D"},

        {name:'whey', kind:'dairy', kcal:26 , gram:100 , protein: 0.9 ,fats: 0.4  ,description: "gain muscle mass and strength"},
        
        {name:'casein', kind:'dairy', kcal:365 , gram:100 , protein:77  ,fats: 1.9  ,description: "boost muscle growth and aid recovery after exercise"},
        
        {name:'egg', kind:'dairy', kcal:155.1 , gram:100 , protein: 13 ,fats: 11  ,description: "rich in the antioxidants lutein and zeaxanthin"}
        ]
    return (
        <ScrollView>
            {today && today.map(e=>{
                return <View>
                    
                </View>
            })}
        </ScrollView>
    )
}
