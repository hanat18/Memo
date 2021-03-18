import React, {useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity, Modal, Button, SafeAreaView } from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useReducer } from 'react';

const Post = (props) => {
    const video = React.useRef(null);
    const [post, setPost] = useState(props.post);
    const [status, setStatus] = React.useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // console.log("Triigger Warning: ", props.children.triggerWarning);
    // console.log("hi", modalVisible)
    // if (props.children.triggerWarning != 0){
    //   setModalVisible(true);
    // }

  
    return (
        <View style={styles.container}>

       {props.children.triggerWarning != 0 && <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Trigger Warning!</Text>
            <Text style={styles.modalSubText}>This Memo has been assigned a trigger warning of level {props.children.triggerWarning}. Would you like to view the Memo?</Text>
            <View style={styles.rowPopup}> 
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonGreyClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle} onPress={setModalVisible(!modalVisible)}>View Memo</Text>
              
            </TouchableOpacity> */}
            </View>

          </View>
        </View>
      </Modal> }

        <TouchableWithoutFeedback style={{justifyContent: 'center'}} onPress={() => {status.isPlaying && video != null ? video.current.pauseAsync() : video.current.playAsync()}} >
              {props.children.format === "video" ? <Video 
                  ref={video}
                  style={styles.video}
                  shouldPlay={isPlaying}
                  source={{uri: props.children.videoURI}}
                  isLooping
                  onError={(e) => console.log(e)}
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                  resizeMode={'cover'}
              />
              : <Image
                    style={styles.video}
                    source={{uri: props.children.videoURI}}
                    //onError={(e) => console.log(e)}
              />
                  }

              

          </TouchableWithoutFeedback>
          <View style={styles.uiContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {setIsPlaying(!isPlaying)}}>
              <Image
              //onPress={() => {setIsPlaying(!isPlaying)}}
              source={isPlaying ? require('../assets/pause_audio.png') : require('../assets/play_audio.png')}
              style={{alignSelf: 'center'}}
              />
          </TouchableOpacity>
          </View>
          
                
          
        </View>
  );
};


          {/* <View style = {{paddingTop: 12}}>
            <Image
                //onPress={() => {setIsPlaying(!isPlaying)}}
                source={require('../assets/tag.png')}
                style={{alignSelf: 'center'}}
                Text='comfort album'
                />
          </View> */}
          
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: Dimensions.get('window').height - 180,
    },
    videPlayButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 100,
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    uiContainer: {
      height: '100%',
      justifyContent: 'flex-end',
      paddingBottom: 8,
      paddingLeft: 4,
    },
    bottomContainer: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    handle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 10,
    },
    description: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 10,
    },
    songRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    songName: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 5,
    },
  
    songImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 5,
      borderColor: '#4c4c4c',
    },
  
    //  right container
    rightContainer: {
      alignSelf: 'flex-end',
      height: 300,
      justifyContent: 'space-between',
      marginRight: 5,
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#fff',
    },
  
    iconContainer: {
      alignItems: 'center',
    },
    statsLabel: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginTop: 5,
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
    rowPopup: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
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
  });

export default Post;