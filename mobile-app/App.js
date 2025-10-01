import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store'; // make sure path is correct
import UsersList from './UserOperations/UsersList';
import UserDetails from './UserOperations/UserDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Users" component={UsersList} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
