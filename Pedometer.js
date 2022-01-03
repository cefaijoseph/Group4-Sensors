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
        <View >
            <Text>Pedometer connection: {isPedometerAvailable ? 'Connected' : 'Not connected'}</Text>
            <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
            <Text>Walk! And watch this go up: {currentStepCount}</Text>
        </View>
    );
}

export default PedometerScreen;