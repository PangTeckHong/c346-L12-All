import React, { useState, useEffect } from 'react';
import { StatusBar, Button, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

const gunSounds = {
    pistol: require('./217805__gattoangus__9mm-pistol-shoot-short-reverb.wav'),
    shotgun: require('./396316__morganpurkis__meaty-gunshot.wav'),
    rifle: require('./369528__johandeecke__short-gunshot.wav'),
    sniper: require('./558195__clueless79__powerful-shot-01.wav'),
    laserGun: require('./336501__steshystesh__laser-pistolgun.wav'),
};

export default function App() {
    const [currentSound, setCurrentSound] = useState(null);

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
                console.log('Unloading Sound');
                currentSound.unloadAsync();
            }
            : undefined;
    }, [currentSound]);

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

const styles = StyleSheet.create({
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
