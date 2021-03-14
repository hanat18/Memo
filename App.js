import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import MyTabs from './components/BottomNavBar';

export default function App() {

  const setData =  async () => {

    try {
      await AsyncStorage.setItem('posts', 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4');
      await AsyncStorage.setItem('posts', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
      await AsyncStorage.setItem('posts', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4');
    } catch {}
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
