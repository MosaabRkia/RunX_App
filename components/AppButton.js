import React from 'react'
import { View,TouchableOpacity, Text ,Dimensions, StyleSheet} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

export default function AppButton(props) {

    const windowWidth = Dimensions.get('window').width;

    


    return (
    //    <View >
            <View style={styles.container}>
      <TouchableOpacity onPress={() => props.onPress()}>
        <View style={[styles.buttonParent,{width:windowWidth*0.8}]}>
          <LinearGradient
            colors={['#8FA5A3','#8FA5A3', '#404E62','#404E62']}
            style={[styles.buttonGrad,{width:windowWidth*0.8}]}>
                <Text style={{fontSize:25,alignSelf:'center',fontWeight:'bold',padding:5}}>
                {props.text}
                </Text>
            </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop:10
    },
    buttonGrad: {
      height: 50,
      borderRadius: 10,
      position: 'absolute',
      bottom: 5,
    },
    buttonParent: {
      height: 50,
      width: 200,
      borderRadius: 10,
      backgroundColor: '#9A4500',
    },
  });