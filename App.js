import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Accelerometer } from 'expo-sensors';

// Gun sounds
const gunSounds = {
    pistol: require('./217805__gattoangus__9mm-pistol-shoot-short-reverb.wav'),
    shotgun: require('./396316__morganpurkis__meaty-gunshot.wav'),
    rifle: require('./369528__johandeecke__short-gunshot.wav'),
    sniper: require('./558195__clueless79__powerful-shot-01.wav'),
    laserGun: require('./336501__steshystesh__laser-pistolgun.wav'),
};

export default function App() {
    const [gameReady, setGameReady] = useState(false);
    const [rotationZ, setRotationZ] = useState(0);
    const [currentSound, setCurrentSound] = useState(null);

    // Function to detect phone rotation using Accelerometer
    useEffect(() => {
        const subscribe = Accelerometer.addListener(({ x, y }) => {
            let degrees = Math.atan2(y, x) * (180 / Math.PI); // Convert to degrees
            setRotationZ(degrees);

            // Check if device is within correct rotation range
            if ((degrees > -130 && degrees < -30) || (degrees > 30 && degrees < 130)) {
                setGameReady(false);  // Game can play
            } else {
                setGameReady(true); // Stay in entry screen
            }

        });

        return () => subscribe.remove();
    }, []);

    // Function to play gun sound
    async function playSound(soundFile) {
        if (currentSound) {
            await currentSound.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(soundFile);
        setCurrentSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return currentSound
            ? () => {
                currentSound.unloadAsync();
            }
            : undefined;
    }, [currentSound]);

    // If player is not in the correct position, show entry screen
    if (!gameReady) {
        return (
            <View style={styles.entryScreen}>
                <StatusBar />
                <Text style={styles.entryText}>Rotate Your Phone</Text>
                <Text style={styles.entryText}>to Play</Text>
                <Text style={styles.entryText}>This Game</Text>
                <Text style={styles.rotationText}>Current Rotation Z: {rotationZ.toFixed(2)}°</Text>
                <Text style={styles.instructionText}>
                    Rotate your phone between (-130° to -30°) or (30° to 130°) to enter the game.
                </Text>
            </View>
        );
    }

    // Game screen when phone is in the correct position
    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Gun Sound Simulator</Text>

            <TouchableOpacity style={styles.gunButton} onPress={() => playSound(gunSounds.pistol)}>
                <Text style={styles.buttonText}>🔫 Pistol</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gunButton} onPress={() => playSound(gunSounds.shotgun)}>
                <Text style={styles.buttonText}>🔫 Shotgun</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gunButton} onPress={() => playSound(gunSounds.rifle)}>
                <Text style={styles.buttonText}>🔫 Rifle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gunButton} onPress={() => playSound(gunSounds.sniper)}>
                <Text style={styles.buttonText}>🔫 Sniper</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gunButton} onPress={() => playSound(gunSounds.laserGun)}>
                <Text style={styles.buttonText}>🔫 Laser Gun</Text>
            </TouchableOpacity>
        </View>
    );
}

// Styling
const styles = StyleSheet.create({
    entryScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
    },
    entryText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    rotationText: {
        fontSize: 18,
        color: '#ffcc00',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    gunButton: {
        backgroundColor: '#444',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
});
