import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import Home from './Home';
import Products from './Products';
import Settings from './Settings';

// for bett
enableScreens();

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const linking = {
    prefixes: [
      'sampleNativeModules://',
      //   'https://sampleNativeModules.com', // sample URL
      'https://anne-untippled-dispiritedly.ngrok-free.dev', // ngrok url - in actual implementation, this will be the URL of the app eg. https://sunshineclub.com
    ],
    config: {
      screens: {
        Home: 'home',
        Products: 'products/:id',
        Settings: 'settings',
        NotFound: '*',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
