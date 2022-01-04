import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

function AccelerometerScreen() {

    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData);
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
            <View style={styles.AccelerometerContainer}>
            <Text style={styles.text}>Accelerometer</Text>
                <Text style={styles.textValues}>
                    <Text style={styles.text}>x: {x.toFixed(2)} y: {y.toFixed(2)} z: {z.toFixed(2)}</Text>
                </Text>
                <Text style={styles.text}>X Orientation: {
                    (x) > 0.50 ? 'Vertical' : 'Horizontal'}</Text>
                <Text style={styles.text}>Y Orientation:
                    {Platform.OS === "ios"
                        ? ((y) < -0.50 ? 'Vertical' : 'Horizontal')
                        : ((y) > 0.50 ? 'Vertical' : 'Horizontal')}</Text>
                <Text style={styles.text}>Z Orientation:
                    {Platform.OS === "ios"
                        ? ((z) < 0 ? 'Facing Up' : 'Facing Down')
                        : ((z) > 0 ? 'Facing Up' : 'Facing Down')}
                </Text>
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
    AccelerometerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default AccelerometerScreen;