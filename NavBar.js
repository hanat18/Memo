import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NavigationBar from 'react-native-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default class BottomNavBar extends Component {
  render() {
      
      const Tab = createBottomTabNavigator();
      
      function MyTabs() {
        return (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        );
      }
    return (
      <View>
        <NavigationBar 
          title='Main title'
          height={50}
          leftButtonTitle='back'
          rightButtonTitle='forward'
        />
        <Text>ABC</Text>
      </View>
    );
  }
}