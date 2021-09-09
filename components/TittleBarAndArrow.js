import React from 'react'
import { View ,StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TittleBarAndArrow(props) {
    return (
        <View style={styles.container}>

            <TouchableOpacity onClick={props.goBk}>
            <Icon name={props.iconName} color="white" size={props.iconSize} />
            </TouchableOpacity>

<View style={styles.containerOfText} >
            <Text style={styles.text}>{props.text}</Text>
</View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       marginLeft:15 ,
       marginTop:10,

    },text:{
        fontSize: 29,
        textAlign: 'center',
        color:'white'
    },containerOfText:{
        width:'93%',
        position:'absolute',
    }
})
