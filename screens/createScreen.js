import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Platform, Text, View, Button, SafeAreaView, Flexbox, ScrollView, Modal, Alert, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { DropDownPicker} from 'react-native-dropdown-picker';
import Post from '../components/posts';
import Select2 from "react-native-select-two"

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
  },
  video: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width)/2 - 8,
    height: 200,
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

const mockData = [
  { id: 1, name: "React Native Developer"}, // set default checked for render option item
  { id: 2, name: "Android Developer" },
  { id: 3, name: "iOS Developer" }
]

export default function CreateScreen({ navigation }) {
  const video = React.useRef(null);
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState();
  const [currTrigger, setCurrTrigger] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [objectType, setObjectType] = useState();
  const [albums, setAlbums] = useState([]);
  const [isPicked, setIsPicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("I am focused");
      const loadData =  async () => {
        var keys; 
        var tempObj = {};
        var albumArray = [];
        var albumNames = [];
        try {
          var result = await AsyncStorage.getItem("albums");
          albumArray = JSON.parse(result);
          console.log("The Albums in this page", albumArray);
          for(var i = 0; i < albumArray.length; i++ ) {
            var tempAlbum = {
              id: albumArray[i][0],
              name: albumArray[i][0]
            }

            albumNames.push(tempAlbum)
          }
        } catch{}



          setAlbums(albumNames);
          console.log("I'm getting the albums", albums);
          
        // }
          
      }

      loadData();


    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    // setIsPicked(false);
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

    // console.log("TYPE", result.uri);
    setObjectType(result.type);
    setIsPicked(true);

    if (!result.cancelled) {
      setImage(result.uri);
      setFormat(result.format);
    }
  };

  const goHomeScreen =  async () => {
    
    try {
      
      // console.log("Video? ", image.format)
      console.log("Selected", selectedOptions.data);
      // if (selectedOptions.keys(empty).length === 0 && empty.constructor === Object) {
      //   console.log("Oder here")
      //   await AsyncStorage.setItem(image, JSON.stringify([image, objectType, currTrigger, []]));

      // } else {
      //   console.log("Here", selectedOption.data);
      //   await AsyncStorage.setItem(image, JSON.stringify([image, objectType, currTrigger, selectedOption.data]));
      // }
      await AsyncStorage.setItem(image, JSON.stringify([image, objectType, currTrigger, selectedOptions.data]));
      Alert.alert("Success! \n You have successfully uploaded your Memo.");
      setIsPicked(false);
    } catch {}

    navigation.navigate('HomeTab');

  }

  return (
    <ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        // backgroundImage={!modalVisible && require('../assets/blur.png')}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Are you sure?</Text>
            <Text style={styles.modalSubText}>You're about to remove these memos from the album</Text>
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
            <View style={styles.rowPopup}> 
            <TouchableOpacity
              style={[styles.button, styles.buttonGreyClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              
            >
              <Text style={styles.textStyle}>Delete</Text>
              
            </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
      <View>
        <Text style={styles.title}> Create A Memo</Text>
        <Text style={styles.subtitle}> Upload a Media</Text>

      {isPicked && format === "video" ? 
      <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
          <Video 
            ref={"video"}
            style={styles.video}
            source={{
            uri: image
            }}
        />
      </TouchableOpacity>
      : 
      // {/* {isPicked ? <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
      //     <Image 
      //     // source={isPicked ? {uri: image} : require('../assets/addImage.png')}

      //     // source={{uri: image}}
      //     source={{uri: image}}
      //     style={{alignSelf: 'center', width: 320, height: 120, borderRadius: 10}}
      //     onPress={pickImage}
      //     />
      // </TouchableOpacity>
      // : */}
      <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
          <Image 
          source={isPicked ? {uri: image} : require('../assets/addImage.png')}

          // source={{uri: image}}
          // source={require('../assets/addImage.png')}
          style={{alignSelf: 'center', width: 323, height: 125, borderRadius: 10}}
          onPress={pickImage}
          />
      </TouchableOpacity>
      }
      </View>

      <View>
        <Text style={styles.subtitle}> Add a voice narration to the memo</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => Alert.alert("Voice narration doesn't work yet :( - We'll use a sample story instead")}>
          <Image
          source={require('../assets/narrationImage.png')}
          style={{alignSelf: 'center', paddingBottom: 8}}
          />
      </TouchableOpacity>

      <Text style={styles.subtitle}> Pick an Album</Text>
      {/* <Picker
        style={{paddingBottom: 0}}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item value="album1" label="Comfort Album" />
        <Picker.Item value="albu2" label="Favorite Album" />
        <Picker.Item value="albu3" label="Family and Friends Album" />
      </Picker> */}

      {/* <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
                <Image
                source={require('../assets/narrationImage.png')}
                style={{alignSelf: 'center', paddingBottom: 8}}
                />
            </TouchableOpacity> */}

    <Select2
              style={{ borderRadius: 5 }}
              colorTheme="#3AA1F6"

              popupTitle="Add Memo to your Albums"
              title="Select Albums"
              listEmptyTitle="You currently have no albums."
              cancelButtonText="Cancel"
              selectButtonText="Confirm"
              searchPlaceHolderText="Search for Albums"
              data={albums}
              onSelect={data => {
                setSelectedOptions({ data })
                
              }}
              onRemoveItem={data => {
                setSelectedOptions({ data })
              }}
            />

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

      {isPicked && <View style={{marginTop: 8}}>
      <TouchableOpacity activeOpacity={0.5} onPress={goHomeScreen}>
          <Image
          source={require('../assets/Create.png')}
          style={{alignSelf: 'center', marginBottom: 20}}
          onPress={goHomeScreen}
          />
      
      

        
      </TouchableOpacity>
      </View>}

      {!isPicked && <View style={{marginTop: 8}}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => {Alert.alert("You must select a photo or video!")}}>
          <Image
          source={require('../assets/createGrey.png')}
          style={{alignSelf: 'center', marginBottom: 20}}
          onPress={goHomeScreen}
          />
      
      

        
      </TouchableOpacity>
      </View>}
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