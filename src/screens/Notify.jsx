import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import * as Notifications from 'expo-notifications';
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
});

export default function Notify({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');

  async function exibirAlerta() {
    try {
      const last = await Notifications.getLastNotificationResponseAsync();
      if (last && expoPushToken === last?.notification.request.identifier) {
        setExpoPushToken('');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Erro ao exibir alerta:', error);
    }
  }

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    exibirAlerta();
  }, [lastNotificationResponse]);

  return (
    <View style={styles.container}>
      <Header title={'Notificações'} />
      <View style={styles.content}>
        <Text>Expo token: {expoPushToken}</Text>
        <Button
          title="Enviar notificação"
          onPress={async () => {
            try {
              const token = await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Recebendo notificação em 20 segundos',
                  subtitle: 'subtitulo',
                  body: 'Corpo que a notificação irá conter',
                  data: { data: 'código secreto invisível' },
                },
                trigger: {
                  date: new Date(Date.now() + 1000 * 20),
                },
              });

              setExpoPushToken(token);
            } catch (error) {
              console.error('Erro ao enviar notificação:', error);
            }
          }}
        />

        <Button
          title="Ler última notificação 'Clicada'"
          onPress={async () => {
            try {
              const response = await Notifications.getLastNotificationResponseAsync();
              console.log('Última notificação clicada:', response);
            } catch (error) {
              console.error('Erro ao ler última notificação clicada:', error);
            }
          }}
        />

        <Button
          title="Ler Notificações Não Lidas"
          onPress={async () => {
            try {
              const notifications = await Notifications.getPresentedNotificationsAsync();
              console.log('Notificações não lidas:', notifications);
            } catch (error) {
              console.error('Erro ao ler notificações não lidas:', error);
            }
          }}
        />
      </View>
      <Footer onPress={() => navigation.goBack()} />
    </View>
  );
}
