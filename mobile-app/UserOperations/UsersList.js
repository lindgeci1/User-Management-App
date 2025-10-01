import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';
import AddUserModal from './AddUserModal';
import UpdateUserModal from './UpdateUserModal';
import { useDispatch } from 'react-redux';
import { deleteUserAction } from '../store/deleteUserAction';
import { updateUserAction } from '../store/updateUserAction';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 15 },

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

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: { fontSize: 15, fontWeight: '700', color: '#000', textAlign: 'center' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  cell: { paddingHorizontal: 8, flex: 1, textAlign: 'center', fontSize: 12 },
  separator: { width: 1, backgroundColor: '#ccc', height: '100%' },

  searchContainer: { marginTop: 10, marginBottom: 10 },
  actionButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
});

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdateModalVisible(true);
  };

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

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    deleteUserAction(dispatch, userId);
  };

  return (
    <View style={styles.container}>
      {/* Add User Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </View>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 2 }]}>Name</Text>
        <View style={styles.separator} />
        <Text style={[styles.headerText, { flex: 2 }]}>Email</Text>
        <View style={styles.separator} />
        <Text style={[styles.headerText, { flex: 2 }]}>Company</Text>
        <View style={styles.separator} />
        <Text style={[styles.headerText, { flex: 2 }]}>Actions</Text>
      </View>

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => openDetails(item)}>
            <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, { flex: 2 }]}>{item.email}</Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, { flex: 2 }]}>{item.company.name}</Text>
            <View style={styles.separator} />

          {/* Actions Cell */}
          <View style={{ flex: 2.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {/* Delete Button */}
            <TouchableOpacity
              style={{ ...styles.actionButton, backgroundColor: '#ff4d4f' }}
              onPress={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>D</Text>
            </TouchableOpacity>

            {/* Update Button */}
            <TouchableOpacity
              style={{ ...styles.actionButton, backgroundColor: '#007bff' }}
              onPress={(e) => {
                e.stopPropagation();
                openUpdateModal(item);
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>U</Text>
            </TouchableOpacity>
          </View>

          </TouchableOpacity>
        )}
      />

      {/* Modals */}
      <AddUserModal visible={modalVisible} onClose={() => setModalVisible(false)} addUser={addUser} />
      <UpdateUserModal
        visible={updateModalVisible}
        user={selectedUser}
        onClose={() => setUpdateModalVisible(false)}
        onUpdate={(updatedUser) => {
          setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
          updateUserAction(dispatch, updatedUser);
        }}
      />
    </View>
  );
}
