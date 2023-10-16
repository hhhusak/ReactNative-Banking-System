import * as React from "react";
import { useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, FlatList, Button, Image, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { AuthContext } from "../../store/auth-context";
import { usersData } from "../../usersData";

export default function TransfersScreen({ navigation }) {
    const authCtx = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([
        { id: 6, name: 'Victor', amount: 100 },
        { id: 5, name: 'Slavik', amount: -200 },
        { id: 4, name: 'Anhelina', amount: -200 },
        { id: 3, name: 'Taras', amount: 350 },
        { id: 2, name: 'Pavlo', amount: -500 },
        { id: 1, name: 'Marianchik', amount: -300 },
    ]);

    const handleTransfer = () => {
        const newTransaction = {
            id: transactions.length + 1,
            name: username,
            amount: Number(amount),
        };

        setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
        setUsername('');
        setAmount('');
    };

    const renderTransaction = ({ item }) => {
        const amountColor = item.amount < 0 ? 'red' : 'green';
        return (
            <View style={styles.transfers}>
                <Pressable style={({ pressed }) => pressed && styles.pressedItem}>
                    <View style={styles.transfers__row}>
                        <Text style={styles.transfers__date}>{item.id}</Text>
                        <Text style={styles.transfers__name}>{item.name}</Text>
                        <Text style={[styles.amount, { color: amountColor }]}>
                            {item.amount >= 0 ? '+' : '-'}{Math.abs(item.amount)}₴
                        </Text>
                    </View>
                </Pressable>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/BetaBankWhiteLogo.png')} style={styles.logo} />
            <View style={styles.handleTransferContainer}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.handleTransferInput}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.handleTransferInput}
                        placeholder="Amount"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <Button
                        title="Transfer"
                        color='#46ACC2'
                        onPress={handleTransfer}
                    />
                </View>
            </View>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 45,
        backgroundColor: '#0C1618'
    },
    transactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        width: '100%',
    },
    receiver: {
        flex: 1,
        fontSize: 16,
    },
    id: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    amount: {
        flex: 1,
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    transfers: {
        flex: 3,
        backgroundColor: '#e9e8e8',
        borderRadius: 20,
        overflow: 'scroll',
        height: 60,
        marginBottom: 10
    },
    transfers__row: {
        padding: 16,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#000000',
    },
    transfers__name: {
        fontSize: 12,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#040404',
        paddingVertical: 2,
        paddingHorizontal: 20,
        backgroundColor: '#e9e8e8',
        width: 200,
    },
    transfers__date: {
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: '600',
        color: '#030202',
    },
    handleTransferContainer: {
        paddingTop: 30,
        padding: 16,
        backgroundColor: '#e9e8e8',
        borderRadius: 10,
        marginBottom: 30
    },
    header: {
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    handleTransferInput: {
        width: '100%',
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    logo: {
        width: 50,
        height: 53,
        display: 'flex',
        alignSelf: 'center',
        marginBottom: 10,
    },
    pressedItem: {
        opacity: 0.45,
    }
});