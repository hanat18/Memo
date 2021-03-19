import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Pressable, Text, View, Modal, Button, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar'
import {createReminderScreen} from './createReminderScreen'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { useNavigation, withNavigationFocus } from '@react-navigation/native';

let widths  = Dimensions.get('window').width -5;

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   // button: {
//   //   borderRadius: 20,
//   //   padding: 10,
//   //   elevation: 2
//   // },
//   // buttonOpen: {
//   //   backgroundColor: "#F194FF",
//   // },
//   // buttonClose: {
//   //   backgroundColor: "#2196F3",
//   // },
//   button: {
//     borderRadius: 5,
//     marginLeft: 26,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "grey",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   buttonGreyClose: {
//     backgroundColor: "#5B5B5B",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  backgroundImage : {
    width: widths,
  }, 
  rowButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 16,
  },
  rowPopup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  info: {
    marginLeft: 30,
    marginTop: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 80,
    width: 306,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    marginLeft: 26,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "grey",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonGreyClose: {
    backgroundColor: "#5B5B5B",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 86,
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubText: {
    marginBottom: 20,
    textAlign: "center",
  }
});

export default class RemindersScreen extends React.Component {
//   onSharePress = (shareOptions) => {
//     Share.share(shareOptions);  
//  }

  constructor(props) {
    super(props);
    console.log("PROPS IN REMINDER", props.route.params);
    this.state = {
      modalVisible: false,
      eventName: "",
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
          title: 'Visit Nancy',
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

    const setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    var checkSwitch=(param)=>{
  
      switch(param) {
  
        case 'Jan':
          return '01';
          break;
        
        case 'Feb':
          return '02';
          break;
  
        case 'Mar':
          return '03';
          break;
  
        case 'Apr':
          return '04';
          break;
  
        case 'May':
          return '05';
          break;

        case 'Jun':
          return '06';
          break;

        case 'Jul':
          return '07';
          break;

        case 'Aug':
          return '08';
          break;
        
        case 'Sep':
          return '09';
          break;

        case 'Oct':
          return '10';
          break;

        case 'Nov':
          return '11';
          break;

        case 'Dec':
          return '12';
          break;
    
        }
  
    }

    // console.log("PROPSPROPS", props.route.params.pickedDate.substring(4,7));

    if (props.route.params != null) {
      var startTime = props.route.params.pickedDate.substring(11,15) + "-" + checkSwitch(props.route.params.pickedDate.substring(4,7)) + "-"+props.route.params.pickedDate.substring(8,10) + ' ' +  props.route.params.pickedTime.substring(0,5) + ":00";
      var endTime = props.route.params.pickedDate.substring(11,15) + "-" + checkSwitch(props.route.params.pickedDate.substring(4,7)) + "-"+props.route.params.pickedDate.substring(8,10) + ' ' +  props.route.params.pickedTime.substring(0,3) + (parseInt(props.route.params.pickedTime.substring(3,5) , 10 ) + 30) + ":00";
      console.log("endTime: ", startTime);
      var newEvent = {
        start: startTime,
        end: endTime,
        title: props.route.params.title,
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
      console.log("All events", this.state.events);
    }

  }

  // componentDidMount() {
  //   console.log('First this called');
  //   // const { navigation } = this.props;
  //   // this.focusListener = navigation.addListener("didFocus", () => {
  //   //   console.log("I am focused - Reminders")
  //   // });
  // }

  _eventTapped(event) {
    // return (
    //   const { modalVisible } = this.state;
    //   return (
    //     <View style={styles.centeredView}>
    //       <Modal
    //         animationType="slide"
    //         transparent={true}
    //         visible={modalVisible}
    //         onRequestClose={() => {
    //           Alert.alert("Modal has been closed.");
    //           this.setModalVisible(!modalVisible);
    //         }}
    //       >
    //         <View style={styles.centeredView}>
    //           <View style={styles.modalView}>
    //             <Text style={styles.modalText}>Hello World!</Text>
    //             <Pressable
    //               style={[styles.button, styles.buttonClose]}
    //               onPress={() => this.setModalVisible(!modalVisible)}
    //             >
    //               <Text style={styles.textStyle}>Hide Modal</Text>
    //             </Pressable>
    //           </View>
    //         </View>
    //       </Modal>
    //       <Pressable
    //         style={[styles.button, styles.buttonOpen]}
    //         onPress={() => this.setModalVisible(true)}
    //       >
    //         <Text style={styles.textStyle}>Show Modal</Text>
    //       </Pressable>
    //     </View>
    //   );
    // }
    // return( 
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     // backgroundImage={!modalVisible && require('../assets/blur.png')}
    //     visible={this.state.modalVisible}
    //     // onRequestClose={() => {
    //     //   Alert.alert("Modal has been closed.");
    //     //   setModalVisible(!modalVisible);
    //     // }}
    //   >
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>
    //         <Text style={styles.modalTextTitle}>Are you sure?</Text>
    //         <Text style={styles.modalSubText}>You're about to call your caregiver</Text>
    //         <View style={styles.rowPopup}> 
    //         <TouchableOpacity
    //           style={[styles.button, styles.buttonGreyClose]}
    //           onPress={() => setModalVisible(!modalVisible)}
    //         >
    //           <Text style={styles.textStyle}>Cancel</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={[styles.button, styles.buttonClose]}
    //           onPress={() => setModalVisible(!modalVisible)}
    //         >
    //           <Text style={styles.textStyle} >Call</Text>
              
    //         </TouchableOpacity>
    //         </View>

    //       </View>
    //     </View>
    //   </Modal>
    // )
    // Alert.alert(event.title);
    // alert(JSON.stringify(event));
  }

  // _onTap = (item) => {
  //   console.log("Before", item);
  //   // this.setState({
  //   //   modalVisible: true,
  //   // });
  //   console.log("After", item);
  // }

  setModalVisible = (visible, name) => {
    this.setState({ modalVisible: visible });
    this.setState({ eventName: name})
  }

  removeEvent = (name) => {
    // var array = [...this.state.events]; // make a separate copy of the array
    // const [found] = array.events.filter(item => item.title === name);
    // var index = this.events.indexOf(found);
    // if (index !== -1) {
    //   array.splice(index, 1);
    //   this.setState({events: array});
    // }
    var tempObj = {};
    var finalArray = [];
    for (var i = 0; i < this.state.events.length; i++) {
      var item = this.state.events[i];
      console.log(item.title);
      if(item.title !== name){
        console.log("TITLEE? ", item.title);
        tempObj = {
          'end': item.end,
          "start": item.start,
          "summary": item.summary,
          "title": item.title,
        }
      }
      finalArray.push(tempObj);
    };
    console.log(finalArray);
    this.setState({ events: finalArray });

    // var tempObj = {};
    // if (result != null && post != "albums") {
    //   tempObj = {
    //     'end': post,
    //     "start": content[0],
    //     "format": content[1],
    //     "triggerWarning": content[2],
    //   }
    //   //Dynamically creates a "toRender" object and stores it in state
    //   finalArray.push(tempObj)
    //   //console.log("tempObj", tempObj)
    //   }
    console.log(name);
    // const eventFound = this.state.events.filter((item) => item.inclu == name);
    // const eventFound = getItem(this.state.events, eventName);
    // console.log("FOUND: ", this.state.events.filter((item)));
    // const indes = this.state.events.indexOf(found)
    // const newList = this.state.events.splice(this.state.events.indexOf(found), 1);
    // console.log("FOUND: ", indes);
    this.setState({ modalVisible: false });
    // this.state.events.splice(this.state.events.getItem indexOf(name), 1);
  }

  render() {
    const { modalVisible } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingBottom: 25, backgroundColor: '#ffff',}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Are you sure?</Text>
            <Text style={styles.modalSubText}>You're about to delete '{this.state.eventName}'?</Text>
            <View style={styles.rowPopup}> 
            <TouchableOpacity
              style={[styles.button, styles.buttonGreyClose]}
            >
              <Text style={styles.textStyle} onPress={() => this.setModalVisible(!modalVisible)}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.removeEvent(this.state.eventName)}
            >
              <Text style={styles.textStyle} >Delete</Text>
              
            </TouchableOpacity>
              {/* <Text style={styles.modalText}>{item.title}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
            </View>
            </View>
          </View>
        </Modal>
        {/* this._eventTapped.bind(this) */}
        <EventCalendar
          // eventTapped={this._onTap.bind(this)}
          eventTapped={(item) => {
            this.setModalVisible(true, item.title);
            console.log("Before", item.title);
            console.log("After", item.title);
          }}
          events={this.state.events}
          width={widths}
          initDate={'2021-03-19'}
          scrollToFirst
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