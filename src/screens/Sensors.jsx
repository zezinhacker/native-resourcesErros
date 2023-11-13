import { StyleSheet, View, Text, Platform } from 'react-native';
import Header from '../components/Header'; 
import Footer from '../components/Footer';  
import React, { useEffect, useState } from 'react';
import { Gyroscope, Magnetometer, LightSensor } from 'expo-sensors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  content: {
    flex: 1,
    gap: 20,
    padding: 20,
    alignSelf: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sensorData: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  illuminanceText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default function DeviceInfo({ navigation }) {
  const [gyroscopeData, setGyroscopeData] = useState({});
  const [magnetometerData, setMagnetometerData] = useState({});
  const [{ illuminance }, setData] = useState({ illuminance: 0 });

  useEffect(() => {
    Gyroscope.addListener(gyroscopeUpdate);
    Magnetometer.addListener(magnetometerUpdate);
    LightSensor.addListener(setData);


    return () => {
      Gyroscope.removeAllListeners();
      Magnetometer.removeAllListeners();
      LightSensor.removeAllListeners();
    };
  }, []);

  const gyroscopeUpdate = (data) => {
    setGyroscopeData(data);
  };

  const magnetometerUpdate = (data) => {
    setMagnetometerData(data);
  };

  return (
    <View style={styles.container}>
      <Header title="Sensores" />
      <View style={styles.content}>

        <View style={styles.container2}>
          <Text style={styles.sensorData}>
            Giroscópio:{'\n'}
            x: {gyroscopeData.x}{'\n'}
            y: {gyroscopeData.y}{'\n'}
            z: {gyroscopeData.z}
          </Text>

          <Text style={styles.sensorData}>
            Magnetômetro:{'\n'}
            x: {magnetometerData.x}{'\n'}
            y: {magnetometerData.y}{'\n'}
            z: {magnetometerData.z}
          </Text>

          {Platform.OS === 'android' && (
            <Text style={styles.illuminanceText}>
              Illuminance: {`${illuminance} lx`}
            </Text>
          )}
        </View>

      </View>
      <Footer onPress={() => navigation.goBack()} />
    </View>
  );
}
