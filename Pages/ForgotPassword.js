import React, { useState, useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ForgotPassword({ navigation }) {

    //goBack const
    const goBk = () => navigation.goBack();

    // functions

    //valid email check
    function validateEmail(emailAdress)
    {
      if(emailAdress === null)
      return false;

      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailAdress.match(regexEmail)) {
        return true; 
      } else {
        return false; 
      }
    }

    // states
    const [showPage,setShowPage] = useState(1);


    const OnSelectSaveData = async (selectedGoal) => {
        try {
           
        }
        catch (e) {
          
        }
    }



    return (
        <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>

            <Image
                source={require('../assets/logoNBG.png')}
                style={{ width: 280, height: 150, alignSelf: 'center', position: 'absolute', top: 80 }}
            />

{showPage === 1?
            <Animatable.View style={styles.viewShow} animation={'fadeInUp'} >
                <TittleBarAndArrow
                    goBk={goBk}
                    iconName="arrow-left"
                    iconSize={40}
                    text="Reset Password"
                />
                <KeyboardAwareScrollView>

                <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            value={undefined}
            keyboardType={"email-address"}
            placeholder="Email Address"
            />

<TouchableOpacity 
          style={styles.ButtonStyle_Next}
          onPress={()=>{
            //save data go next page
            if(!validateEmail(email))   { 
                console.log('email problem')
                setShowPage(2)
                return;
            }
            else{
                console.log('current email')
                return;   
            }
           
           
        }} >

              <Text style={{color:'#D5DDDC',fontSize:13,textAlign:'center'}}>Confirm</Text>
          </TouchableOpacity>
                </KeyboardAwareScrollView>

            </Animatable.View >
            :
            <View>
                <Text>test</Text>
            </View>}

        </LinearGradient>

    )
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonStyle_Next:{
        alignItems:'center',
        padding:15,
        justifyContent:'center',
        width:'60%',
        backgroundColor:'#344148',
        marginTop:20,
        alignSelf:'center',
        borderRadius:15,
        borderColor:'white',
        borderWidth:1
    },
    inputStyle: {
        width: '80%',
        height: 55,
        marginBottom: 5,
        marginTop: 55,
        backgroundColor: '#D5DDDC',
        alignSelf: 'center',
        borderRadius: 15,
        textAlign: 'center',
        borderColor: '#364057',
        borderWidth: 1
    },
    viewShow: {
        width: '100%',
        height: "60%",
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#344148",
        borderTopStartRadius: 15,
        borderTopEndRadius: 15
    },
    ButtonStyle: {
        alignItems: 'center',
        padding: 15,
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#D5DDDC',
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1
    }
});