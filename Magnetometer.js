import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { StatusBar } from 'expo-status-bar';

function MagnetometerScreen() {

    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener(result => {
                setData(result);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;
    return (
        <View style={styles.container}>
            <View style={styles.MagnetometerContainer}>
                <Text style={styles.text}>Magnetometer:</Text>
                <Text style={styles.text}>
                    x: {x.toFixed(2)} y: {y.toFixed(2)} z: {z.toFixed(2)}
                </Text>
                <View style={styles.buttonContainer}>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: (StatusBar.currentHeight),
        flex: 1,
    },
    text: {
        fontSize: 20
    },
    textValues: {
        flexDirection: 'column'
    },
    MagnetometerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default MagnetometerScreen;