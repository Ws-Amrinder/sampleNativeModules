import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import NotFound from './screens/NotFound';

const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
};

export default Home;
