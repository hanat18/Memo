import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});

export default function ProfileScreen({navigation}) {
  const [recording, setRecording] = React.useState();
  const [recordingUri, setrecordingUri] = React.useState();
  const [hasRecorded, sethasRecorded] = React.useState(false);
  const [sound, setSound] = React.useState();

    async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    // <AlbumScreen />
    setrecordingUri(uri);
    sethasRecorded(true);
    console.log('Recording stopped and stored at', uri);
  }

  async function playSound() {
    try{
    console.log('Loading Sound');
    console.log('heres the file', recordingUri);
    if (true) {
      console.log('in hereeeeeeee', recordingUri)
      
      const { sound } = await Audio.Sound.createAsync(
        //{uri: recordingUri}
        require('../assets/sample.mp3')
     );
     setSound(sound);

    }

  console.log('Playing Sound', sound);
  await sound.playAsync();}
  catch (e) {
    console.error(e);
}}
  // await sound.uri.playAsync(); }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync(); }
  //     : '';
  // }, [sound]);

    return (
      <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="Play Sound" onPress={playSound} />
    </View>
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Text>Profiles!</Text>
      // </View>
    );
  }