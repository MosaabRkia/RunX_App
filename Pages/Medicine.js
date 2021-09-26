import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, TextInput, Button } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from 'expo-linear-gradient';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AppButton from '../components/AppButton';
import Icon from 'react-native-vector-icons/AntDesign';



export default function Medicine() {

    //goBack const
    const goBk = () => navigation.goBack();
    const [time, setTime] = useState('hh:mm')
    const [clicked, setClicked] = useState(false);
    const [array, setArray] = useState([]);




    return (
        <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>

            <TittleBarAndArrow
                goBk={goBk}
                iconName="arrow-left"
                iconSize={40}
                text="Your Info"
            />

            <TextInput
                style={styles.inputStyle}
                placeholderTextColor='#364057'
                // onChangeText={showDatePicker}
                // value={birthdate}
                placeholder="Medicine Name"
            />

            <TextInput
                style={styles.inputStyle}
                placeholderTextColor='#364057'
                // onChangeText={showDatePicker}
                // value={birthdate}
                placeholder="Amount Of Pills (cc/ml)"
            />

            <View>
                <TouchableOpacity onPress={() => setClicked(true)} style={[styles.inputStyle , {flexDirection: 'row',alignItems: 'center'}]}>
                    <Text style={{ fontSize: 20  , textAlign:'center' , width: "100%" }}>{time}</Text>
                    <TouchableOpacity style={styles.addButton} onPress= {() => console.log("pressed touch")}>
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
                    setTime(time.getHours() + ':' + time.getMinutes())
                    setClicked(false)
                }}
                onCancel={() => setClicked(false)}
            />


        </LinearGradient>

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