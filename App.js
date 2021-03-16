import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import MyTabs from './components/BottomNavBar';

export default function App() {

  const setData =  async () => {

    clearAsyncStorage = async() => {
      AsyncStorage.clear();
    }

    clearAsyncStorage();

  

    // try {
      await AsyncStorage.setItem('1', JSON.stringify(['http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', "video"]));
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
