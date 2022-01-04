import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, StatusBar, Text, View, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

const PedometerScreen = () => {
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const _subscribe = async () => {

        await Pedometer.requestPermissionsAsync();
        Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps)
        }),
            Pedometer.isAvailableAsync().then(
                result => {
                    setIsPedometerAvailable(result)
                },
                error => {
                    this.setState({
                        isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
                    });
                }
            )

        if (Platform.OS == "ios") {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);
            Pedometer.getStepCountAsync(start, end).then(
                result => {
                    setPastStepCount(result.steps)
                },
                error => {
                    this.setState({
                        pastStepCount: 'Could not get stepCount: ' + error,
                    });
                }
            );
        }
    };

    const _unsubscribe = () => {
        setPastStepCount(0);
        setCurrentStepCount(0);
        setIsPedometerAvailable(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.PedometerContainer}>
                <Text style={styles.text}>Permissions: {hasPermission ? 'Given' : 'Not given'}</Text>
                <Text style={styles.text}>Pedometer connection: {isPedometerAvailable ? 'Connected' : 'Not connected'}</Text>
                <Text style={styles.text}>Steps taken in the last 24 hours: {Platform.OS == "ios" ? pastStepCount : "Unavailable on android"}</Text>
                <Text style={styles.text}>Walk! And watch this go up: {currentStepCount}</Text>
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
    PedometerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})
export default PedometerScreen;