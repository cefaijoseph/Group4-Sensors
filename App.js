import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccelerometerScreen from './Accelerometer';
import BarometerScreen from './Barometer';
import PedometerScreen from './Pedometer';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.HomeContainer}>
            <Text style={styles.HomeText}>
                Please select a sensor:
            </Text>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Accelerometer')}>
                <Text style={styles.ButtonText}>Accelerometer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Barometer')}>
                <Text style={styles.ButtonText}>Barometer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Magnometer')}>
                <Text style={styles.ButtonText}>Magnometer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Pedometer')}>
                <Text style={styles.ButtonText}>Pedometer</Text>
            </TouchableOpacity>
        </View>
    )
}

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home - Group 4 (Sensors)" component={HomeScreen} />
                <Stack.Screen name="Accelerometer" component={AccelerometerScreen} />
                <Stack.Screen name="Barometer" component={BarometerScreen} />
                <Stack.Screen name="Pedometer" component={PedometerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    HomeContainer: {
        marginHorizontal: 20,
        flexDirection: "column",
    },
    HomeText: {
        paddingVertical: 20,
        fontSize: 20
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        marginVertical: 10,
        backgroundColor: "#3F7EE8",
        borderRadius: 15
    },
    ButtonText: {
        color: 'white',
        fontSize: 20
    }
})