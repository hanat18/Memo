import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Platform, Text, View, Button, SafeAreaView, Flexbox, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { DropDownPicker} from 'react-native-dropdown-picker';
import Post from '../components/posts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 32,
  },
  subtitle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 32,
    paddingBottom: 8,
    paddingLeft: 8,
    fontSize: 20,
  }, 
  bottomButton: {
    position: 'absolute',
    bottom:0,
    left:0,
  },
  bottonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
  }       
});

export default function CreateScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [currTrigger, setCurrTrigger] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState();
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const goHomeScreen =  async () => {

    try {
      await AsyncStorage.setItem('videoURI', image);
    } catch {}

    try {
      var uri = await AsyncStorage.getItem('loza');

    } catch{}

    navigation.navigate('HomeTab');
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}> Create A Memo</Text>
        <Text style={styles.subtitle}> Upload a Media</Text>

      <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
          <Image 
          source={require('../assets/image.png')}
          style={{alignSelf: 'center'}}
          //onPress={pickImage}
          />
      </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.subtitle}> Add a voice narration to the memo</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
          source={require('../assets/narrationImage.png')}
          style={{alignSelf: 'center', paddingBottom: 8}}
          />
      </TouchableOpacity>

      <Text style={styles.subtitle}> Pick an Album</Text>
      <Picker
        style={{paddingBottom: 0}}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item value="album1" label="Comfort Album" />
        <Picker.Item value="albu2" label="Favorite Album" />
        <Picker.Item value="albu3" label="Family and Friends Album" />
      </Picker>

      </View>
      <View>
        <Text style={styles.subtitle}> Trigger Warning</Text>
        
      </View>
      <View style ={styles.bottonRow}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setCurrTrigger(1)}>
        <Image
            source={currTrigger === 1 ? require('../assets/low_blue.png') : require('../assets/low_grey.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={()=> setCurrTrigger(2)}>
        <Image
          source={currTrigger === 2 ? require('../assets/medium_blue.png') : require('../assets/medium_grey.png')}
          style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setCurrTrigger(3)}>
        <Image
          source={currTrigger === 3 ? require('../assets/high_blue.png') : require('../assets/high_grey.png')}
          style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>

      <View style={{paddingTop: 48,  justifyContent: 'flex-end'}}>
      <TouchableOpacity activeOpacity={0.5} onPress={goHomeScreen}>
          <Image
          source={require('../assets/Create.png')}
          style={{alignSelf: 'flex-end', padding: 8}}
          />
      </TouchableOpacity>
      </View>
    </ScrollView>
    
  );
}

/*

  {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> }
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} }
       
       {/* <Button 
          title={'Start Recording'} 
          onPress={onStartRecord}
    />

      <Button 
                title={'Stop Recording'} 
                onPress={onStartRecord}
          /> }
*/


// const [recording, setRecording] = React.useState();
// const [recordingUri, setrecordingUri] = React.useState();
// const [hasRecorded, sethasRecorded] = React.useState(false);
// const [sound, setSound] = React.useState();

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const onStartRecord = async () => {
//   const result = await this.audioRecorderPlayer.startRecorder();
//   setRecording(true)
//   this.audioRecorderPlayer.addRecordBackListener((e) => {
//     this.setState({
//       recordSecs: e.current_position,
//       recordTime: this.audioRecorderPlayer.mmssss(
//         Math.floor(e.current_position),
//       ),
//     });
//     return;
//   });
//   console.log(result);
// };

// const onStopRecord = async () => {
//   setRecording(false)
//   const result = await this.audioRecorderPlayer.stopRecorder();
//   this.audioRecorderPlayer.removeRecordBackListener();
//   this.setState({
//     recordSecs: 0,
//   });
//   console.log(result);
// };

  // async function startRecording() {
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

  // async function playSound() {
  //   console.log('Loading Sound');
  //   console.log('heres the file', recordingUri);
  //   if (true) {
  //     console.log('in hereeeeeeee', recordingUri)
      
  //     const { sound } = await Audio.Sound.createAsync(
  //       require("../assets/sample.mp3")
  //    );
  //    setSound(sound);

  //   }

  // console.log('Playing Sound', sound);
  // await sound.playAsync();}
  // // await sound.uri.playAsync(); }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync(); }
  //     : undefined;
  // }, [sound]);


  // <View style={styles.container}>
    //   <Button
    //     title={recording ? 'Stop Recording' : 'Start Recording'}
    //     onPress={recording ? stopRecording : startRecording}
    //   />
    //   <Button title="Play Sound" onPress={playSound} />
    // </View>