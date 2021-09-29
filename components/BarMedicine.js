import React from 'react'
import { FlatList, ScrollView, Text, View ,Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

export default function BarMedicine(props) {
    //dimention
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

            
        

    return (
        <View style={{marginTop:10,backgroundColor:'#B4D1C4',borderWidth:1,borderRadius:10,width:0.9*windowWidth}}> 
            <Text style={{marginLeft:5,fontSize:25,fontWeight:'bold',padding:3}}>{props.item.name}</Text>
        <Text style={{fontSize:15,fontWeight:'bold',padding:3,marginLeft:10}}>
            {props.item.times.length} times a day
        </Text>
        <View style={{position:'absolute',flexDirection:'row',right:0,top:'30%'}}>
          <TouchableOpacity style={{paddingRight:10}}>
              <Icon
              onPress={()=>{props.goEditPageMedic()}}
             name="form"
             color={'black'}
             size={25}
         />  
          </TouchableOpacity>
          
          <TouchableOpacity style={{paddingRight:5}}>
        <Icon
             name="closecircleo"
             color={'black'}
             size={25}
         /> 
          </TouchableOpacity>
        </View>
        

        </View>

    )
}
