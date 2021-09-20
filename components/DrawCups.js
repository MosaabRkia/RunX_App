import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DrawCups(props) {
    return(
        props.done === 'yes'?
        <Icon name={'cup'} size={40} color="black" />
        :
        <Icon name={'cup-outline'} size={40} color="black" />
        )  
}
