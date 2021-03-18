import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, SafeAreaView, Switch, TouchableOpacity, Image, Alert } from 'react-native';
import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      paddingTop: 30,
      paddingBottom: 0,
      fontSize: 32,
    },
    textEntry: {
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 26,
      marginBottom: 16,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 5,
      width: 326,
      height: 50,
      borderStyle: 'solid',
      
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
    buttonPicker: {
        alignItems: 'center',
        backgroundColor: '#3AA1F6',
        padding: 20,
        margin: 20,
        borderRadius: 15,
    },
    subtitle: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        paddingTop: 32,
        paddingBottom: 8,
        paddingLeft: 8,
        fontSize: 20,
      }, 
      buttonText: {
          color: "#ffffff",
      }
  });



export default function finalizeAlbumScreen({navigation}){
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [postsToAdd, setPostsToAdd] = useState(); 

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const loadData =  async () => {
                var test = await AsyncStorage.getItem("albums");
            }

            loadData();
          
              
              
        });
        return unsubscribe;
      }, [navigation]);

    const goAlbumScreen =  async () => {
        var keys;
        var result;

        try {
            keys = await AsyncStorage.getAllKeys()
          } catch{}

          for (var i = 0; i < keys.length; i++) {
            let post = keys[i];
            
            try {
              result = await AsyncStorage.getItem(post);
              var content = JSON.parse(result);

                if (result != null && post != "albums") {
                    var updatedAlbumMem = content[3]; 
                     
                
                    if (postsToAdd.includes(post)) {
                        var currAlbums = albumMem; 
                        currAlbums.push[title];
                        updatedAlbumMem = currAlbums;

                        var newData = [content[0], content[1], content[2], updatedAlbumMem];

                        await AsyncStorage.setItem(post, JSON.stringify(newData));

                    }
            }
              
              
            } catch(e){
              //console.log("ERROR: ", e)
            }
          }
        
        //Creating a new album in our album key
        try {
            var result = await AsyncStorage.getItem("albums");
            //console.log("The albums i received", result);
            var content = JSON.parse(result);
            var currAlbums = content;
            currAlbums.push([title, description]);
            //console.log("Albums im about to push", currAlbums);
            try {
                var test = await AsyncStorage.removeItem("albums");

                try {
                    var test2 = await AsyncStorage.setItem("albums", JSON.stringify(currAlbums));

                } catch {

                }

            } catch {

            }
        



            
        } catch {}

        //Going through and updating our posts
        Alert.alert("Success! \n You have successfully created your album!");
        navigation.navigate('Albums');

      

    
    
      }



    return(
        <SafeAreaView>
            <View>
            <Text style={styles.title}> Create your Album</Text>
            <TextInput style={styles.textEntry} placeholder="album title..." onChangeText={(albumTitle) => {setTitle(albumTitle);}}></TextInput>
            <TextInput style={styles.textEntry} placeholder="description..." onChangeText={(albumDesc) => {setDescription(albumDesc);}}></TextInput>

            
            <View>
                <TouchableOpacity activeOpacity={0.5} onPress={goAlbumScreen}>
                    <Image
                    source={require('../assets/Create.png')}
                    style={{alignSelf: 'center', marginTop: 26,}}
                    />
                </TouchableOpacity>
            </View> 
            </View>
                
        </SafeAreaView>
    );
}