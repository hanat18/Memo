
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ImageComponent, IconButton, FlatList, Dimensions, SafeAreaView } from 'react-native';
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


  const [toRender, setToRender] = useState({data:[]});
  const [isLoading, setisLoading] = useState(false);

  // const DATA = [
  //     {
  //       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //       title: 'First Item',
  //       videoURI: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //     },
  //     {
  //       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //       title: 'Second Item',
  //       videoURI: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  //     },
  //     {
  //       id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //       title: 'Third Item',
  //       videoURI: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
  //     },
  //   ];


  //Here, we are loading in the preset posts (initially set in App.js)
    const loadData =  async () => {
      var keys; 
      var uri;

      try {
        keys = await AsyncStorage.getAllKeys()
      } catch{}
        

      for (var i = 0; i < keys.length; i++) {
        let post = keys[i];
        

        try {
          uri = await AsyncStorage.getItem(post);
          
          
        } catch{}

        if (uri != null){
            // setToRender({
            //   data: [...toRender.data.videoURI, ...posts.uri],
            // })
            tempObj = {
            'id': post,
            "videoURI": uri,
          }
          toRender.push(tempObj)
        }
        
      }

      setisLoading(true);
    }

    
    loadData();
    
  
  
  // const Item = ({ title }) => (
  //     <Post uri={title}>{title}</Post>
  // );

  // const renderItem = ({ item }) => (
  //   <Item title={item.videoURI} />
  // );

  if (isRender.length === 0) {
    <View>
      No posts yet!
      </View>

  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={toRender}
          renderItem={({item}) =>
          <Post uri={item.videoURI}>{item.videoURI}</Post>
        }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          snapToInterval = {Dimensions.get('window').height - 180}
          snapToAlignment={'start'}
          decelerationRate={'fast'}
        />
      </SafeAreaView>
    );

  }
  // return (
    
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
      

      {/* //<Post></Post> */}
      
      {/* <FlatList 
        data = {posts}
        renderItem={() => <Post></Post> }
        // renderItem={({item}) => <Post post={item} />}
        showVerticalScrollIndicator = {false}
        snapToInterval = {Dimensions.get('window').height - 80}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      /> */}

    
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

// export default function HomeScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text> 
//       </View>
//     );
//   }

