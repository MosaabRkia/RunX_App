import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react'
import { View , Image,Text ,StyleSheet,CheckBox} from 'react-native'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';

export default function BarOfFoodChoose(props) {

    const [isSelected, setSelection] = useState(false);



    const addToList = async ()=>{
        setSelection(!isSelected);
        //check if already found
        if(await AsyncStorage.getItem('fruits') === null){
            await AsyncStorage.setItem('fruits',JSON.stringify(props.fullFruitObj))
        }
        // create data virable to check data
        const data = await AsyncStorage.getItem('fruits')
        const lastData = Array(JSON.parse(data))
        console.log(lastData)

        let checkIfFound = false;
        let nameFruit = props.fullFruitObj.title;

        lastData && lastData.forEach(e=>{
            console.log(e)
                    if(e.title === nameFruit){
                        checkIfFound = true;
                        console.log('found in the arr - 27')
                    }
 })

                if(checkIfFound === false && isSelected){
                    console.log('added')
                    lastData.push(props.fullFruitObj)
                    console.log(newData)
                    await AsyncStorage.removeItem('fruits')
                    await AsyncStorage.setItem('fruits',newData)
                   
                }
//                 if(checkIfFound && !isSelected){
//                     console.log('delete it')
//                     // await AsyncStorage.mergeItem('fruits',JSON.stringify(props.fullFruitObj))
//                 }
               
           
    }

    return (
    <View style={styles.container} key={props.index}>
         <View style={{width:'25%',alignSelf:'flex-start', justifyContent: 'center',alignItems: 'center',position:'relative'}}>
            <Image 
            style={styles.photoCss}
            source={{
          uri: 'https://thumbs-prod.si-cdn.com/GQWa1qJUrzp6l27gnhxhwMAtkpI=/fit-in/1600x0/https://public-media.si-cdn.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg',
        }}/>
        </View>
        <View style={{width:'60%',marginLeft:10,padding:10,alignSelf:'flex-end'}}>
            <Text style={{alignSelf:"flex-start",right:25,fontSize:20,fontWeight:'bold'}} >{props.title}</Text>
            <Text style={{alignSelf:"flex-start",right:25,fontSize:15}}>{props.description}</Text>
            <Text style={{alignSelf:"flex-end",right:25}} >{props.grams}g = {props.calories} calories</Text>
        </View>
        <View style={{width:'15%',justifyContent:'center', alignItems:'center'}}>
        <CheckBox
          value={isSelected}
          onValueChange={addToList}
          style={{alignSelf: "center"}}
        />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#D5DDDC',
        margin:15,
        borderRadius:15,
        flexDirection:'row'
    },
    photoCss:{
        borderRadius:15,
        margin:15,
        width:60,
        height:60
    }
})
