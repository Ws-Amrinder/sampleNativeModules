import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotFound from './screens/NotFound';
import ProductListingScreen from './screens/ProductListingScreen';
import ProductScreen from './screens/ProductScreen';

const Stack = createStackNavigator();
const Products = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: 'Back' }}>
      <Stack.Screen name="Products" component={ProductListingScreen} />
      <Stack.Screen name="NotFound" component={NotFound} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );  
};

export default Products;
