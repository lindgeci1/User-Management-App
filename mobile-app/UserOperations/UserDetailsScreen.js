// UserOperations/UserDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: { flex: 2, fontWeight: '700', fontSize: 15, color: '#555' },
  value: { flex: 3, fontSize: 15, color: '#000' },
});

export default function UserDetailsScreen({ route }) {
  const { user } = route.params;
  const { address, company } = user;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{user.name}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Website:</Text>
        <Text style={styles.value}>{user.website}</Text>
      </View>

      {/* Address Section */}
      <Text style={styles.sectionHeader}>Address Details</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Street:</Text>
        <Text style={styles.value}>{address.street}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{address.city}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Zipcode:</Text>
        <Text style={styles.value}>{address.zipcode}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Geo:</Text>
        <Text style={styles.value}>
          Lat: {address.geo.lat}, Lng: {address.geo.lng}
        </Text>
      </View>

      {/* Company Section */}
      <Text style={styles.sectionHeader}>Company</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{company.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>CatchPhrase:</Text>
        <Text style={styles.value}>{company.catchPhrase}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>BS:</Text>
        <Text style={styles.value}>{company.bs}</Text>
      </View>
    </ScrollView>
  );
}
