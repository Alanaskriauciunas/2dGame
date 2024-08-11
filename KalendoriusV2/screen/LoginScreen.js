import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('http://192.168.0.49/calendar/login.php', JSON.stringify({
            username: username,
            password: password,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const { message, status } = response.data;
            if (status === 'success') {
                Alert.alert('Success', message);
                navigation.navigate('Main'); 
            } else {
                Alert.alert('Error', message);
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            Alert.alert('Error', 'An error occurred during login.');
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={setUsername} 
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} 
            />
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Don't have an account" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "55%",
        marginBottom: 10  
    },
    buttonContainer: {
        marginTop: 20,
        width: "55%"  
    }
});

export default LoginScreen;
