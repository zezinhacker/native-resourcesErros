import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Header from '../components/Header';  
import Footer from '../components/Footer';  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    content: {
        flex: 1,
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    map: {
        flex: 2,  
    },
});

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permissão para acessar a localização foi negada');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        setError('Erro ao obter a localização');
        console.error('Erro ao obter a localização:', error);
      }
    })();
  }, []);

  return (
    <View
      style={styles.container}
      accessibilityLabel='Expo Device'
    >
      <Header title="Localização" />

      <View style={styles.content}>
        {location ? (
          <Text>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        ) : (
          <Text>{error || 'Obtendo localização...'}</Text>
        )}
      </View>

      <View style={styles.map}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Você está aqui"
            />
          </MapView>
        ) : (
          <Text>{error || 'Obtendo localização...'}</Text>
        )}
      </View>

      <Footer
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
