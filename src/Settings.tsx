import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './screens/SettingsScreen';
import NotFound from './screens/NotFound';

const Stack = createStackNavigator();
const Settings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
};

export default Settings;
