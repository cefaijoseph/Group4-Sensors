import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

const PedometerScreen = () => {
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const _subscribe = () => {
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
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.PedometerContainer}>
                <Text style={styles.text}>Pedometer connection: {isPedometerAvailable ? 'Connected' : 'Not connected'}</Text>
                <Text style={styles.text}>Steps taken in the last 24 hours: {pastStepCount}</Text>
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