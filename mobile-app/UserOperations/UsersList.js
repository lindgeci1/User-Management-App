import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginTop: 70,
  },
  headerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
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
  cell: {
    paddingHorizontal: 8,
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
  },
  separator: {
    width: 1,
    backgroundColor: '#ccc',
    height: '100%',
  },
});

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 2 }]}>Name</Text>
        <View style={styles.separator} />
        <Text style={[styles.headerText, { flex: 3 }]}>Email</Text>
        <View style={styles.separator} />
        <Text style={[styles.headerText, { flex: 2 }]}>Company</Text>
      </View>

      {/* Users list Section*/}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, { flex: 3 }]}>{item.email}</Text>
            <View style={styles.separator} />
            <Text style={[styles.cell, { flex: 2 }]}>{item.company.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
