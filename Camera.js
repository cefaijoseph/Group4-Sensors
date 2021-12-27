import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
  const [hasPermission, setHasPermission] = useState();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null)
  const styles = StyleSheet.create({
    container: {

      flex: 1,
    },
    text: {
      fontSize: 20,
    },
    cam: {
      flex: 1,
    },

    button: {
      flexDirection: 'column'
    },

    buttonContainerFlip: {
      alignSelf: 'center',
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      flexDirection: 'row',


      padding: 20,
      justifyContent: 'space-between',
      width: 80,
      height: 70,
      bottom: 50,
      left: 0,
      borderRadius: 50,
      backgroundColor: '#fff'
    },

    buttonContainerCapture: {
      alignSelf: 'center',
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      flexDirection: 'row',


      padding: 20,
      justifyContent: 'space-between',
      width: 100,
      height: 70,
      bottom: 50,
      borderRadius: 50,
      backgroundColor: '#fff'
    },

  })

  //request premission to use camera
  useEffect(() => {
    (async () => {
      const { camerastatus } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(camerastatus === 'granted');

    })();
  }, []);

  //request premission to use storage
  useEffect(() => {
    (async () => {

      const { mediastatus } = await MediaLibrary.requestPermissionsAsync();

      requestPermission(mediastatus === 'granted');
    })();
  }, []);

//takes picture
  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      //saves to gallery
      MediaLibrary.saveToLibraryAsync(data.uri);
    }
  };


  if (hasPermission && status === null) {
    return <View />;
  }
  if (hasPermission && status === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>

      <Camera style={styles.cam} type={type} ref={cameraRef}>

        <View style={styles.buttonContainerFlip}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainerCapture}>
          <TouchableOpacity onPress={() => takePicture()}>
            <Text style={styles.text}> SNAP </Text>
          </TouchableOpacity>
        </View>


      </Camera >
    </View >
  );


}
