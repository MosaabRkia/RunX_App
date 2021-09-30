import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ScrollView, View } from 'react-native'
import BarMedicine from '../components/BarMedicine'
import TittleBarAndArrow from '../components/TittleBarAndArrow'

export default function MedicineList(props) {
   const data =[
      {name:'acamol' ,amount:5 ,times:['11:10','11:02','11:00','11:00'] },
      {name:'optalgin' ,amount:5 ,times:['22:10','22:02','22:00','22:00'] },
      {name:'yh nothing' ,amount:5 ,times:['00:10','00:02','00:00','00:00'] }
   ]
    return (
        <LinearGradient style={{flex:1}} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>
          <TittleBarAndArrow
            goBk={()=>props.navigation.goBack()}
            iconName="arrow-left"
            iconSize={40}
            text="Your Medics List"
            />
          <ScrollView style={{alignSelf:'center',marginTop:10}}>
          {data && data.map((e,index)=>{
              return <BarMedicine  key={index} goEditPageMedic={()=>props.navigation.navigate('EditMedicine',{mode:'edit',item:e})} key={index} item={e}/>
          })}
          </ScrollView>
      </LinearGradient>
    )
}
