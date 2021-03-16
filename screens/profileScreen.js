import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView, TouchableOpacity, Modal, Alert, SafeAreaView, } from 'react-native';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import {Linking} from 'react-native'

let { widths } = Dimensions.get('window').width - 180;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  backgroundImage : {
    width: widths,
  }, 
  rowButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 16,
  },
  rowPopup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  info: {
    marginLeft: 30,
    marginTop: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 80,
    width: 306,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    marginLeft: 26,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "grey",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonGreyClose: {
    backgroundColor: "#5B5B5B",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 86,
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubText: {
    marginBottom: 20,
    textAlign: "center",
  }
});


export default function ProfileScreen({navigation}) {
  return(
    <SafeAreaView>
    <Image
      style={{width: 'auto', height: 500}}
      source={{uri: "var/mobile/Containers/Data/Application/32260679-77E8-46AC-9B3E-89824FC06C19/Library/Caches/ExponentExperienceData/%2540anonymous%252FMemo-d58cbf8e-8670-4968-8897-827b23dbdafd/ImagePicker/74FDDC5C-D5BC-46BE-B15A-D0E312D9732F.jpg"}}
      //onError={(e) => console.log(e)}
    />
    <Text>HELLO</Text>
    </SafeAreaView>
  );  
}


































// export default function ProfileScreen({navigation}) {
//   // const [recording, setRecording] = React.useState();
//   // const [recordingUri, setrecordingUri] = React.useState();
//   // const [hasRecorded, sethasRecorded] = React.useState(false);
//   // const [sound, setSound] = React.useState();
//   const [modalVisible, setModalVisible] = useState(false);

//   const makeCall = () => {
//     Linking.openURL(`tel:${'6123068288'}`);
//   }

//     return (

//     <ScrollView>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         // backgroundImage={!modalVisible && require('../assets/blur.png')}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalTextTitle}>Are you sure?</Text>
//             <Text style={styles.modalSubText}>You're about to call your caregiver</Text>
//             <View style={styles.rowPopup}> 
//             <TouchableOpacity
//               style={[styles.button, styles.buttonGreyClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle} onPress={makeCall}>Call</Text>
              
//             </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>
      
//       <Image
//         source={require('../assets/buffy_profile.png')}
//         style={styles.backgroundImage}/>
//         <View style={styles.rowButtons}>
//         <TouchableOpacity
//         style={styles.rowButtons}
//         onPress={makeCall}
//         >
//           <Image
//             source={require('../assets/faven.png')}/>
//         </TouchableOpacity> 

//         <TouchableOpacity
//         style={styles.rowButtons}
//         onPress={() => {Alert.alert("Are you sure?")}}
//         >
//             <Image
//             source={require('../assets/tutorial.png')}/>
//         </TouchableOpacity> 
//         </View>
//         <View>
//           <Image
//           source={require('../assets/info.png')}
//           style={styles.info}/>
//         </View>
    
//     </ScrollView>

//     );
//   }

  /* 
  Main body code
  //   async function startRecording() {
  //   try {
  //     console.log('Requesting permissions..');
  //     await Audio.requestPermissionsAsync();
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     }); 
  //     console.log('Starting recording..');
  //     const recording = new Audio.Recording();
  //     await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
  //     await recording.startAsync(); 
  //     setRecording(recording);
  //     console.log('Recording started');
  //   } catch (err) {
  //     console.error('Failed to start recording', err);
  //   }
  // }

  // async function stopRecording() {
  //   console.log('Stopping recording..');
  //   setRecording(undefined);
  //   await recording.stopAndUnloadAsync();
  //   const uri = recording.getURI(); 
  //   // <AlbumScreen />
  //   setrecordingUri(uri);
  //   sethasRecorded(true);
  //   console.log('Recording stopped and stored at', uri);
  // }

//   async function playSound() {
//     try{
//     console.log('Loading Sound');
//     console.log('heres the file', recordingUri);
//     if (true) {
//       console.log('in hereeeeeeee', recordingUri)
      
//       const { sound } = await Audio.Sound.createAsync(
//         //{uri: recordingUri}
//         require('../assets/sample.mp3')
//      );
//      setSound(sound);

//     }

//   console.log('Playing Sound', sound);
//   await sound.playAsync();}
//   catch (e) {
//     console.error(e);
// }}
  // await sound.uri.playAsync(); }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync(); }
  //     : '';
  // }, [sound]);
  */

  /* 
  Render code
   //   <View style={styles.container}>
    //   <Button
    //     title={recording ? 'Stop Recording' : 'Start Recording'}
    //     onPress={recording ? stopRecording : startRecording}
    //   />
    //   <Button title="Play Sound" onPress={playSound} />
    // </View>
  */