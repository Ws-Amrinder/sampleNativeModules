import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
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

const ProductListingScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  // product name
  const route = useRoute();
  const { id } = (route.params as { id: number }) ?? { id: 1 };
  const productName = data.find(d => d.id === Number(id))?.name;
  if (!productName) {
    return <NotFound />;
  }

  return (
    <View>
      {data.map(item => (
        <Pressable
          key={item.id}
          onPress={() => navigation.navigate('Product', { id: item.id })}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: 'white',
            margin: 10,
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#007af0',
          }}
        >
          <Text style={{ fontSize: 14, color: 'white' }}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ProductListingScreen;
