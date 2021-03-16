import React, {useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useReducer } from 'react';

const Post = (props) => {
    const video = React.useRef(null);
    const [post, setPost] = useState(props.post);
    const [status, setStatus] = React.useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    // console.log("POST N: ", props);
    // console.log("hi")
  
    return (
        <View style={styles.container}>

        <TouchableWithoutFeedback style={{justifyContent: 'center'}} onPress={() => {status.isPlaying && video != null ? video.current.pauseAsync() : video.current.playAsync()}} >
              {props.children.format === "video" ? <Video 
                  ref={video}
                  style={styles.video}
                  shouldPlay='true'
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
  });

export default Post;