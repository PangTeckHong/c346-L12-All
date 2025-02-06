import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {Barometer} from 'expo-sensors';

const styles = StyleSheet.create({
    container: {

    },
});

export default function App() {

    const [pressure, setPressure] = useState(1013.25);
    const [altitude, setAltitude] = useState(0); // Default altitude

    useEffect(() => {

        Barometer.setUpdateInterval(100);
        const subscription = Barometer.addListener(({pressure}) => {
            setPressure(pressure);
            const seaLevelPressure = 1013.25; // Standard atmospheric pressure at sea level in hPa
            const altitudeCalc = (1 - Math.pow(pressure / seaLevelPressure, 0.190284)) * 145366.45 * 0.3048;
            setAltitude(altitudeCalc);
        });

        return () => subscription.remove();
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.text}>Pressure: {pressure.toFixed(2)}</Text>
            <Text style={styles.text}>Relative Altitude: {altitude.toFixed(2)}</Text>
        </View>
    );
}


