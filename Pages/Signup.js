import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AuthContent from './AuthContent';
import LoadingOverlay from './LoadingOverlay';
import { AuthContext } from '../store/auth-context';

import { createUser } from '../auth';

export default function Signup() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signUpHandler({ email, password, username }) {
        try {
            setIsAuthenticating(true);
            const token = createUser(email, password, username);
            authCtx.authenticate(token);
        } catch {
            Alert.alert("Authentication failed!", "Couldn't create account, please check your credentials and try again!");
        }
        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />
    }

    return (
        <AuthContent onAuthenticate={signUpHandler} />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: 80,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonCreateAccount: {
        borderRadius: 5,
    },
    createAccountText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    buttonHolder: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
