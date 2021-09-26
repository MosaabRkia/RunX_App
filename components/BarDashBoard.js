import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BarDashBoard(props) {
    return (
      
           <View style={styles.container}>
           <TouchableOpacity style={styles.icon} onPress={()=>props.funcCall()}>
           <Icon 
           name={props.icon}
           size={60}
            color="black" />
           </TouchableOpacity>

           <View style={styles.logo}>
           <Image 
            source={require('../assets/logoOnlyR.png')}
            style={{width:60,height:60}}
           />  
            </View>
            </View>
    ) 
}

//styles
 const styles = StyleSheet.create({
     container:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft:5,marginRight:5,marginBottom:5
     },
    icon:{
       
    },
    logo:{
        
    }
 })
