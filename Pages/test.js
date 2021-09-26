import React,{useEffect} from 'react'
import { Text, View } from 'react-native'
import { FitnessTrackerAPI } from '@kilohealth/rn-fitness-tracker';

export default function test() {

    const authorizationStatus= async() => await FitnessTrackerAPI.setupTracking();
    const steps = async() => await FitnessTrackerAPI.getStepsToday();
    useEffect(() => {
        authorizationStatus()
        }
    , [])
    
    return (
        <View>
<Text> steps : {steps}</Text>
        </View>
    )
}
