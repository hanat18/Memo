import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Platform, Text, View, Button, SafeAreaView, Flexbox, ScrollView, Modal, Alert, FlatList, Dimensions, TouchableHighlight  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height - 180,
    position: 'absolute',
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 40,
    fontSize: 32,
  },
  subtitle: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    fontSize: 20,
  }, 
});

export default function createAlbumScreen({ navigation }) {
  const video = React.useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [finishLoading, setfinishLoading] = useState(false);
  const [toRender, setToRender] = useState([]);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       console.log("I am focused")
//       const loadData =  async () => {
//         var keys; 
//         var tempObj = {};
//         var finalArray = [];
        
  
//         try {
//           keys = await AsyncStorage.getAllKeys()
//           //console.log("keys", keys)
//         } catch{}
          
//         //Loops through all keys and retrieves the attaches URIs
        
//         for (var i = 0; i < keys.length; i++) {
//           let post = keys[i];
//           //console.log("post", post)
          
//           try {
//             result = await AsyncStorage.getItem(post);
//             var content = JSON.parse(result);

//             // console.log("fetching trigger warning....", content[2])
//             // triggerWarning = content[2];
//             // if (triggerWarning != 0){
//             //   setModalVisible(true);
//             // }
    
  
//             if (result != null) {
//               tempObj = {
//                 'id': post,
//                 "videoURI": content[0],
//                 "format": content[1],
//                 "triggerWarning": content[2],
//               }
//               //Dynamically creates a "toRender" object and stores it in state
//               finalArray.push(tempObj)
//               //console.log("tempObj", tempObj)
//               }
            
            
//           } catch(e){
//             //console.log("ERROR: ", e)
//           }
//         }
  
//         setToRender(finalArray);
//         console.log("Create Album Data", finalArray);
//         setfinishLoading(true);
//       }
  
//       loadData();
//     });
//     return unsubscribe;
//   }, [navigation]);
  

  return (
      <View>
          <TouchableHighlight style={{justifyContent: 'center'}} >
            <Video 
                ref={video}
                shouldPlay={false}
                resizeMode="contain"
                source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                // onError={(e) => console.log(item.videoURI)}
            />
           </TouchableHighlight>

        </View>

  );
}

/* <Text style={styles.title}> My Memory Albums</Text>
      <FlatList
        data={toRender}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginBottom: 40,
              maxWidth: (Dimensions.get('window').width)/2,
              alignItems: 'center',
            }}>

            <Video 
                // ref={video}
                style={styles.imageThumbnail}
                // shouldPlay={false}
                source={{uri: item.videoURI}}
                onError={(e) => console.log(item.videoURI)}
            />
            {console.log("J")}
            <Text style={styles.subtitle}> {item.id}</Text>
          </View>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      /> */

