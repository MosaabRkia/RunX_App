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
            meat:[x,y,z],
            snacks:[x,y,z],
            drinks:[x,y,z],
            bakery:[x,y,z]
*/

export default function RegisterForm3(props) {
    //test arr
    const data = 
        [
        {title:'orange',kcal:48.1,gram:100,protein: 0.9,fats: 0.9 , description: "Protects your cells from damage",kind:'fruits'},
        {title:'grapefruit',kcal:42.1,gram:100,protein: 0.8,fats: 0.1, description: "Protects your cells from damage",kind:'fruits' },
        {title:'mandarin',kcal:53.3,gram:100,protein: 0.8,fats: 0 , description: "Protects your cells from damage",kind:'vegatables'},
        {title:'lemon',kcal:27.9,gram:100,protein: 1.1,fats: 0.3, description: "Protects your cells from damage",kind:'vegatables' },
        {title:'lime',kcal:30.1,gram:100,protein: 0.8,fats: 0.2 , description: "Protects your cells from damage",kind:'meat'},
        {title:'orange',kcal:48.1,gram:100,protein: 0.9,fats: 0.9 , description: "Protects your cells from damage",kind:'meat'},
        {title:'grapefruit',kcal:42.1,gram:100,protein: 0.8,fats: 0.1, description: "Protects your cells from damage",kind:'snacks' },
        {title:'mandarin',kcal:53.3,gram:100,protein: 0.8,fats: 0 , description: "Protects your cells from damage",kind:'snacks'},
        {title:'lemon',kcal:27.9,gram:100,protein: 1.1,fats: 0.3, description: "Protects your cells from damage",kind:'drinks' },
        {title:'lime',kcal:30.1,gram:100,protein: 0.8,fats: 0.2 , description: "Protects your cells from damage",kind:'drinks'},
        {title:'lemon',kcal:27.9,gram:100,protein: 1.1,fats: 0.3, description: "Protects your cells from damage",kind:'bakery' },
        {title:'lime',kcal:30.1,gram:100,protein: 0.8,fats: 0.2 , description: "Protects your cells from damage",kind:'bakery'},
        {title:'lemon',kcal:27.9,gram:100,protein: 1.1,fats: 0.3, description: "Protects your cells from damage",kind:'dairy' },
        {title:'lime',kcal:30.1,gram:100,protein: 0.8,fats: 0.2 , description: "Protects your cells from damage",kind:'dairy'},]

        const kinds = [
            'fruits','vegatables','meat','snacks','drinks','bakery','dairy'
        ]

        //useState
        const [arr,setArr] = useState([]);
        const [placeKind,setPlaceKind] = useState(0);
        const [dataToShow,setDataToShow] = useState([]);

        //useEffect
        useEffect(()=>{
            console.log(placeKind)
            let newData = data.filter(item=>item.kind === kinds[placeKind])
            console.log(newData)
            setDataToShow(newData)
        },[placeKind])


    //goBack const
    const goBk = () => navigation.goBack();
        

    // functions
        const addList =(e,isSelected)=>{
            console.log(arr)
           // this fix because of the not update fast so it always send the oposite
            isSelected = !isSelected;

            let exists = false;

            arr && arr.forEach((x)=>{
                if(e.title === x.title){
                    exists = true;
                    console.log('found')
                }
            })

            console.log(isSelected,exists)

            if(isSelected && !exists){
                console.log('added')
                setArr([...arr,e])
            }
            if(!isSelected && exists){
                console.log('deleted')
                let newArr = arr.filter(fruit=> fruit.title !== e.title )
                setArr(newArr)
            }
        }

    //save data
    const OnSelectSaveData =async ()=>{
        try {
                    if(kinds.length -1 === placeKind){
                     await AsyncStorage.mergeItem('registerData',JSON.stringify({
                     food:arr
                    })).then(async()=>{
                        //go to next page
                        const data = await AsyncStorage.getItem('registerData')
                         console.log(data)
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