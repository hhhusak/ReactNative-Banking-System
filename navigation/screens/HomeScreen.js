import { useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../store/auth-context";

export default function HomeScreen({ navigation }) {
    const authCtx = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/BetaBankLogo.png')} style={styles.logo} />
            <Text style={styles.title}>BetaBank</Text>
            <TouchableOpacity style={styles.button} onPress={() => authCtx.logout()}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View >
    )
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
        marginBottom: 250,
    },
    logo: {
        width: 50,
        height: 53,
        display: 'flex',
        alignSelf: 'center',
        marginBottom: 250,
    },
    button: {
        backgroundColor: '#DB3A34',
        padding: 10,
        borderRadius: 5,
        width: 80,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});