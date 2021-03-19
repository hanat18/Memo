import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Platform, Text, View, Button, SafeAreaView, Flexbox, ScrollView, Modal, Alert, FlatList, Dimensions, TouchableHighlight  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
//	https://stanford.zoom.us/j/96461077394?pwd=bVQrU3pvVDZwb1NLMTE2dzgwd21Odz09


export default function createAlbumScreen({navigation}) {
  const video = React.useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [finishLoading, setfinishLoading] = useState(false);
  const [toRender, setToRender] = useState([]);
  const [isPressed, setIsPressed] = useState(0);
  const [pressedTracker, setPressedTracker] = useState({});
  let notPressed;
  const [op, setOp] = useState(1);

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
        } catch{}
          
        //Loops through all keys and retrieves the attaches URIs
        
        for (var i = 0; i < keys.length; i++) {
          let post = keys[i];
          
          try {
            result = await AsyncStorage.getItem(post);
            var content = JSON.parse(result);
    
  
            if (result != null && post != "albums") {
              tempObj = {
                'id': post,
                "videoURI": content[0],
                "format": content[1],
                "triggerWarning": content[2],
              }
              //Dynamically creates a "toRender" object and stores it in state
              postObj[tempObj.id] = false;
              
              finalArray.push(tempObj);
              }
            
          } catch(e){
            //console.log("ERROR: ", e)
          }
        }
  
        setPressedTracker(postObj);
        notPressed = postObj;
        setToRender(finalArray);
        setfinishLoading(true);
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

    // () => navigation.navigate('FinalizeAlbum', {
    //   add: ,
    // })

    const goToNextScreen =  async () => {
      var selected = [];
      for (var property in pressedTracker) {
        if (pressedTracker[property] === true) {
          selected.push(property);
        }
      }

      console.log("Selected", selected);

      navigation.navigate('FinalizeAlbum', {add: selected});
    
  
    }
    

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}> Tap to Select Memos </Text>
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

          }}> 
            
            {/*Show if false*/}
            <TouchableOpacity onPress={() => onPressHandler(item)} style={{opacity: op}}>

            {item.format === "video" ? <Video 
                  ref={video}
                  style={styles.video}
                  source={{
                  uri: item.videoURI,
                  }}
                  resizeMode="cover"
              />
              : <Image
                    style={styles.video}
                    source={{uri: item.videoURI}}
                    //onError={(e) => console.log(e)}
                    
              />
                  }
            </TouchableOpacity>  

            {/*Show if true*/} 

            {/* {pressedTracker[item.id] && <TouchableOpacity onPress={() => onPressHandler(item)} >

            {item.format === "video" ? <Video 
                  ref={video}
                  style={styles.video2}
                  source={{
                  uri: item.videoURI,
                  }}
                  resizeMode="cover"
              />
              : <Image
                    style={styles.video2}
                    source={{uri: item.videoURI}}
                    //onError={(e) => console.log(e)}
                    
              />
                  }
            </TouchableOpacity> }  */}
        


        </View>
      )}
      //Setting the number of column
      numColumns={2}
      keyExtractor={(item, index) => index}
    />



    {isPressed !== 0 && <TouchableOpacity activeOpacity={0.5} onPress={goToNextScreen}>
          <Image 
          source={require('../assets/createAlbumBtn.png')}
          style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}
          />
      </TouchableOpacity>}


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
  video2: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width)/2 - 8,
    height: 200,
    opacity: 0.5
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
});
