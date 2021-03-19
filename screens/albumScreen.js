import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Platform, Text, View, Button, SafeAreaView, Flexbox, ScrollView, Modal, Alert, FlatList, Dimensions  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default function AlbumScreen({ navigation }) {
  const [dataSource, setDataSource] = useState([]);
  const [finishLoading, setfinishLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log("I am focused");
      const loadData =  async () => {
        var keys; 
        var tempObj = {};
        var albumArray = [];
        try {
          var result = await AsyncStorage.getItem("albums");
          albumArray = JSON.parse(result);
          console.log("The Albums in this page", albumArray);
        } catch{}



        if (albumArray.length != 0) {
          let items = Array.apply(null, Array(albumArray.length)).map((v, i) => {
            return {
              title: albumArray[i][0],
              description: albumArray[i][1],
            };
          });

          setDataSource(items);
          
        }
          
      }

      loadData();


    });
    return unsubscribe;
  }, [navigation]);
  


  // useEffect(() => {
  //   let items = Array.apply(null, Array(3)).map((v, i) => {
  //     return {
  //       title: "Album #" + (i + 1),
  //     };
  //   });
  //   setDataSource(items);
  // }, []);

  // dataSource Array [
  //   Object {
  //     "id": 0,
  //     "src": "http://placehold.it/200x200?text=1",
  //     "title": "Album #1",
  //   },
  //   Object {
  //     "id": 1,
  //     "src": "http://placehold.it/200x200?text=2",
  //     "title": "Album #2",
  //   },
  //   Object {
  //     "id": 2,
  //     "src": "http://placehold.it/200x200?text=3",
  //     "title": "Album #3",
  //   },
  // ]





  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}> My Memory Albums</Text>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginBottom: 40,
              maxWidth: (Dimensions.get('window').width)/2,
              alignItems: 'center',
            }}>

          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('ViewAlbum',{
            albumName: item.title,
            albumDescription: item.description,
          })}>
            
            <Image
              style={styles.imageThumbnail}
              source={require('../assets/album.png')}
            />
          </TouchableOpacity>


            <Text style={styles.subtitle}> {item.title}</Text>
          </View>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />

    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('CreateAlbum')}>
          <Image 
          source={require('../assets/createAlbumBtn.png')}
          style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}
          />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

