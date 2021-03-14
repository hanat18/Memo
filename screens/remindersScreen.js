import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar'
import {createReminderScreen} from './createReminderScreen'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

let { width } = Dimensions.get('window');

export default class RemindersScreen extends React.Component {

  onSharePress = (shareOptions) => {
    Share.share(shareOptions);  
 }

  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: '2017-09-06 22:30:00',
          end: '2017-09-06 23:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: 'green',
        },
        {
          start: '2017-09-07 00:30:00',
          end: '2017-09-07 01:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 01:30:00',
          end: '2017-09-07 02:20:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 04:10:00',
          end: '2017-09-07 04:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 01:05:00',
          end: '2017-09-07 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 14:30:00',
          end: '2017-09-07 16:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 01:20:00',
          end: '2017-09-08 02:20:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 04:10:00',
          end: '2017-09-08 04:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 00:45:00',
          end: '2017-09-08 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 11:30:00',
          end: '2017-09-08 12:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 01:30:00',
          end: '2017-09-09 02:00:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 03:10:00',
          end: '2017-09-09 03:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 00:10:00',
          end: '2017-09-09 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-10 12:10:00',
          end: '2017-09-10 13:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
      ],
    };
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
          initDate={'2020-03-19'}
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


// export default function remindersScreen(props) {
//   const navigation = useNavigation();

//   return <remindersScreenClass {...props} navigation={navigation} />;
// }