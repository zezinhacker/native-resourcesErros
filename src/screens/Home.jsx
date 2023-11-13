import { Button, StyleSheet, Text, View } from 'react-native';
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTextStyle: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  done: "#060",
});

export default function Home({ navigation }) {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View
      style={styles.container}
      accessibilityLabel='Expo Device'
    >
      <Header title="Recursos Nativos" />

      <View style={styles.content}>
        <Text style={styles.contentTextStyle} >
          Hello World!
        </Text>

        <Button color={styles.done} title='Device' onPress={() => navigateToScreen('DeviceInfo')} />
        <Button color={styles.done} title='Battery' onPress={() => navigateToScreen('BatteryInfo')} />
        <Button color={styles.done} title='Notify' onPress={() => navigateToScreen('Notify')} />
        <Button color={styles.done} title='ScreenOrientation' onPress={() => navigateToScreen('MyScreenOrientation')} />
        <Button color={styles.done} title='Contacts' onPress={() => navigateToScreen('ContactInfo')} />
        <Button color={styles.done} title='Schedule Notify' onPress={() => navigateToScreen('ScheduleNotify')} />
        <Button color={styles.done} title='Sensors' onPress={() => navigateToScreen('Sensors')} />
        <Button color={styles.done} title='Screenshot' onPress={() => navigateToScreen('Screenshot')} />
        <Button color={styles.done} title='LocalAuthentication' onPress={() => navigateToScreen('LocalAuthentication')} />
        <Button color={styles.done} title='CameraInfo' onPress={() => navigateToScreen('CameraInfo')} />
        <Button color={styles.done} title='FaceDetector' onPress={() => navigateToScreen('FaceDetector')} />
        <Button title='Location' onPress={() => navigateToScreen('Location')} />
      </View>

      <Footer hasButton={false} />
    </View>
  );
}
