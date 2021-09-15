import React,{useState} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import {  StyleSheet, Text, View ,Image ,TouchableOpacity ,TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

export default function RegisterForm1({navigation}) {
    
    //useState
    const [firstName,setFirstName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [curPassword,setCurPassword] = useState(null);
    const [gender,setGender] = useState(null);
    const [showPassword,setShowPassword] = useState(false);
    const [showCurPassword,setShowCurPassword] = useState(false);



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

    //save data
    const OnSelectSaveData =async ()=>{
        try {
            if(firstName === null || firstName.length < 3)
               { 
                console.log('first name problem')
                return;
            }
                if(!validateEmail(email))   { 
                    console.log('email problem')
                    return;
                }
                if(password === null || password.length < 6)  { 
                    console.log('password problem')
                    return;
                }
                if (password !== curPassword)  { 
                    console.log('cur password problem')
                    return;
                } 
                if(gender === null)  { 
                    console.log('gender problem')
                    return;
                }

                    await AsyncStorage.mergeItem('registerData',JSON.stringify({
                        firstName:firstName,
                        email:email,
                        password:password,
                        gender:gender
                    })).then(async()=>{
                        //go to next page
                        const data = await AsyncStorage.getItem('registerData')
                         console.log(data)
                         navigation.navigate('register3')
                         
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
            style={{width:280,height:150,alignSelf:'center',position:'absolute',top:20}}
           />
 <Animatable.View style={styles.viewShow} animation={'fadeInUp'} >
     <TittleBarAndArrow
     goBk={goBk}
     iconName="arrow-left"
     iconSize={40}
     text="Your Info"
     />
                     <Text style={{color:"#CCCCCC",fontSize:40,marginTop:20,alignSelf:'center'}}>HELLO!</Text>
                <Text style={{color:"#CCCCCC",fontSize:25,marginBottom:15,alignSelf:'center'}}>lets start with your basic info</Text>
        <KeyboardAwareScrollView>
        <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onChangeText={setFirstName}
            value={undefined}
            placeholder="First Name"
            />
                        <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onChangeText={setEmail}
            value={undefined}
            placeholder="Email"
            />

            <View>
            <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onChangeText={setPassword}
            value={undefined}
            placeholder="Password"
            secureTextEntry={showPassword?false:true}
            />

        <View style={{position:"absolute",right:'12%',bottom:'20%'}}>
           <TouchableOpacity style={{width:24,height:24}} onPress={() => setShowPassword(!showPassword)}> 
           <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={15}
              color="black"
            />
            </TouchableOpacity>
    
        </View>

            </View>
            <View>
            <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onChangeText={setCurPassword}
            value={undefined}
            placeholder="Current Password"
            secureTextEntry={showCurPassword?false:true}
            />

<View style={{position:"absolute",right:'12%',bottom:'20%'}}>
           <TouchableOpacity style={{width:24,height:24}} onPress={() => setShowCurPassword(!showCurPassword) }> 
           <Icon
              name={showCurPassword ? 'eye-slash' : 'eye'}
              size={15}
              color="black"
            />
            </TouchableOpacity>
           
        </View>
        </View>


        <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-between'}}>
        <TouchableOpacity 
          style={{
            alignItems:'center',
            margin:'1%',
            padding:15,
            justifyContent:'center',
            backgroundColor: gender && gender === 'male' ? '#364057':'#D5DDDC',
            width:'38%',
            marginTop:20,
            alignSelf:'center',
            borderRadius:15,
            borderColor:'white',
            borderWidth:1
          }}
          onPress={()=>{
            setGender('male')
        }} >
              <Text style={{color: gender && gender === 'male' ? '#D5DDDC':'#364057',fontSize:13,textAlign:'center'}}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={{
            alignItems:'center',
            margin:'1%',
            padding:15,
            justifyContent:'center',
            backgroundColor:gender && gender === 'female' ? '#364057':'#D5DDDC',
            width:'38%',
            marginTop:20,
            alignSelf:'center',
            borderRadius:15,
            borderColor:'white',
            borderWidth:1
          }}
          onPress={()=>{
            setGender('female')
        }} >
              <Text style={{color:gender && gender === 'female' ? '#D5DDDC':'#364057',fontSize:13,textAlign:'center'}}>Female</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity 
          style={styles.ButtonStyle_Next}
          onPress={()=>{
            //save data go next page
            OnSelectSaveData();
        }} >
              <Text style={{color:'#D5DDDC',fontSize:13,textAlign:'center'}}>Next</Text>
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
        height:"80%",
        position:'absolute',
        bottom:0,
        backgroundColor:"#344148",
        borderTopStartRadius:15,
        borderTopEndRadius:15
    },
    ButtonStyle:{
    alignItems:'center',
    margin:'1%',
    padding:15,
    justifyContent:'center',
    backgroundColor:'#D5DDDC',
    width:'38%',
    marginTop:20,
    alignSelf:'center',
    borderRadius:15,
    borderColor:'white',
    borderWidth:1
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
}
  });