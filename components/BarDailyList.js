import React,{useState} from 'react'
import { View ,Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function BarDailyList(props) {

    const [check,setCheck] = useState(false)
    console.log(props.title)
    return (
       <View style={styles.text}>
           <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>{props.title}</Text>
           <Icon
           style={[styles.icon,{backgroundColor:check?'green':'red'}]}
           onPress={()=>setCheck(!check)}
           name={check?'checkcircle':'minuscircle'}
           color={'white'}
           size={35}
           />
           {/* fix onpress send data and go to page */}
                    <Icon
                    onPress={()=>props.navTo()}
            style={[styles.icon,{backgroundColor:'black'}]}
           name={'exclamationcircle'}
           color={'white'}
           size={35}
           />
            
            
       </View>
    )
}

const styles = StyleSheet.create({
    text:{borderBottomWidth:1,height:0.1*windowHeight,width:0.8*windowWidth,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',padding:10}
    ,icon:{
        alignSelf:'center',
        borderRadius:20
    }
})