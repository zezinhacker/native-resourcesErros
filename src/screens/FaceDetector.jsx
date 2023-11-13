import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    alignSelf: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default function FaceDetector({ navigation }) {  
  const [faces, setFaces] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log('Photo taken:', uri); 
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={styles.container}
      accessibilityLabel='Expo Device'
    >
      <Header title="Face Detector" />

      <View style={styles.container2}>
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          type={type}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: Camera.Constants.FaceDetection.Mode.fast,
            detectLandmarks: Camera.Constants.FaceDetection.Landmarks.all,
            runClassifications: Camera.Constants.FaceDetection.Classifications.all,
            minDetectionInterval: 100,
            tracking: true,
          }}
          ratio="4:3"
          zoom={0}
        />
        {faces.map((face, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: face.bounds.origin.y,
              left: face.bounds.origin.x,
              width: face.bounds.size.width,
              height: face.bounds.size.height,
              borderWidth: 2,
              borderColor: 'red',
            }}
          />
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCameraType}>
            <Text style={styles.text}>Trocar Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
