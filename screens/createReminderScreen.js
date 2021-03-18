import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, SafeAreaView, Switch, TouchableOpacity, Image, Alert } from 'react-native';
import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 10,
    },
    title: {
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      paddingTop: 30,
      paddingBottom: 0,
      fontSize: 32,
    },
    textEntry: {
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 26,
      marginBottom: 16,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 5,
      width: 326,
      height: 50,
      borderStyle: 'solid',
      
    }, 
    bottomButton: {
      position: 'absolute',
      bottom:0,
      left:0,
    },
    
    bottonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 18,
    },
    buttonPicker: {
        alignItems: 'center',
        backgroundColor: '#3AA1F6',
        padding: 20,
        margin: 20,
        borderRadius: 15,
    },
    subtitle: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        paddingTop: 32,
        paddingBottom: 8,
        paddingLeft: 8,
        fontSize: 20,
      }, 
      buttonText: {
          color: "#ffffff",
      }
  });

export default function createReminderScreen({navigation}){
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [pickedTime, setPickedTime] = useState("00:00");
    const [pickedDate, setPickedDate] = useState("MM/DD/YYYY");
    const [title, setTitle] = useState();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    useEffect(()=> {
        console.warn("A date has been picked: ", pickedDate);
        hideDatePicker();
    }, [pickedDate]);

    useEffect(()=> {
        console.warn("A time has been picked: ", pickedTime);
        hideTimePicker();
    }, [pickedTime]);

    const created =  async () => {
        let passing;
        try {
            
          passing = await AsyncStorage.setItem(title, JSON.stringify([pickedTime, pickedDate]));
        } catch {}
            console.log("*********TITLE", title);
            Alert.alert("Success! \n You have successfully created a new reminder.");
            navigation.navigate("Reminders", {
                title: title,
                pickedTime: pickedTime,
                pickedDate: pickedDate,
            });
        
      }


    return(
        <SafeAreaView>
            <Text style={styles.title}> Create A Reminder</Text>
            <TextInput style={styles.textEntry} placeholder="remind me to..." onChangeText={(reminder) => {setTitle(reminder);}}></TextInput>
            <View>
                <Text style={styles.subtitle}> Pick a day</Text>
                <TouchableOpacity
                    style={styles.buttonPicker}
                    onPress={() => {setDatePickerVisibility(true);}}
                    >
                    <Text style={styles.buttonText} onPress={showDatePicker} placeholder={"MM/DD/YY"}> {pickedDate} </Text>
                    
                </TouchableOpacity>      
                <DateTimePickerModal 
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(selected) => setPickedDate(selected.toDateString() )}
                    onCancel={() => {setDatePickerVisibility(false);}}
                />
            </View>

            <View>
                <Text style={styles.subtitle}> Pick a time</Text>
                <TouchableOpacity
                    style={styles.buttonPicker}
                    onPress={() => {setTimePickerVisibility(true);}}
                    >
                    <Text style={styles.buttonText} onPress={showDatePicker} placeholder={"00:00"}> {pickedTime} </Text>
                    
                </TouchableOpacity>      
                <DateTimePickerModal 
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={(selected) => setPickedTime(selected.toTimeString() )}
                    onCancel={() => {setTimePickerVisibility(false);}}
                />
            </View>

            
            
            <View>
                <TouchableOpacity activeOpacity={0.5} onPress={created}>
                    <Image
                    source={require('../assets/Create.png')}
                    style={{alignSelf: 'center', marginTop: 26,}}
                    />
                </TouchableOpacity>
            </View>
            <View></View> 
                
        </SafeAreaView>
    );
}