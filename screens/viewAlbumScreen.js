import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Platform, Text, View, Button, SafeAreaView, Flexbox, ScrollView, Modal, Alert, FlatList, Dimensions, TouchableHighlight  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';

let { widths } = Dimensions.get('window').width - 180;


export default function viewAlbumScreen({route, navigation}) {
  const video = React.useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [finishLoading, setfinishLoading] = useState(false);
  const [toRender, setToRender] = useState([]);
  const [isPressed, setIsPressed] = useState(0);
  const [pressedTracker, setPressedTracker] = useState({});
  const [totalMemos, setTotalMemos] = useState(0);
  const [op, setOp] = useState(1);
  const { albumName, albumDescription } = route.params;
  const [numSelected, setNumSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log("I am focused")
      const loadData =  async () => {
        var keys; 
        var tempObj = {};
        var finalArray = [];
        var postObj = {};

        
  
        try {
          keys = await AsyncStorage.getAllKeys()
          //console.log("keys", keys)
        } catch{}
          
        //Loops through all keys and retrieves the attaches URIs
        
        for (var i = 0; i < keys.length; i++) {
          let post = keys[i];
          //console.log("post", post)
          
          try {
            result = await AsyncStorage.getItem(post);
            var content = JSON.parse(result);
  
            if (result != null && post != "albums") {
              // console.log("Array Album", content[3]);
              setTotalMemos(totalMemos + 1);

              if (content[3].includes(albumName)) {
                console.log(post);
                tempObj = {
                  'id': post,
                  "videoURI": content[0],
                  "format": content[1],
                  "triggerWarning": content[2],
                  "albumMemo": content[3]
                }       
                
                finalArray.push(tempObj);
              }
              // //Dynamically creates a "toRender" object and stores it in state
              // postObj[tempObj.id] = true;
              
              // finalArray.push(tempObj);
              }
            
          } catch(e){
            //console.log("ERROR: ", e)
          }
        }
  
        setfinishLoading(true);
        setTotalMemos(finalArray.length);
        setToRender(finalArray);
        console.log("toRender", finalArray);
      }
  
      loadData();
    });
    return unsubscribe;
  }, [navigation, pressedTracker]);

  
  const onPressHandler = (item) => {
    // if(op == 0.5){
    //   console.log("OP set to 1");
    //   setOp(1);
    // }else{
    //   console.log("OP set to 0.5");
    //   setOp(0.5);
    // }

    // console.log("Before tap item: ", pressedTracker[item.id]);
    var tempObj = pressedTracker;
    var currState = !tempObj[item.id]
    tempObj[item.id] = !tempObj[item.id]
    setPressedTracker(tempObj);
    // console.log("After tap item: ", pressedTracker[item.id])
    // console.log("After tap item: ", item.id, "\nstatus: ", pressedTracker[item.id]);
    

    console.log("\nActing on: ", item.id);
    if (currState == true){
      console.log("OP set to 1");
      setIsPressed(isPressed - 1);
      setOp(1);
    }else {
      setIsPressed(isPressed + 1);
      console.log("\nOP set to 0.5");
        setOp(0.5);
    }

    console.log("After tap item: ", pressedTracker[item.id])
}

    const deleteMemos =  async () => {

      Alert.alert("Are you sure you want to delete?")
      var toDelete = [];

      for (const property in pressedTracker) {
        if (pressedTracker[property] === true) {
          toDelete.push(property);
        }
      }

      
    }
    

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    {/* <Text style={styles.title}> {albumName} </Text> */}
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 30}} onPress={() => {navigation.navigate("Albums");}}>
      <Image
        source={require("../assets/albumTitle.png")}
        style={styles.albumTitle}
      />
      <Text style={{position: 'absolute', fontSize: 18}}>{albumName}</Text>
    </View>

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'black',
        borderBottomWidth: 1,}} onPress={() => {navigation.navigate("Home");}}>
      <Image
        source={require("../assets/albumPlay.png")}
        style={styles.albumTitle}
        onPress={() => console.log("Pressed")}
      />
      <Text style={{position: 'relative', fontSize: 20, marginTop: 12, marginBottom: 10}}>Play Album Feed</Text>
    </View>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 40}} onPress={() => {navigation.navigate("Home");}}>
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={{fontSize: 28, alignSelf: 'center', fontWeight: 'bold'}}>{totalMemos}</Text>
        <Text style={{fontSize: 16}}>Memos</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20, marginLeft: 20, color: '#616161'}}>Description:</Text>
        <Text style={{position: 'relative', fontSize: 16,  marginBottom: 20, marginLeft: 20, flexWrap: 'wrap'}} >{albumDescription}</Text>
      </View>
    </View>

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
            <Text style={styles.modalSubText}>You're about to call your caregiver</Text>
            <View style={styles.rowPopup}> 
            <TouchableOpacity
              style={[styles.button, styles.buttonGreyClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle} >Call</Text>
              
            </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>



    <FlatList
      data={toRender}
      renderItem={({item}) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginBottom: 8,
            maxWidth: (Dimensions.get('window').width)/2,
            alignItems: 'center',
            // borderBottomColor: 'black',
            // borderBottomWidth: 1,
            // borderRightColor: 'black',
            // borderRightWidth: 1,
            // marginTop: 4,
          }}>     
        {pressedTracker[item.id] === true ? <TouchableOpacity onPress={() => onPressHandler(item)} style={{opacity: 0.5}}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                uri: item,
                }}
                resizeMode="cover"
                
            />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => onPressHandler(item)}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                uri: item.videoURI,
                }}
                resizeMode="cover"
                
            />
            </TouchableOpacity>}


        </View>
      )}
      //Setting the number of column
      numColumns={2}
      keyExtractor={(item, index) => index}
    />

    {isPressed !== 0 && <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
              <Image 
              source={require('../assets/createAlbumBtn.png')}
              style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}
              />
          </TouchableOpacity>}


    </ScrollView>
    {/* <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('FinalizeAlbum')}>
          <Image 
          source={require('../assets/createAlbumBtn.png')}
          style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}
          />
      </TouchableOpacity> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  video: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width)/2 - 8,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 30,
    fontSize: 32,
  },
  albumTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
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
