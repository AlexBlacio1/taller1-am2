import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const products = [
  { name: 'Mouse', price: 50 },
  { name: 'Laptop', price: 1500 },
  { name: 'Teclado', price: 80 },
  { name: 'Monitor', price: 120 },
];

export default function HomeScreen() {
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Productos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}: ${item.price}</Text>
        )}
      />
      <Text style={styles.total}>Total: ${total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 8,
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
