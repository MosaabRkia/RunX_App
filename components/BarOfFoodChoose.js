import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from 'react'
import { View , Image,Text ,StyleSheet,CheckBox} from 'react-native'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';

export default function BarOfFoodChoose(props) {

    const [isSelected, setSelection] = useState(false);


    //useEffect
    useEffect(() =>{
        //
    },[])
    
    const addToList = async ()=>{
        // let check = isSelected;
        //console.log('before ',isSelected)
        setSelection(!isSelected)
        //console.log('after ',isSelected)
      
    
        //check if already found
        // if(await AsyncStorage.getItem('fruits') === null){
        //     await AsyncStorage.setItem('fruits',[])
        // }

        // create data virable to check data
        // const data = await AsyncStorage.getItem('fruits')

        // let lastData = data && JSON.parse(data) || []
        // console.log(lastData)
        // let exists = false;

//         console.log('es', lastData)
//         lastData && lastData !== undefined && lastData.forEach(e=>{
//                     if(e.title === props.fullFruitObj.title){
//                         exists = true;
//                         console.log('found')
//                     }
//  })

//try
        props.addList(props.fullFruitObj,isSelected)

 //3ks al isselected
                // if(!exists && isSelected){
                //     console.log('45')
                //     let newData = lastData.push(props.fullFruitObj)
                //     await AsyncStorage.removeItem('fruits')
                //     await AsyncStorage.setItem('fruits',JSON.stringify(newData))

                //     // lastData.push(props.fullFruitObj)
                    
                //     // await AsyncStorage.removeItem('fruits')
                //     // await AsyncStorage.setItem('fruits',newData)
                //     // console.log('test')
                // }
                // if(exists && isSelected){
                //      console.log('57')
                //     let newData = lastData.filter((e)=>e.title !== props.fullFruitObj.title)
                //     await AsyncStorage.removeItem('fruits')
                //     await AsyncStorage.setItem('fruits',JSON.stringify(newData))
                   
                    // await AsyncStorage.mergeItem('fruits',JSON.stringify(props.fullFruitObj))
                // }

    }

    return (
    <View style={styles.container} key={props.index}>
         <View key={props.index , 1} style={{width:'25%',alignSelf:'flex-start', justifyContent: 'center',alignItems: 'center',position:'relative'}}>
            <Image 
            key={props.index + 'img'}
            style={styles.photoCss}
            source={{
          uri: 'https://thumbs-prod.si-cdn.com/GQWa1qJUrzp6l27gnhxhwMAtkpI=/fit-in/1600x0/https://public-media.si-cdn.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg',
        }}/>
        </View>
        <View key={props.index , 2} style={{width:'60%',marginLeft:10,padding:10,alignSelf:'flex-end'}}>
            <Text style={{alignSelf:"flex-start",right:25,fontSize:20,fontWeight:'bold'}} >{props.fullFruitObj.title}</Text>
            <Text style={{alignSelf:"flex-start",right:25,fontSize:15}}>{props.fullFruitObj.description}</Text>
            <Text style={{alignSelf:"flex-end",right:25}} >{props.fullFruitObj.gram}g = {props.fullFruitObj.kcal} calories</Text>
        </View>
        <View key={props.index , 3} style={{width:'15%',justifyContent:'center', alignItems:'center'}}>
        <CheckBox
          key={props.index , 4}
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
