import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';


export default function Pedometter1() {
 
  const BACKGROUND_FETCH_TASK = 'background-fetch';

  // 1. Define the task by providing a name and the function that should be executed
  // Note: This needs to be called in the global scope (e.g outside of your React components)
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    _subscribe();
    while(true){
      _subscribe();
      console.log("joined " , currentStepCount)
    }
    console.log("joined " , currentStepCount)
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, 
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  const [isPedometerAvailable,setIsPedometerAvailable] = useState('checking')
  const [pastStepCount,setPastStepCount]=useState(0)
  const [currentStepCount,setCurrentStepCount]=useState(0)


  const [status, setStatus] = useState(BackgroundFetch.Status || null);
  const [isRegistered, setIsRegistered] = useState(false);

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
    checkStatusAsync();
    _subscribe();
  },[]) 


  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }
  
  useEffect(()=>{
    console.log(currentStepCount)
  },[currentStepCount]) 

//   componentWillUnmount() {
//     this._unsubscribe();
//   }

let _subscription;


  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps)
        console.log(result.steps)
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
