import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/homeScreen';
import CreateScreen from '../screens/createScreen';
import AlbumScreen from '../screens/albumScreen';
import RemindersScreen from '../screens/remindersScreen';
import ProfileScreen from '../screens/profileScreen';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';


import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
 return (
   <HomeStack.Navigator
    screenOptions = {{
      headerTitle: "memo",
      headerTintColor: "#3AA1F6",
      headerStyle: {
        backgroundColor: '#E8E8E8',
        height: 100,
      },
      headerTitleStyle: {
        fontSize: 40,
        fontWeight: "300",
      }
    }}
   
   >
    <HomeStack.Screen name="Home" component={HomeScreen} />   
    <HomeStack.Screen name="Albums" component={AlbumScreen} />   
    <HomeStack.Screen name="Create" component={CreateScreen} />        
   </HomeStack.Navigator>
  );
}
const CreateStack = createStackNavigator();
function CreateStackScreen() {
  return (
    <CreateStack.Navigator
    screenOptions = {{
      headerTitle: "memo",
      headerTintColor: "#3AA1F6",
      headerStyle: {
        backgroundColor: '#E8E8E8',
        height: 100,
      },
      headerTitleStyle: {
        fontSize: 40,
        fontWeight: "300",
      }
    }}
    
    >
      <CreateStack.Screen name="Create" component={CreateScreen} />
      <CreateStack.Screen name="Home" component={HomeScreen} />
      <CreateStack.Screen name="Albums" component={AlbumScreen} />
    </CreateStack.Navigator>
  );
}
const AlbumStack = createStackNavigator();
function AlbumStackScreen() {
  return (
    <AlbumStack.Navigator
    screenOptions = {{
      headerTitle: "memo",
      headerTintColor: "#3AA1F6",
      headerStyle: {
        backgroundColor: '#E8E8E8',
        height: 100,
      },
      headerTitleStyle: {
        fontSize: 40,
        fontWeight: "300",
      }
    }}
    
    >

      <AlbumStack.Screen name="Albums" component={AlbumScreen} />
      {/* <AlbumStack.Screen name="Albums" component={CreateScreen} /> */}
    </AlbumStack.Navigator>
  );
}

const RemindersStack = createStackNavigator();
function RemindersStackScreen() {
  return (
    <RemindersStack.Navigator
    screenOptions = {{
      headerTitle: "memo",
      headerTintColor: "#3AA1F6",
      headerStyle: {
        backgroundColor: '#E8E8E8',
        height: 100,
      },
      headerTitleStyle: {
        fontSize: 40,
        fontWeight: "300",
      }
    }}
    
    >
    <RemindersStack.Screen name="Reminders" component={RemindersScreen} />
    </RemindersStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
    screenOptions = {{
      headerTitle: "memo",
      headerTintColor: "#3AA1F6",
      headerStyle: {
        backgroundColor: '#E8E8E8',
        height: 100,
      },
      headerTitleStyle: {
        fontSize: 40,
        fontWeight: "300",
      }
    }}
    
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeTab") {
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (route.name === "Albums") {
              iconName = focused ? 'copy-outline' : 'copy-outline';
            } else if (route.name === "Create") {
              iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
            } else if (route.name === "Reminders") {
              iconName = focused ? 'notifications-outline' : 'notifications-outline';
            } else if (route.name === "Profile") {
              iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
            } 

            return <Ionicons name={iconName} size={route.name === "Create" ? 50 : 30} color={color} />
          }
        })}

        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#3AA1F6',
          inactiveTintColor: 'black',
          style: {
            backgroundColor: '#E8E8E8',
          }
          
        }}
      >
      <Tab.Screen name="HomeTab" component={HomeStackScreen} />
      <Tab.Screen name="Albums" component={AlbumStackScreen} />
      <Tab.Screen name="Create" component={CreateStackScreen} />
      <Tab.Screen name="Reminders" component={RemindersStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

