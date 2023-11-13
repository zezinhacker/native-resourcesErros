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
  input: {
    backgroundColor: "#DDD",
    height: 50,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 15,  
  },
});

export default function Notify({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [seconds, setSeconds] = useState('2');  

  const handleSendNotification = async () => {
    try {

      if (!title || !body) {
        alert('Por favor, preencha todos os campos antes de enviar a notificação.');
        return;
      }

      const token = await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
        },
        trigger: { seconds: parseInt(seconds) },
      });

      console.log('Notificação agendada com sucesso. Token:', token);
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Notificações"} />
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder='Título'
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder='Conteúdo'
          value={body}
          onChangeText={setBody}
        />
        <TextInput
          style={styles.input}
          placeholder='Tempo para disparo (segundos)'
          value={seconds}
          keyboardType="numeric"
          onChangeText={setSeconds}
        />
        <Button
          title="Enviar notificação"
          onPress={handleSendNotification}
        />
      </View>
      <Footer onPress={() => navigation.goBack()} />
    </View>
  );
}
