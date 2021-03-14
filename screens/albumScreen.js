import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});

export default function AlbumScreen({navigation}) {
    return (
      <View style={{ sflex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Albums!</Text>
        <Image source={{ uri: 'file:///var/mobile/Containers/Data/Application/32260679-77E8-46AC-9B3E-89824FC06C19/Library/Caches/ExponentExperienceData/%2540anonymous%252FMemo-d58cbf8e-8670-4968-8897-827b23dbdafd/ImagePicker/178D9AA5-12F2-4787-AA1A-8DE564C90B39.jpg', }} style={{ width: 200, height: 200 }} />
        {/* <Image
        source={{
          uri: 'file:///var/mobile/Containers/Data/Application/32260679-77E8-46AC-9B3E-89824FC06C19/Library/Caches/ExponentExperienceData/%2540anonymous%252FMemo-d58cbf8e-8670-4968-8897-827b23dbdafd/ImagePicker/178D9AA5-12F2-4787-AA1A-8DE564C90B39.jpg',
        }}
      /> */}
      </View>
    );
  }