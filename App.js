import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import pic1 from './assets/pic1.png';
 
import MyTabs from './components/BottomNavBar';

export default function App() {
  const [isLaunch, setisLaunch] = useState(true);

  const setData =  async () => {

    if (isLaunch) {
      clearAsyncStorage = async() => {
          AsyncStorage.clear();
        }
    
        clearAsyncStorage();

        const pic1URI = Image.resolveAssetSource(pic1).uri;
        // const pic2URI = Image.resolveAssetSource(pic2).uri;

        // console.log(pic1URI);

        await AsyncStorage.setItem('1', JSON.stringify(['http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', "video", '0', ['Test Album']]));
        // await AsyncStorage.setItem('pic1', JSON.stringify([require('./assets/pic1.png'), "image", '0', ['Test Album']]));
        // await AsyncStorage.setItem('pic2', JSON.stringify([pic1, "image", '0', ['Test Album']]));
        await AsyncStorage.setItem('albums', JSON.stringify([["Comfort Album", "My Comforting album"], ["Dog Album", "The best"]]));

        setisLaunch(false);
    
    }
    

    // clearAsyncStorage = async() => {
    //   AsyncStorage.clear();
    // }

    // clearAsyncStorage();

  

    // try {
      //await AsyncStorage.setItem('1', JSON.stringify(['http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', "video", '0', ['Test Album']]));
      //await AsyncStorage.setItem('albums', JSON.stringify([["Comfort Album", "My Comforting album"], ["Dog Album", "The best"]]));
    //   console.log("uploaded");
    //   await AsyncStorage.setItem('2', JSON.stringify(['https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/20122208/Samoyed-standing-in-the-forest.jpg', 'picture']))
    // } catch {}
  }

  setData();
  
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
