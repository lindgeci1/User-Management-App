// UserOperations/SearchBar.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
});

export default function SearchBar({ searchText, setSearchText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Users</Text>
      <TextInput
        placeholder="Search by name or email"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />
    </View>
  );
}
