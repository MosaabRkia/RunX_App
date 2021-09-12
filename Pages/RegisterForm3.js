import React,{useState,useEffect,useRef} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import {  StyleSheet, Text, View ,Image ,TouchableOpacity ,Button,TouchableHighlight, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BarOfFoodChoose from '../components/BarOfFoodChoose';
import { vh } from 'react-native-expo-viewport-units';

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

export default function RegisterForm3(props) {
    //test arr
    var footerY;
    const citrus = 
        [
        {title:'orange',kcal:48.1,gram:100,protein: 0.9,fats: 0.9 , description: "Protects your cells from damage"},
        {title:'grapefruit',kcal:42.1,gram:100,protein: 0.8,fats: 0.1, description: "Protects your cells from damage" },
        {title:'mandarin',kcal:53.3,gram:100,protein: 0.8,fats: 0 , description: "Protects your cells from damage"},
        {title:'lemon',kcal:27.9,gram:100,protein: 1.1,fats: 0.3, description: "Protects your cells from damage" },
        {title:'lime',kcal:30.1,gram:100,protein: 0.8,fats: 0.2 , description: "Protects your cells from damage"},
        ]


    //useState
    const [birthdate, setBirthdate] = useState("yyyy-mm-dd");
    const [weight,setWeight] = useState(null);
    const [height,setHeight] = useState(null);
    const [goalWeight,setGoalWeight] = useState(null);
    const [showCalcWeight,setShowCalcWeight] = useState(false);

    //use ref
    const _scrollView = useRef();

    //get data
    const [name,setName] = useState(null);
    const [goal,setGoal] = useState(null);
    const [showGoalInputText,setShowGoalInputText] = useState(true);
    const [gender,setGender] = useState(null);
    const [healthyWeight,setHealthyWeight] = useState(null);


    //date
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateState,setDate] = useState(null);

    //scroll to top





    //goBack const
    const goBk = ()=>navigation.navigate('loginPage');
        

    // functions

    //header
    const header = () => {
        return <Button onPress={() => scrollToTop()} title="Go to top" />;
      };

      const scrollToTop = () => {
        list.current.scrollToEnd({ animated: true });
    };

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
                if(!isNaN(Number(weight)))   { 
                    console.log('Weight not a number')
                    return;
                }
                if(!isNaN(Number(height)))  { 
                    console.log('Height not a number')
                    return;
                }
                if(!isNaN(Number(goalWeight) ))  { 
                    console.log('goal Weight not a number')
                    return;
                }
                if(goal === 'Gain' && Number(weight) < Number(goalWeight) ){
                    console.log('ops your goal in less than your weight your on gain goal')
                }
                if(goal === 'lose' && Number(weight) > Number(goalWeight) ){
                    console.log('ops your goal in higher than your weight your on lose goal')
                }
                

                    await AsyncStorage.mergeItem('registerData',JSON.stringify({
                        birdthday:Date(birthdate),
                        weight:Number(weight),
                        height:Number(height),
                        goalWeight:Number(goalWeight),
                    })).then(async()=>{
                        //go to next page
                        const data = await AsyncStorage.getItem('registerData')
                         console.log(data)
                         
                    })
                  
    }
    catch(e) {
        console.log('Error in line 29 => ',e)
    }
    }


    


    return (
        <LinearGradient style={styles.container} colors={['#92C6BC','#8D9A93', '#536976', '#273035', '#101011']}>
                  <View style={{width:'100%',alignContent:'center',alignItems:'center',marginTop:'10%'}}>
                     <Image
            source={require('../assets/logoNBG.png')}
            style={{width:140,height:60}}
           /> 
                      </View> 
 <Animatable.View style={styles.viewShow} animation={'fadeInUp'} >
        <TittleBarAndArrow
            goBk={goBk}
            iconName="arrow-left"
            iconSize={40}
            text="Fruits"
            />
             <TouchableHighlight
            onPress={() => { _scrollView.scrollTo(0) }}>
            <Text>Scroll to Bottom</Text>
          </TouchableHighlight>

        <Text style={{color:"#CCCCCC",fontSize:20,marginTop:15,textAlign:'left',alignSelf:'center'}}>tell us what you love</Text>


<View >

                 <ScrollView 
                 style={{width:'97%',alignSelf:"center",height:'70%',marginTop:10,borderWidth:1,borderColor:'white',borderRadius:10,paddingBottom:5}}
                //  onContentSizeChange={(contentWidth, contentHeight)=>{
                //     console.log(contentHeight,contentWidth)
                //     }}
                ref={_scrollView}
                >
                   
                    <View>
                    {
                        citrus && citrus.map(e=>{
                           return <BarOfFoodChoose title={e.title} description={e.description} grams={e.gram} calories={e.kcal} /> 
                        })
                    }
                    </View>
                 </ScrollView>
                

</View>
        <TouchableOpacity 
          style={styles.ButtonStyle_Next}
          onPress={()=>{
            //save data go next page
            OnSelectSaveData();
        }} >

              <Text style={{color:'#D5DDDC',fontSize:13,textAlign:'center'}}>Confirm</Text>
          </TouchableOpacity>

      



        </Animatable.View >

        </LinearGradient>

    )
}

// styles
const styles = StyleSheet.create({
    container: {
        flex:1
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
        height:"85%",
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