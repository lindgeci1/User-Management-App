import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';
import AddUserModal from './AddUserModal';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 15 },
  
  // Floating Add button
  addButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    zIndex: 10,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  headerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 2, borderBottomColor: '#ccc', marginBottom: 10, marginTop: 50 }, // leave space for button
  headerText: { fontSize: 15, fontWeight: '700', color: '#000', textAlign: 'center' },

  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, marginBottom: 8, backgroundColor: '#f5f5f5', borderRadius: 6, shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 1 },
  cell: { paddingHorizontal: 8, flex: 1, textAlign: 'center', fontSize: 12 },
  separator: { width: 1, backgroundColor: '#ccc', height: '100%' },

  searchContainer: { marginTop: 10, marginBottom: 10 },
});

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const openDetails = (user) => {
    navigation.navigate('UserDetails', { user });
  };

  const addUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  return (
    <View style={styles.container}>
      {/* Add User Button top-right */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add User</Text>
      </TouchableOpacity>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </View>

      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 2 }]}>Name</Text>
        <View style={styles.separator} />
        <Text style={[styles.headerText, { flex: 3 }]}>Email</Text>
        <View style={styles.separator} />
        <Text style={[styles.headerText, { flex: 2 }]}>Company</Text>
      </View>

      {/* Users list */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => openDetails(item)}>
            <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, { flex: 3 }]}>{item.email}</Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, { flex: 2 }]}>{item.company.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add User Modal */}
      <AddUserModal visible={modalVisible} onClose={() => setModalVisible(false)} addUser={addUser} />
    </View>
  );
}
