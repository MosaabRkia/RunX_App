import React,{useState,useEffect} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import {  StyleSheet, Text, View ,Image ,TouchableOpacity ,TextInput,Pressable} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

export default function RegisterForm2({navigation}) {
    
    //useState
    const [birthdate, setBirthdate] = useState("yyyy-mm-dd");
    const [weight,setWeight] = useState(null);
    const [height,setHeight] = useState(null);
    const [goalWeight,setGoalWeight] = useState(null);
    const [showCalcWeight,setShowCalcWeight] = useState(false);
    //get data
    const [name,setName] = useState(null);
    const [goal,setGoal] = useState(null);
    const [showGoalInputText,setShowGoalInputText] = useState(true);
    const [gender,setGender] = useState(null);
    const [healthyWeight,setHealthyWeight] = useState(null);


    //date
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateState,setDate] = useState(null);


    //function format date
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-').toString();
    }



    //goBack const
    const goBk = ()=>navigation.navigate('loginPage');
        

    // functions
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        setDate(date);
        setBirthdate(formatDate(date).toString())
        hideDatePicker();
      };

      //handle weight numberic
      const handleWeightInputChange = (text) => {
        if (/^\d+$/.test(text)) {
         setWeight(text)
        }
      }
      //handle height numberic
      const handleHeightInputChange = (text) => {
        if (/^\d+$/.test(text)) {
         setHeight(text)
        }
      }
      
        //handle goal weight numberic
    const handleGoalWeightInputChange = (text) => {
         if (/^\d+$/.test(text)) {
            setGoalWeight(text)
        }
    }


    //get data 
    const getData =async()=>{
        const data = await AsyncStorage.getItem('registerData')
        const lastData = JSON.parse(data)
        console.log(lastData.firstName)
        setName(lastData.firstName)
        console.log(lastData.plan)
        setGoal(lastData.plan)
        setGender(lastData.gender)
        if(lastData.plan === 'healthy'){
            setShowGoalInputText(false)
        }
    }
 
    //useEffect
    useEffect( () => {
        getData();
        }
    , [])
    //loop on calc healthy weight
    useEffect( () => {
        if(height !== null && weight !== null){
            setShowCalcWeight(true)

            if(gender === 'male'){
                setHealthyWeight(50 + (0.91 * (height - 152.4) ))
                if(goal === 'healthy'){
                    setGoalWeight(50 + (0.91 * (height - 152.4) ) )
                }
            }
            
            if(gender === 'female'){
                setHealthyWeight(45.5 + (0.91 * (height - 152.4) ))
                if(goal === 'healthy'){
                    setGoalWeight(45.5 + (0.91 * (height - 152.4) ) )
                }
                }
        }
        }
    , [weight,height])

    //save data
    const OnSelectSaveData =async ()=>{
        try {
            if(birthdate === 'yyyy-mm-dd')
               { 
                console.log('ops wrong date')
                return;
            }
            console.log(Number(weight))
                if(isNaN(Number(weight)))   { 
                    console.log('Weight not a number')
                    return;
                }
                if(isNaN(Number(height)))  { 
                    console.log('Height not a number')
                    return;
                }
                if(isNaN(Number(goalWeight)))  { 
                    console.log('goal Weight not a number')
                    return;
                }
                if(goal === 'Gain' && Number(weight)  > Number(goalWeight) ){
                    console.log('ops your goal is less than your weight your on gain goal')
                    return;
                }
                if(goal === 'lose' && Number(weight) < Number(goalWeight) ){
                    console.log('ops your goal is higher than your weight your on lose goal')
                    return;
                }
                

                    await AsyncStorage.mergeItem('registerData',JSON.stringify({
                        birdthday:Date(birthdate),
                        weight:Number(weight),
                        height:Number(height),
                        goalWeight:Number(goalWeight),
                    })).then(async()=>{
                        //go to next page
                        const data = await AsyncStorage.getItem('registerData')
                        navigation.navigate('register4')
                         console.log(data)
                         
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
        <Text style={{color:"#CCCCCC",fontSize:25,alignSelf:'center'}}>Welcome {name}</Text>
        <Text style={{color:"#CCCCCC",fontSize:20,marginTop:15,textAlign:'left',alignSelf:'center'}}>status of using</Text>
        <KeyboardAwareScrollView>
        <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onFocus={showDatePicker}
            onChangeText={showDatePicker}
            value={birthdate}
            placeholder="Birthday"
        />
         <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

            <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onChangeText={handleWeightInputChange}
            value={null}
            keyboardType={"numeric"}
            placeholder="Weight KG"
            />


            <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onChangeText={handleHeightInputChange}
            value={null}
            keyboardType={"numeric"}
            placeholder="Height CM"
            />

        {showGoalInputText?
            <TextInput
            style={styles.inputStyle}
            placeholderTextColor='#364057'
            onChangeText={handleGoalWeightInputChange}
            value={null}
            placeholder="Goal Weight KG"
            keyboardType={"numeric"}
            />:<View></View>}

            {showCalcWeight?
        <Text style={{alignSelf:'center',fontSize:15,color:'#D5DDDC'}}>your healthy weight is {healthyWeight}</Text>
        :<View></View>}

        <TouchableOpacity 
          style={styles.ButtonStyle_Next}
          onPress={()=>{
            //save data go next page
            OnSelectSaveData();
        }} >

              <Text style={{color:'#D5DDDC',fontSize:13,textAlign:'center'}}>Confirm</Text>
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