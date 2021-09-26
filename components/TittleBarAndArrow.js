import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TittleBarAndArrow(props) {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.containerOfLogo}>
                <TouchableOpacity onPress={props.goBk}>
                    <Icon name={props.iconName} color="white" size={props.iconSize} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerOfText} >
                <Text style={styles.text}>{props.text}</Text>
            </View>

    <View style={{width:'10%'}}>

    </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center'
        //justifyContent:'center'

    }, text: {
        fontSize: 29,
        color: 'white',
        alignSelf:'center',
        marginRight:10
    }, 
    containerOfLogo: {
        width:'10%',
        marginLeft:10
    }
    , 
    containerOfText: {
        width:'80%',
    }
})
