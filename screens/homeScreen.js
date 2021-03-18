import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ImageComponent, IconButton, FlatList, Dimensions, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AlbumScreen from '../screens/albumScreen';
import Post from "../components/posts";
import posts from "../data/samplePosts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../components/storage';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

export default function HomeScreen({ navigation }) {
  const [finishLoading, setfinishLoading] = useState(false);
  const [toRender, setToRender] = useState([]);
  let triggerWarning = 0;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("I am focused")
      const loadData =  async () => {
        var keys; 
        var tempObj = {};
        var finalArray = [];
        
  
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

            // console.log("fetching trigger warning....", content[2])
            // triggerWarning = content[2];
            // if (triggerWarning != 0){
            //   setModalVisible(true);
            // }
    
  
            if (result != null) {
              tempObj = {
                'id': post,
                "videoURI": content[0],
                "format": content[1],
                "triggerWarning": content[2],
              }
              //Dynamically creates a "toRender" object and stores it in state
              finalArray.push(tempObj)
              //console.log("tempObj", tempObj)
              }
            
            
          } catch(e){
            //console.log("ERROR: ", e)
          }
        }
  
        setToRender(finalArray);
        // console.log("finalArray", finalArray);
        setfinishLoading(true);
      }
  
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  

  // useEffect (() => {
  //   console.log("RETURNING FROM CREATE: ", newPost);
  // }, [newURI]);


  // useEffect(() => {
  //   const loadData =  async () => {
  //     var keys; 
  //     var uri;
  //     var tempObj = {};
  //     var finalArray = [];

  //     try {
  //       keys = await AsyncStorage.getAllKeys()
  //     } catch{}
        
  //     //Loops through all keys and retrieves the attaches URIs
  //     for (var i = 0; i < keys.length; i++) {
  //       let post = keys[i];
        
  //       try {
  //         result = await AsyncStorage.getItem(post);
  //         var content = JSON.parse(result);

  //         if (result != null) {
  //           tempObj = {
  //             'id': post,
  //             "videoURI": content[0],
  //             "format": content[1],
  //           }
  //           //Dynamically creates a "toRender" object and stores it in state
  //           finalArray.push(tempObj)
  //           //console.log("tempObj", tempObj)
  //           }
          
          
  //       } catch(e){
  //         //console.log("ERROR: ", e)
  //       }
  //     }

  //     setToRender(finalArray);
  //     console.log("finalArray", finalArray);
  //     setfinishLoading(true);
  //   }

  //   loadData();
  // }, [newPost, newPostCreated]);

  const Item = ({ title }) => (
      <Post info={title}>{title}</Post>

  );

  // const showTrigger = (level) => {
  //   // console.log("****** IN showTrigger()", level);
  //   <Modal
  //       animationType="slide"
  //       // transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         Alert.alert("Modal has been closed.");
  //         setModalVisible(!modalVisible);
  //       }}
  //     >
  //       <View style={styles.centeredView}>
  //         <View style={styles.modalView}>
  //           <Text style={styles.modalTextTitle}>Trigger Warning!</Text>
  //           <Text style={styles.modalSubText}>This Memo has been assigned a trigger warning of level {level}. Would you like to view the Memo?</Text>
  //           <View style={styles.rowPopup}> 
  //           <TouchableOpacity
  //             style={[styles.button, styles.buttonGreyClose]}
  //             onPress={() => setModalVisible(!modalVisible)}
  //           >
  //             <Text style={styles.textStyle}>Cancel</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={[styles.button, styles.buttonClose]}
  //             onPress={() => setModalVisible(!modalVisible)}
  //           >
  //             <Text style={styles.textStyle} onPress={renderPost()}>View Memo</Text>
              
  //           </TouchableOpacity>
  //           </View>

  //         </View>
  //       </View>
  //     </Modal>
  //     renderPost();
  // }

  const renderPost = () => {
    // console.log("++++++++ IN renderpost()", triggerWarning);
    return <FlatList
        data={toRender}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval = {Dimensions.get('window').height - 180}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
  }


  const renderItem = ({ item }) => (
    <Item title={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* {triggerWarning != 0 ? showTrigger(triggerWarning) : renderPost()} */}
      {renderPost()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});