import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/HomeScreen';
import TransfersScreen from './screens/TransfersScreen';
import CollectionScreen from './screens/CollectionScreen';

//Screen names
const homeName = 'Home';
const transfersName = 'Transfers';
const collectionName = 'Banka';

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#0C1618',
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === transfersName) {
                            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
                        } else if (rn === collectionName) {
                            iconName = focused ? 'cash' : 'cash-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}
                tabBarOptions={{
                    activeTintColor: '#46ACC2',
                    inactiveTintColor: 'white',
                    labelStyle: { fontSize: 12 },
                    style: { padding: 10, height: 70 },
                }}>

                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={transfersName} component={TransfersScreen} />
                <Tab.Screen name={collectionName} component={CollectionScreen} />

            </Tab.Navigator>
        </NavigationContainer >
    );
}

export default MainContainer;