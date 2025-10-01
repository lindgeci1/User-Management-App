// UserOperations/AddUserModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#222', // darker text
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});

export default function AddUserModal({ visible, onClose, addUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation', 'Name and Email are required.');
      return;
    }

    const newUser = {
    id: Date.now(),
    name,
    email,
    username: 'N/A',
    company: { 
        name: companyName || 'N/A',
        catchPhrase: 'N/A',
        bs: 'N/A'
    },
    address: {
        street: 'N/A',
        suite: 'N/A',
        city: 'N/A',
        zipcode: 'N/A',
        geo: { lat: 'N/A', lng: 'N/A' },
    },
    phone: 'N/A',
    website: 'N/A',
    };

    addUser(newUser);
    setName('');
    setEmail('');
    setCompanyName('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Title */}
          <Text style={styles.title}>Add New User</Text>

          {/* Inputs */}
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#666"
          />
          <TextInput
            placeholder="Company (optional)"
            style={styles.input}
            value={companyName}
            onChangeText={setCompanyName}
            placeholderTextColor="#666"
          />

          {/* Add button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add User</Text>
          </TouchableOpacity>

          {/* Close button at bottom */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
