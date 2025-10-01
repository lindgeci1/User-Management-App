// UserOperations/UpdateUserModal.js
import React, { useState, useEffect } from 'react';
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
    color: '#222',
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

export default function UpdateUserModal({ visible, onClose, user, onUpdate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

useEffect(() => {
  if (visible && user) {
    // Reset inputs whenever modal is opened
    setName(user.name);
    setEmail(user.email);
    setCompanyName(user.company?.name || 'N/A');
  }
}, [visible, user]);


const handleSubmit = () => {
  if (!name.trim() || !email.trim()) {
    Alert.alert('Validation', 'Name and Email are required.');
    return;
  }

  const updatedUser = {
    ...user,
    name,
    email,
    company: { ...user.company, name: companyName.trim() || 'N/A' }, // default N/A if empty
  };

  onUpdate(updatedUser);
  onClose();
};
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Title */}
          <Text style={styles.title}>Update User</Text>

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
            placeholder="Company"
            style={styles.input}
            value={companyName}
            onChangeText={setCompanyName}
            placeholderTextColor="#666"
          />

          {/* Update button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

          {/* Close button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
