import { LinearGradient } from "expo-linear-gradient";
import React, { useState , useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarDashBoard from "../components/BarDashBoard";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import DrawCups from "../components/DrawCups";
import Icon from 'react-native-vector-icons/AntDesign';

export default function Drink() {

    const [drank ,setDrank] = useState(10)
    const [total ,setTotal] = useState(20)

  return (
    <LinearGradient
      style={styles.container}
      colors={["#92C6BC", "#8D9A93", "#536976", "#273035", "#101011"]}
    >
      <BarDashBoard icon={"arrow-left"} />

      <View style={styles.container}>

          <AnimatedCircularProgress
            size={250}
            width={25}
            fill={drank*(100/total)}
            tintColor="#FC7203"
            lineCap="round"
            style={{ margin: 25 , alignSelf:'center' }}
            backgroundColor="#404E62"
          >
            {(fill) => (
              <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                {drank}/{total} {'\n'} Cups
              </Text>
            )}
          </AnimatedCircularProgress>
            <View>
                <Text style={{fontSize:60,fontWeight:'bold',alignSelf:'center',color:"#1C2023"}}>Drink</Text>
            </View>
                    <View style={{flexDirection:'row',alignSelf:'center',flexWrap:'wrap',margin:10,justifyContent:'center'}}>
                       {
                          [...Array(drank)].map(() => ( 
                            <DrawCups done='yes'/>
                            ) 
                        )
                       }

                         {
                          [...Array(total-drank)].map(() => ( 
                            <DrawCups done='no'/>
                            ) 
                        )
                       }
                    </View>
                    <View style={{justifyContent:'space-around',flexDirection:'row',marginTop:10}}>
                    <TouchableOpacity style={{alignSelf:'center'}}
                    onPress={()=>{
                        if(total > drank){
                        let dranks = drank+1
                        setDrank(dranks)    } 
                    }}>
                    
                       <Icon name={'pluscircleo'} size={100} color="#FC7203" />
                       </TouchableOpacity>

                       <TouchableOpacity style={{alignSelf:'center'}}
                    onPress={()=>{
                        if(0 < drank){
                        let dranks = drank-1
                        setDrank(dranks)    } 
                    }}>
                      {/* minuscircleo */}
                       <Icon name={'minuscircleo'} size={100} color="#FC7203" />
                       </TouchableOpacity>
                     </View>
      </View>
                      {/*addddddddddddddddddd keyyyyyyys  */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})