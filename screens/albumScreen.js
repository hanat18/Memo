// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
// import RNPhotosFramework from 'react-native-photos-framework';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 10,
//   },
// });

// export default function AlbumScreen({navigation}) {
//     return (
//       <View style={{ sflex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Albums!</Text>
//         <Image source={{ uri: 'file:///var/mobile/Containers/Data/Application/32260679-77E8-46AC-9B3E-89824FC06C19/Library/Caches/ExponentExperienceData/%2540anonymous%252FMemo-d58cbf8e-8670-4968-8897-827b23dbdafd/ImagePicker/178D9AA5-12F2-4787-AA1A-8DE564C90B39.jpg', }} style={{ width: 200, height: 200 }} />
//         {/* <Image
//         source={{
//           uri: 'file:///var/mobile/Containers/Data/Application/32260679-77E8-46AC-9B3E-89824FC06C19/Library/Caches/ExponentExperienceData/%2540anonymous%252FMemo-d58cbf8e-8670-4968-8897-827b23dbdafd/ImagePicker/178D9AA5-12F2-4787-AA1A-8DE564C90B39.jpg',
//         }}
//       /> */}
//       </View>
//     );
//   }


import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
// import RNPhotosFramework from 'react-native-photos-framework';

export default class albumScreen extends Component {

    constructor() {
      super();
      this.state = {
        images : []
      };
    }

    // componentDidMount() {
    //     RNPhotosFramework.requestAuthorization().then((statusObj) => {
    //         if (statusObj.isAuthorized) {
    //             RNPhotosFramework.getAlbums({
    //                 type: 'smartAlbum',
    //                 subType: 'smartAlbumUserLibrary',
    //                 assetCount: 'exact',
    //                 fetchOptions: {
    //                     sortDescriptors: [
    //                         {
    //                             key: 'title',
    //                             ascending: true
    //                         }
    //                     ],
    //                     includeHiddenAssets: false,
    //                     includeAllBurstAssets: false
    //                 },
    //                 //When you say 'trackInsertsAndDeletes or trackChanges' for an albums query result,
    //                 //They will be cached and tracking will start.
    //                 //Call queryResult.stopTracking() to stop this. ex. on componentDidUnmount
    //                 trackInsertsAndDeletes: true,
    //                 trackChanges: false

    //             }).then((queryResult) => {
    //                 const album = queryResult.albums[0];
    //                 return album.getAssets({
    //                     //The fetch-options from the outer query will apply here, if we get
    //                     startIndex: 0,
    //                     endIndex: 10,
    //                     //When you say 'trackInsertsAndDeletes or trackAssetsChange' for an albums assets,
    //                     //They will be cached and tracking will start.
    //                     //Call album.stopTracking() to stop this. ex. on componentDidUnmount
    //                     trackInsertsAndDeletes: true,
    //                     trackChanges: false
    //                 }).then((response) => {
    //                     this.setState({
    //                       images : response.assets
    //                     });
    //                 });
    //             });
    //         }
    //     });
    // }

    renderImage(asset, index) {
      return (
        <Image key={index} source={asset.image} style={{width : 100, height : 100}}></Image>
      );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.images.map(this.renderImage.bind(this))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('albumScreen', () => albumScreen);