import { cloneElement, useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import AuthForm from './AuthForm';

function AuthContent({ isLogin, onAuthenticate }) {
    const navigation = useNavigation();

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        username: false,
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace("Signup");
        } else {
            navigation.replace("Login");
        }
    }

    function submitHandler(credentials) {
        let { username, email, confirmEmail, password, confirmPassword } = credentials;

        email = email.trim();
        password = password.trim();

        const usernameIsValid = username.length > 4;
        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentialsInvalid({
                username: !usernameIsValid,
                email: !emailIsValid,
                confirmEmail: !emailIsValid || !emailsAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }
        onAuthenticate({ email, password });
    }

    return (
        <View style={styles.authContent}>
            <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonCreateAccount} onPress={switchAuthModeHandler}>
                    <Text style={styles.createAccountText}>{isLogin ? 'Create an account' : 'Have an account?'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    authContent: {
        marginTop: 150,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonCreateAccount: {
        borderRadius: 5,
        alignSelf: 'center'
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
