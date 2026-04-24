import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import NotFound from './NotFound';

const data = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
  { id: 5, name: 'Product 5' },
  { id: 6, name: 'Product 6' },
  { id: 7, name: 'Product 7' },
  { id: 8, name: 'Product 8' },
  { id: 9, name: 'Product 9' },
  { id: 10, name: 'Product 10' },
];

const ProductScreen = () => {
  // product name
  const route = useRoute();
  const { id } = (route.params as { id: number }) ?? { id: 1 };
  const productName = data.find(d => d.id === Number(id))?.name;
  if (!productName) {
    return <NotFound />;
  }

  return (
    <View>
      <Text>This is the Product Screen</Text>
      <Text>{productName} - product</Text>
    </View>
  );
};

export default ProductScreen;
