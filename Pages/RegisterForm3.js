import React,{useState,useEffect} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import {  StyleSheet, Text, View ,Image ,TouchableOpacity , ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarOfFoodChoose from '../components/BarOfFoodChoose';
import foodArray from '../ArraysData/foodArray';


/*
            //  plan:null,
            // firstName:null,
            // email:null,
            // password:null,
            // birdthday:Date(null),
            // weight:Number(null),
            // height:Number(null),
            // goalWeight:Number(null),
            // fruits:[x,y,z],
            // vegetables:[x,y,z],
            // meat:[x,y,z],
            snacks:[x,y,z],
            // drinks:[x,y,z],
            // bakery:[x,y,z],
            // dairy:[x,y,z]
            // fish:[x,y,z],
            seeds:[x,y,z]
            way to calc calories , proteins, water 
*/

export default function RegisterForm3({navigation}) {
    //test arr
    const data = foodArray;
    

        const kinds = [
            'meat','fruits','vegatables',/*,'snacks'*/,'drinks','sea food','bakery','seeds','dairy'
        ]

        //useState
        const [arr,setArr] = useState([]);
        const [placeKind,setPlaceKind] = useState(0);
        const [dataToShow,setDataToShow] = useState([]);
        const [age , setAge] = useState(0);
        const [weight , setWeight] = useState(0);
        const [height , setHeight] = useState(0);
        const [gender ,setGender] = useState(null);
        const [goal ,setGoal] = useState(null);
        
        //useEffect
        useEffect(()=>{
            getData()
            let newData = data.filter(item=>item.kind === kinds[placeKind])
            setDataToShow(newData)
        },[placeKind])


    //goBack const
    const goBk = () => {
        if(placeKind > 0)
        setPlaceKind(placeKind - 1)
        else{
            navigation.goBack();
        }
    };
        


    // functions
    //get data
    const getData =async()=>{
        const data = await AsyncStorage.getItem('registerData')
        const lastData = JSON.parse(data)
        let currentYear = new Date();
        setAge(currentYear.getFullYear() - lastData.birthdate.substr(0, 4))
        setWeight(lastData.weight)
        setHeight(lastData.height)
        setGender(lastData.gender)
        setGoal(lastData.plan)
    
    }

        const addList =(e,isSelected)=>{
           // this fix because of the not update fast so it always send the oposite
            isSelected = !isSelected;

            let exists = false;

            arr && arr.forEach((x)=>{
                if(e.name === x.name){
                    exists = true;
                }
            })

            if(isSelected && !exists){
                setArr([...arr,e])
            }
            if(!isSelected && exists){
                let newArr = arr.filter(fruit=> fruit.name !== e.name )
                setArr(newArr)
            }
        }

    //save data
    const OnSelectSaveData =async ()=>{
        try {   let steps;      
                    if(goal === 'lose'){
                        steps = (weight*20)+10000
                    }else if(goal === 'gain'){
                        steps = (weight*20)+8000
                    }else{
                        steps = 8000
                    }
                    if(kinds.length -1 === placeKind){
                     await AsyncStorage.mergeItem('registerData',JSON.stringify({
                     food:arr,
                     cupsOfWater:parseInt(weight * 0.2061538461538),
                     DailyProteinG:Number(weight * 2.1),
                     DailyCalories:Number(gender === 'male' ? 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age) : 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age)),
                     Steps:steps,
                     Sleep:8
                    })).then(async()=>{
                        //go to dashboard page
                        const data = await AsyncStorage.getItem('registerData')
                         console.log(data)
                         console.log('done')
                    })}
                    else{
                        let upOne = placeKind + 1;
                        setPlaceKind(upOne)
                    }
                  
    }
    catch(e) {
        console.log('Error => ',e)
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
            text={kinds[placeKind]}
            />

        <Text style={{color:"#CCCCCC",fontSize:20,marginTop:15,textAlign:'left',alignSelf:'center'}}>tell us what you love</Text>


<View >

                 <ScrollView 
                 style={{width:'97%',alignSelf:"center",height:'70%',marginTop:10,borderWidth:1,borderColor:'white',borderRadius:10,paddingBottom:5}}
                //  onContentSizeChange={(contentWidth, contentHeight)=>{
                //     console.log(contentHeight,contentWidth)
                //     }}
                >
                   
                    {
                        dataToShow && dataToShow.map((e,index)=>{
                           return <View key={index + 11}><BarOfFoodChoose kindPlace={placeKind} addList={(e,isSelected)=>addList(e,isSelected)} fullFruitObj={e} index={index}  /></View> 
                        })
                    }

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