import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, FlatList, Button, Image, Pressable, Modal } from "react-native";

export default function TransfersScreen({ navigation }) {
    const [purpose, setPurpose] = useState('');
    const [neededAmount, setNeededAmount] = useState('');
    const [collections, setCollections] = useState([
        { purpose: 'Something else', amount: 350, neededAmount: 500, id: Math.random().toString() },
        { purpose: 'Aboba', amount: 200, neededAmount: 1500, id: Math.random().toString() },
        { purpose: 'Dron', amount: 200, neededAmount: 12500, id: Math.random().toString() },
        { purpose: 'Tachka', amount: 100, neededAmount: 15000, id: Math.random().toString() },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');

    function handleCreateCollection() {
        const newCollection = {
            purpose: purpose,
            amount: 0,
            neededAmount: neededAmount,
            id: Math.random().toString(),
        };

        setCollections(prevCollections => [newCollection, ...prevCollections]);
        setPurpose('');
        setNeededAmount('');
    }

    const renderCollection = ({ item }) => {
        return (
            <View style={styles.transfers}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                    style={styles.transfers}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.donationInput}
                                placeholder="Amount"
                                value={donationAmount}
                                onChangeText={setDonationAmount}
                            />
                            <Button
                                title="Donate"
                                color='#46ACC2'
                                onPress={() => handleDonate(item.id)}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => setModalVisible(true)}>
                    <View style={styles.transfers__row}>
                        <Text style={styles.transfers__purpose}>{item.purpose}</Text>
                        <Text style={[styles.amount]}>
                            <Text style={styles.amountCollected}>{item.amount}</Text> / <Text style={styles.amountNeeded}>{item.neededAmount}</Text>₴
                        </Text>
                    </View>
                </Pressable>
            </View>
        );
    };

    function handleDonate(collectionId) {
        const updatedCollections = collections.map(collection => {
            if (collection.id === collectionId) {
                const donatedAmount = parseInt(donationAmount) || 0;
                const newAmount = collection.amount + donatedAmount;
                return { ...collection, amount: newAmount };
            }
            return collection;
        });

        setCollections(updatedCollections);
        setDonationAmount('');
        setModalVisible(false);
    }


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/BetaBankWhiteLogo.png')} style={styles.logo} />
            <View style={styles.handleTransferContainer}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.handleTransferInput}
                        placeholder="Purpose"
                        value={purpose}
                        onChangeText={setPurpose}
                    />
                    <TextInput
                        style={styles.handleTransferInput}
                        placeholder="Needed amount"
                        value={neededAmount}
                        onChangeText={setNeededAmount}
                    />
                    <Button
                        title="Create"
                        color='#46ACC2'
                        onPress={handleCreateCollection}
                    />
                </View>
            </View>
            <FlatList
                data={collections}
                renderItem={renderCollection}
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
    amountCollected: {
        color: 'red'
    },
    amountNeeded: {
        color: 'green'
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
    transfers__purpose: {
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    donationInput: {
        width: '100%',
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
});