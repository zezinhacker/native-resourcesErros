import React, { useEffect } from 'react';
import { Button, StyleSheet, View, Alert } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';
import Header from '../components/Header'; 
import Footer from '../components/Footer';

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
  button: {
    marginBottom: 10,
  },
});

export default function DeviceInfo({ navigation }) {
  useEffect(() => {
    if (hasPermissions()) {
      const subscription = ScreenCapture.addScreenshotListener(() => {
        Alert.alert('Captura de Tela', 'Tirando print, estou vendo! 😊');
      });
      return () => subscription.remove();
    }
  }, []);

  const hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const activate = async () => {
    await ScreenCapture.preventScreenCapture();
    Alert.alert('Captura de Tela', 'Captura de tela ativada.');
  };

  const deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
    Alert.alert('Captura de Tela', 'Captura de tela desativada.');
  };

  return (
    <View style={styles.container}>
      <Header title="Captura de Tela" />
      <View style={styles.content}>
        <Button style={styles.button} title="Ativar Captura" onPress={activate} />
        <Button style={styles.button} title="Desativar Captura" onPress={deactivate} />
      </View>
      <Footer onPress={() => navigation.goBack()} />
    </View>
  );
}
