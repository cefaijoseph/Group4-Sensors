import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

const PedometerScreen=()=>{
    state = {
        isPedometerAvailable: 'checking',
        pastStepCount: 0,
        currentStepCount: 0,
      };

        const [subscription, setSubscription] = useState(null);

        const _subscribe = () => {
            this._subscription = Pedometer.watchStepCount(result => {
                this.setState({
                  currentStepCount: result.steps,
                });
              });
          
              Pedometer.isAvailableAsync().then(
                result => {
                  this.setState({
                    isPedometerAvailable: String(result),
                  });
                },
                error => {
                  this.setState({
                    isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
                  });
                }
              );
          
              const end = new Date();
              const start = new Date();
              start.setDate(end.getDate() - 1);
              Pedometer.getStepCountAsync(start, end).then(
                result => {
                  this.setState({ pastStepCount: result.steps });
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

        useEffect(() => {
            _subscribe();
            return () => _unsubscribe();
        }, []);

        return (
            <View style={styles.container}>
                <View style={styles.PedometerContainer}>
                    <Text style={styles.text}>Accelerometer</Text>
                    <Text>Pedometer connection: {this.state.isPedometerAvailable}</Text>
                    <Text>Steps taken in the last 24 hours: {this.state.pastStepCount}</Text>
                    <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
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
    PedometerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default PedometerScreen;