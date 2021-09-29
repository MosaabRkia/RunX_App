import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, TextInput,Dimensions } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from 'expo-linear-gradient';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AppButton from '../components/AppButton';
import Icon from 'react-native-vector-icons/AntDesign';



export default function Medicine(props) {

    //dimention
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //goBack const
    const goBk = () => props.navigation.goBack();
    const {mode,item} = props.route.params;

    //useState
    const [medicineName, setMedicineName] = useState(null)
    const [medicineAmount, setMedicineAmount] = useState(null)
    const [time, setTime] = useState('hh:mm')
    const [clicked, setClicked] = useState(false);
    const [array, setArray] = useState([]);
    const [modeTimes, setModeTimes] = useState(mode);
    



    const sendToFetch=()=>{
        // send to fetch and 
        // alert sucess or no
        // go to page medics show list 
        // send array 
        if(!medicineName  || !medicineAmount  || array.length <= 0)
            console.log('something wrong')
        else
            console.log('something')
    }

    const refresh =()=>{
        if(mode === 'edit')
        {
                    setArray(item.times)
            console.log('edit')
        }
        else{
          setArray([])  
          console.log('view')
 
        }
    }

    useEffect(() => {
        setModeTimes(mode)
    }, [modeTimes])

    useEffect(() => {
        console.log('joined')
        refresh()
    }, [modeTimes])


    // useEffect(()=>{
    //     console.log(array)
    // },[array])

    return (
        // mode !== 'edit'?
        <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>

            <TittleBarAndArrow
                goBk={goBk}
                iconName="arrow-left"
                iconSize={40}
                text="Medicine Info"
            />

            <TextInput
                style={[styles.inputStyle,{marginTop:15}]}
                placeholderTextColor='#364057'
                onChangeText={setMedicineName}
                placeholder="Medicine Name"
            />

            <TextInput
                style={styles.inputStyle}
                placeholderTextColor='#364057'
                onChangeText={setMedicineAmount}
                placeholder="Amount Of Pills (cc/ml)"
                // value={mode === 'edit'?String(item.amount):null}
            />

            <View>
                <TouchableOpacity onPress={() => setClicked(true)} style={[styles.inputStyle , {flexDirection: 'row',alignItems: 'center'}]}>
                    <Text style={{ fontSize: 20  , textAlign:'center' , width: "100%" }}>{time}</Text>
                    <TouchableOpacity style={styles.addButton} onPress= {() =>{
                            console.log(time)
                            if(time !== 'hh:mm' && !array.find(x=> x===time ))
                         setArray([...array,time])

                         setTime('hh:mm')

                         }}>
                        <Icon
                            name="pluscircleo"
                            color={'black'}
                            size={40}
                        />
                        
                    </TouchableOpacity>
                </TouchableOpacity>



            </View>


            <DateTimePickerModal
                isVisible={clicked}
                mode="time"
                onConfirm={(e) => {
                    let time = new Date(e)
                    console.log(time.getHours(), time.getMinutes())
                        if(time.getHours() < 10 && time.getMinutes() < 10)
                        setTime( '0' + time.getHours() + ':0' + time.getMinutes()  )
                        else if(time.getHours() < 10)
                        setTime( '0' + time.getHours() + ':' + time.getMinutes())
                        else if(time.getMinutes() < 10)
                        setTime(  time.getHours() + ':0' + time.getMinutes()  ) 
                        else setTime(time.getHours() + ":" + time.getMinutes()  )

                    setClicked(false)
                }}
                onCancel={() => setClicked(false)}
            />

            <Text style={{width:'80%',borderBottomWidth:1,alignSelf:'center',textAlign:'center',marginTop:20,fontSize:25,fontWeight:'bold'}}>Times</Text>
               
                <ScrollView style={{maxHeight:windowHeight*0.4,height:windowHeight*0.4}}>
            {array && array.map((e,index)=>{
                         return <View key={index}>
                            <Text key={index} style={{width:'80%',borderBottomWidth:1,alignSelf:'center',textAlign:'center',marginTop:10,fontSize:25,fontWeight:'bold'}}>{e}</Text>
                            <TouchableOpacity style={[styles.addButton,{right: "13%",marginTop:'1%'}]} onPress= {() =>{
                                let newArr = array.filter(n=>n!==e)
                                setArray(newArr)
                         }}>
                        <Icon
                            name="minuscircleo"
                            color={'black'}
                            size={30}
                        />
                        
                    </TouchableOpacity>
                         </View>
            })}
            </ScrollView>
            <View style={{alignSelf:'center'}}>
              <AppButton onPress={()=>sendToFetch()} text={'Add Medicine'} color={false}/>  
            </View>
            

        </LinearGradient>
        // :
    //     <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>

    //     <TittleBarAndArrow
    //         goBk={goBk}
    //         iconName="arrow-left"
    //         iconSize={40}
    //         text="Medicine Info"
    //     />

    //     <TextInput
    //         style={[styles.inputStyle,{marginTop:15}]}
    //         placeholderTextColor='#364057'
    //         onChangeText={setMedicineName}
    //         placeholder="Medicine Name"
    //         value={item.name}
    //     />

    //     <TextInput
    //         style={styles.inputStyle}
    //         placeholderTextColor='#364057'
    //         onChangeText={setMedicineAmount}
    //         placeholder="Amount Of Pills (cc/ml)"
    //         value={String(item.amount)}
    //     />

    //     <View>
    //         <TouchableOpacity onPress={() => setClicked(true)} style={[styles.inputStyle , {flexDirection: 'row',alignItems: 'center'}]}>
    //             <Text style={{ fontSize: 20  , textAlign:'center' , width: "100%" }}>{time}</Text>
    //             <TouchableOpacity style={styles.addButton} onPress= {() =>{
    //                     console.log(time)
    //                     if(time !== 'hh:mm' && !array.find(x=> x===time ))
    //                  setArray([...array,time])

    //                  setTime('hh:mm')

    //                  }}>
    //                 <Icon
    //                     name="pluscircleo"
    //                     color={'black'}
    //                     size={40}
    //                 />
                    
    //             </TouchableOpacity>
    //         </TouchableOpacity>



    //     </View>


    //     <DateTimePickerModal
    //         isVisible={clicked}
    //         mode="time"
    //         onConfirm={(e) => {
    //             let time = new Date(e)
    //             console.log(time.getHours(), time.getMinutes())
    //                 if(time.getHours() < 10 && time.getMinutes() < 10)
    //                 setTime( '0' + time.getHours() + ':0' + time.getMinutes()  )
    //                 else if(time.getHours() < 10)
    //                 setTime( '0' + time.getHours() + ':' + time.getMinutes())
    //                 else if(time.getMinutes() < 10)
    //                 setTime(  time.getHours() + ':0' + time.getMinutes()  ) 
    //                 else setTime(time.getHours() + ":" + time.getMinutes()  )

    //             setClicked(false)
    //         }}
    //         onCancel={() => setClicked(false)}
    //     />

    //     <Text style={{width:'80%',borderBottomWidth:1,alignSelf:'center',textAlign:'center',marginTop:20,fontSize:25,fontWeight:'bold'}}>Times</Text>
           
    //         <ScrollView style={{maxHeight:windowHeight*0.4,height:windowHeight*0.4}}>
    //     {array && array.map((e,index)=>{
    //                  return <View key={index}>
    //                     <Text key={index} style={{width:'80%',borderBottomWidth:1,alignSelf:'center',textAlign:'center',marginTop:10,fontSize:25,fontWeight:'bold'}}>{e}</Text>
    //                     <TouchableOpacity style={[styles.addButton,{right: "13%",marginTop:'1%'}]} onPress= {() =>{
    //                         let newArr = array.filter(n=>n!==e)
    //                         setArray(newArr)
    //                  }}>
    //                 <Icon
    //                     name="minuscircleo"
    //                     color={'black'}
    //                     size={30}
    //                 />
                    
    //             </TouchableOpacity>
    //                  </View>
    //     })}
    //     </ScrollView>
    //     <View style={{alignSelf:'center'}}>
    //       <AppButton onPress={()=>sendToFetch()} text={'Add Medicine'} color={false}/>  
    //     </View>
        

    // </LinearGradient>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    inputStyle: {
        width: '80%',
        height: 55,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#D5DDDC',
        alignSelf: 'center',
        borderRadius: 15,
        textAlign: 'center',
        borderColor: '#364057',
        borderWidth: 1
    },
    addButton : {
            position: 'absolute',
            top: "10%",
            right: "2%"
    }
})