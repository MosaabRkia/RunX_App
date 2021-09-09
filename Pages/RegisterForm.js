import React,{useState,useEffect} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import {  StyleSheet, Text, View ,Image ,TouchableOpacity ,TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
            plan:null,
            firstName:null,
            email:null,
            password:null,
            birdthday:Date(null),
            weight:Number(null),
            height:Number(null),
            goalWeight:Number(null),
            fruits:[x,y,z],
            vegetables:[x,y,z],
            meats:[x,y,z],
            snacks:[x,y,z],
            drinks:[x,y,z],
            bakery:[x,y,z]
*/

export default function RegisterForm({navigation}) {
    
    //useState
    const [selectedGoal,setSelectedGoal] = useState(null);

    //useEffect
    useEffect(() => {
        deleteData()
    }, [])

    //goBack const
    const goBk = ()=>navigation.navigate('loginPage');
        
    // functions

    // restore data
        const deleteData=async ()=>{
            await AsyncStorage.getItem('registerData') !== null && AsyncStorage.removeItem('registerData')
        }

    const OnSelectSaveData =async (selectedGoal)=>{
        try {
        await AsyncStorage.setItem('registerData',JSON.stringify({
            plan:selectedGoal
        })).then(async()=>{
            //go to next page
            const data = await AsyncStorage.getItem('registerData')
             console.log(data)

             navigation.navigate('register2');
        })
    }
    catch(e) {
        console.log('Error in line 29 => ',e)
    }
    }
    


    return (
        <LinearGradient style={styles.container} colors={['#92C6BC','#8D9A93', '#536976', '#273035', '#101011']}>
                    <Image
            source={require('../assets/logoNBG.png')}
            style={{width:280,height:150,alignSelf:'center',position:'absolute',top:80}}
           />
 <Animatable.View style={styles.viewShow} animation={'fadeInUp'} >
     <TittleBarAndArrow
     goBk={goBk}
     iconName="arrow-left"
     iconSize={40}
     text="Your Plan"
     />
                <Text style={{color:"#CCCCCC",fontSize:25,marginBottom:15,marginTop:20,alignSelf:'center'}}>what's your goal?</Text>
            <KeyboardAwareScrollView>

          <TouchableOpacity 
          style={styles.ButtonStyle}
          onPress={()=>{
            //   setSelectedGoal('lose')
              OnSelectSaveData('lose')
          }} >
              <Text style={{color:'#364057',fontSize:20,marginBottom:7}}>Lose Weight</Text>
              <Text style={{color:'#364057',fontSize:13,textAlign:'center'}}>it does not matter how slowly you go as long as you do not stop</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.ButtonStyle}
          onPress={()=>{
           // setSelectedGoal('healthy')
            OnSelectSaveData('healthy')
        }} >
              <Text style={{color:'#364057',fontSize:20,marginBottom:7}}>Healthy Weight</Text>
              <Text style={{color:'#364057',fontSize:13,textAlign:'center'}}>a healthy outside starts from inside</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.ButtonStyle}
           onPress={()=>{
            //setSelectedGoal('Gain')
            OnSelectSaveData('Gain')
        }} >
              <Text style={{color:'#364057',fontSize:20,marginBottom:7}}>Gain Weight</Text>
              <Text style={{color:'#364057',fontSize:13,textAlign:'center'}}>A little Progress each day adds up to big results</Text>
          </TouchableOpacity>

        </KeyboardAwareScrollView>



        </Animatable.View >

        </LinearGradient>

    )
}

// styles
const styles = StyleSheet.create({
    container: {
        flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputStyle:{
    width:'80%',
    height:55,
    marginBottom:5,
    marginTop:5,
    backgroundColor:'#D5DDDC',
    alignSelf:'center',
    borderRadius:15,
    textAlign:'center',
    borderColor:'#364057',
    borderWidth:1
},
    viewShow:{
        width:'100%',
        height:"70%",
        position:'absolute',
        bottom:0,
        backgroundColor:"#344148",
        borderTopStartRadius:15,
        borderTopEndRadius:15
    },
    ButtonStyle:{
    alignItems:'center',
    padding:15,
    justifyContent:'center',
    width:'80%',
    backgroundColor:'#D5DDDC',
    marginTop:20,
    alignSelf:'center',
    borderRadius:15,
    borderColor:'white',
    borderWidth:1
}
  });