import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import React, { useEffect } from 'react';
import Home from './Home';
import Products from './Products';
import Settings from './Settings';
import AffirmationsScreen from './screens/AffirmationsScreen';
import { Linking } from 'react-native';

// for bett
enableScreens();

const Tab = createBottomTabNavigator();

const Navigation = () => {

  const linking: any = {
    prefixes: [
      'sampleNativeModules://',
      //   'https://sampleNativeModules.com', // sample URL
      'https://anne-untippled-dispiritedly.ngrok-free.dev', // ngrok url - in actual implementation, this will be the URL of the app eg. https://sunshineclub.com
    ],
    config: {
      screens: {
        Home: {
          path: 'home',
          screens: {
            HomeMain: '',
            NotFound: '*',
          },
        },
        Affirmations: {
          path: 'affirmations/:id',
        },
        Products: {
          path: 'products',
          screens: {
            Products: '',
            Product: ':id',
            NotFound: '*',
          },
        },
        Settings: {
          path: 'settings',
          screens: {
            Settings: '',
            NotFound: '*',
          },
        },
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (url != null) {
        return url;
      }
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="Affirmations" component={AffirmationsScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
