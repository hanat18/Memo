import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Platform, Text, View, Button, SafeAreaView, Flexbox, ScrollView, Modal, Alert, FlatList, Dimensions, TouchableHighlight  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function viewAlbumScreen({route, navigation}) {
  const video = React.useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [finishLoading, setfinishLoading] = useState(false);
  const [toRender, setToRender] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [pressedTracker, setPressedTracker] = useState({});
  const [totalMemos, setTotalMemos] = useState(0);
  const [op, setOp] = useState(0);
  const { albumName, albumDescription } = route.params;
  const [numSelected, setNumSelected] = useState(0);


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
                console.log("Activated");
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
        setToRender(finalArray);
      }
  
      loadData();
    });
    return unsubscribe;
  }, [navigation, pressedTracker]);

  
    const onPressHandler = (item) => {
        if (op == 0){
            setOp(0.5);
        }else{
            setOp(0);
        }
    
        console.log("This is what pressedTracker looks like:\n", pressedTracker[item.id]);
        var tempObj = pressedTracker;
        tempObj[item.id] = !tempObj[item.id]
        setPressedTracker(tempObj);
        console.log("Second change", pressedTracker[item.id]);

    } 

    const deleteMemos =  async () => {
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
    <FlatList
      // style={{borderTopColor: 'black',
      // borderTopWidth: 1,}}
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
                uri: item.videoURI,
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
  }
});
