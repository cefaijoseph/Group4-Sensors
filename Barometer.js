import React, { useState, useEffect } from "react";
import { StyleSheet, Text, StatusBar, View } from "react-native";
import { Barometer } from "expo-sensors";

const BarometerScreen = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    this._subscription = Barometer.addListener((barometerData) => {
      setData(barometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  const { pressure = 0, relativeAltitude = 0 } = data;

  return (
    <View style={styles.container}>
      <View style={styles.BarometerContainer}>
        <Text style={styles.text}>Barometer:</Text>
        <Text style={styles.text}>Pressure: {pressure * 100} Pa</Text>
        <Text style={styles.text}>
          Relative Altitude:{" "}
          {Platform.OS === "ios"
            ? `${relativeAltitude} m`
            : `Only available on iOS`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
  textValues: {
    flexDirection: "column",
  },
  BarometerContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default BarometerScreen;