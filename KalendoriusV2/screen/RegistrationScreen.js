import React, { useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import axios from "axios";



const RegistrationScreen = () =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        const authenticate = async () => {
            axios.post("http://192.168.0.49/calendar/authentification.php", JSON.stringify({
                email: email,
                password: password,
                username: username,
            }))
            .then(response => {
                console.log("Received data:", response.data); 
                const { message, status } = response.data;
                if (status === "error") {
                    alert(message);  
                } else if (status === "success") {
                    alert("Registration Successful!");
                } else {
                    alert("Unknown status received."); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred during registration.");
            });
        };
        if (isSubmit) {
            authenticate();
            setIsSubmit(false); 
        }
    }, [isSubmit, email, password, username]); 
    

    
    const usernameHandler = (text) => {
        setUsername(text);
    };
    return (
        
        <View style={styles.container}>
            <TextInput
            placeholder="Username" 
            style={styles.input}
            onChangeText={usernameHandler}
            />
            <TextInput 
            placeholder="Email" 
            style={styles.input} 
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            />
            <TextInput 
            placeholder="Password" 
            style={styles.input} 
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonContainer}>
                <Button title="Register" onPress={() => setIsSubmit(true)}></Button>

            </View>
        </View>
    );

}

export default RegistrationScreen;

const styles = StyleSheet.create ({
    container:  {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "55%"
    },
    buttonContainer: {
        marginTop: 20
    }
});