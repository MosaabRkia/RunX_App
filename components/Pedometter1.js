import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as TaskManager from 'expo-task-manager';

export default function Pedometter1() {
 
const LOCATION_TASK_NAME = 'background-location-task';

  const [isPedometerAvailable,setIsPedometerAvailable] = useState('checking')
  const [pastStepCount,setPastStepCount]=useState(0)
  const [currentStepCount,setCurrentStepCount]=useState(0)

  const end = new Date();
  const start = new Date();

  //location need to change to steps

  const requestPermissions = async () => {
      console.log(Pedometer.isAvailableAsync() === true)
    const { status } = await Pedometer.requestPermissionsAsync();
    if (status === 'granted') {
     console.log('worked')
    
    }
  }



  useEffect(()=>{
    _subscribe();
  },[]) 

//   componentWillUnmount() {
//     this._unsubscribe();
//   }

let _subscription;


  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps)
      }) 
    
    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(String(result))
       
      },
      error => {
          setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error)
      }
    );

   
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastStepCount(result.steps)
      },
      error => {
          setPastStepCount('Could not get stepCount:' + error)
              }
    );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };

  
  TaskManager.defineTask('background_Pedometter', ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      console.log('error massage :' + error.message)
      return;
    }
    if (data) {
      const { locations } = data;
      // do something with the locations captured in the background
      _subscribe()
    }
  });
  




    return (
      <View style={styles.container}>
          {_unsubscribe()}

          <TouchableOpacity onPress={requestPermissions}>
      <Text>Enable background location</Text>
    </TouchableOpacity>

        <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
        <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
        <Text>Walk! And watch this go up: {currentStepCount}</Text>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
