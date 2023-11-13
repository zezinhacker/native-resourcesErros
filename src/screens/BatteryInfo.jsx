import React, { useState, useEffect } from 'react';
import * as Battery from 'expo-battery';
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    text: {
        fontSize: 20,
    },
});

export default function BatteryInfo({ navigation }) {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [batteryState, setBatteryState] = useState(null); 

    async function atualizarTudo() {
        await nivel();
        await estado();
        await powerInfo();
    }

    async function nivel() {
        const level = await Battery.getBatteryLevelAsync();
        setBatteryLevel(level);
    }

    async function estado() {
        const state = await Battery.getBatteryStateAsync();
        setBatteryState(state);
    }

    async function powerInfo() {
        const power = await Battery.getPowerStateAsync();
    }

    useEffect(() => {
        nivel();
    }, []);

    return (
        <View style={styles.container}>
            <Header title="Nível da Bateria" />

            <View style={styles.content}>
                <Text style={styles.text}>
                    Nível da bateria: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(2)}%` : 'Carregando...'}
                </Text>
                <Text style={styles.text}>
                    Estado da bateria: {batteryState !== null ? batteryState : 'Carregando...'}
                </Text>
                <Button
                    title='Atualizar'
                    onPress={atualizarTudo}
                />
            </View>

            <Footer
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}
