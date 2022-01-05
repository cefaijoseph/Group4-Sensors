import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccelerometerScreen from './Accelerometer';
import MagnetometerScreen from './Magnetometer';
import BarometerScreen from './Barometer';
import PedometerScreen from './Pedometer';
import CameraScreen from './Camera';


function HomeScreen({ navigation }) {
    return (
        <View style={styles.HomeContainer}>
            <Text style={styles.HomeText}>
                Please select a Sensor:
            </Text>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Accelerometer')}>
                <Text style={styles.ButtonText}>Accelerometer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Magnetometer')}>
                <Text style={styles.ButtonText}>Magnetometer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Barometer')}>
                <Text style={styles.ButtonText}>Barometer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Pedometer')}>
                <Text style={styles.ButtonText}>Pedometer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}
                onPress={() => navigation.navigate('Camera')}>
                <Text style={styles.ButtonText}>Camera</Text>
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
                <Stack.Screen name="Magnetometer" component={MagnetometerScreen} />
                <Stack.Screen name="Barometer" component={BarometerScreen} />
                <Stack.Screen name="Pedometer" component={PedometerScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    HomeContainer: {
        marginTop: 10,
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