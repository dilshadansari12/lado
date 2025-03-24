import * as React from 'react';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Pages/Users/Home/Home';
import OrderView from './Pages/Users/Home/OrderView';
import Cart from './Pages/Users/Cart/Cart';
import Address from './Pages/Users/Cart/Address';
import Payemnt from './Pages/Users/Cart/Payment';
import Tracking from './Pages/Users/Tracking/Tracking';
import Account from './Pages/Account/Account';

import Ionicons from '@react-native-vector-icons/ionicons';

const Stack = createNativeStackNavigator();
const BottomTabNavigation = createBottomTabNavigator();

const NavigatorIcon = ({ route, focused, color, size }:
    {
        route: any;
        focused: boolean;
        color: string;
        size: number
    }) => {

    let iconName = "home";
    switch (route?.name) {
        case "home":
            iconName = focused ? "planet" : "planet-outline";
            break;
        case "cart":
            iconName = focused ? "cart" : "cart-outline";
            break;
        case "tracking":
            iconName = focused ? "navigate-circle" : "navigate-circle-outline";
            break
        case "profile":
            iconName = focused ? "person-circle" : "person-circle-outline";
            break
        default:
            iconName = focused ? "home-circle" : "home-circle-outline"
            break;
    }
    return <Ionicons name={iconName as any} color={color} size={size} /> // TODO: create your custom componenet for tab bar read doc
};

const AllTabs = () => {
    return (
        <BottomTabNavigation.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: (props) => <NavigatorIcon {...props} route={route} />,
                tabBarActiveTintColor: 'tomato',
                // tabBarInactiveTintColor: 'gray',
            })}
        >
            <BottomTabNavigation.Screen name="home" component={Home} options={{ title: "Home" }} />
            <BottomTabNavigation.Screen name="tracking" component={Tracking} options={{ title: "Tracking" }} />
            <BottomTabNavigation.Screen name="cart" component={Cart} options={{ title: "Cart", tabBarBadge: 5 }} />
            <BottomTabNavigation.Screen name='profile' component={Account} options={{ title: "Profile" }} />
        </BottomTabNavigation.Navigator>
    )
}

const AppNavigator = () => {


    return (
        <Stack.Navigator initialRouteName='home'>
            <Stack.Screen name='home' component={AllTabs} options={{ headerShown: false }} />

            {/* Hide the bottom */}
            <Stack.Screen name="orderView" component={OrderView} />
            <Stack.Screen name="address" component={Address} />
            <Stack.Screen name="payment" component={Payemnt} />
        </Stack.Navigator>
    );
};

export default AppNavigator;

