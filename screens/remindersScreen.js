import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar'
import {createReminderScreen} from './createReminderScreen'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { useNavigation, withNavigationFocus } from '@react-navigation/native';
import { add } from 'react-native-reanimated';

let { width } = Dimensions.get('window');

export default class RemindersScreen extends React.Component {
  onSharePress = (shareOptions) => {
    Share.share(shareOptions);  
 }

  constructor(props) {
    super(props);
    console.log("PROPS IN REMINDER", props);
    this.state = {
      events: [
        {
          start: '2021-03-17 22:30:00',
          end: '2021-03-17 23:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: 'green',
        },
        {
          start: '2021-03-17 00:30:00',
          end: '2021-03-17 01:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-17 01:30:00',
          end: '2021-03-17 02:20:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-17 04:10:00',
          end: '2021-03-17 04:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-17 01:05:00',
          end: '2021-03-17 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-17 14:30:00',
          end: '2021-03-17 16:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-18 01:20:00',
          end: '2021-03-18 02:20:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-18 04:10:00',
          end: '2021-03-18 04:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-18 00:45:00',
          end: '2021-03-18 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-18 11:30:00',
          end: '2021-03-18 12:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-19 01:30:00',
          end: '2021-03-19 02:00:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-19 03:10:00',
          end: '2021-03-19 03:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-19 00:10:00',
          end: '2021-03-19 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2021-03-20 12:10:00',
          end: '2021-03-20 13:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
      ],
    };

    console.log("PROPSPROPS", props.route.params)

    if (props.route.params != null) {
      var newEvent = {
        start: props.route.params.pickedDate,
        end: '',
        title: props.route.params.title ,
        summary: "",
  
      }
      
      const addItem = (item) => {
        console.log("Adding new event to list");
        this.state = {
          events: [
            ...this.state.events,
            item 
          ]
        }
      }

      addItem(newEvent);
      console.log("Added", newEvent);

    }

  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("I am focused - Reminders")
    });
  }

  _eventTapped(event) {
    alert(JSON.stringify(event));
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingBottom: 25, backgroundColor: '#ffff',}}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.events}
          width={width}
          initDate={'2021-03-19'}
          scrollToFirst
          upperCaseHeader
          uppercase
          scrollToFirst={false}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('CreateReminder')}>
          <Image 
          source={require('../assets/new_reminder.png')}
          style={{alignSelf: 'center', marginTop: 20,}}
          />
      </TouchableOpacity>
      </View>
    );
  }
}