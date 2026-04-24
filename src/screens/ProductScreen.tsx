import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

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

// const ProductScreen1 = () => {
//   const route = useRoute<RouteProp<{ Product: { id: number } }, 'Product'>>();
//   // product name
//   const {id} = route.params;
//   const productName = data.find(d => d.id === Number(id))?.name;

//   return (
//     <View>
//       <Text style={{ fontSize: 20, color: 'green' }}>This is the product ---- {productName}</Text>
//     </View>
//   );
// };

const ProductScreen = () => {
    const route = useRoute();
    const { id } = route.params; // Extract the `id` from the route parameters
  
    useEffect(() => {
      // Optionally load data or perform actions based on `id`
      console.log('Product ID:', id);
    }, [id]);
  
    return (
      <View>
        <Text>Product Details for ID: {id}</Text>
      </View>
    );
  };

export default ProductScreen