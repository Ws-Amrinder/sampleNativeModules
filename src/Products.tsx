import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './screens/ProductScreen';
import NotFound from './screens/NotFound';

const Stack = createStackNavigator();
const Products = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: 'Back' }}>
      <Stack.Screen name="Products" component={ProductScreen} />
      <Stack.Screen name="NotFound" component={NotFound} />
      <Stack.Screen name="Product" component={ProductDisplayScreen} />
    </Stack.Navigator>
  );
};

export default Products;
