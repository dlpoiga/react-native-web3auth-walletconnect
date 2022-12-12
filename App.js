import * as React from 'react';
import {Button, View, Text, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WalletHome from './Home';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Wallet"
        onPress={() => navigation.navigate('wallethome')}
      />
    </View>
  );
}

const linking = {
  prefixes: ['ourglasswallet://'],

  // Custom function to get the URL which was used to open the app
  async getInitialURL() {
    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL();

    return url;
  },

  // Custom function to subscribe to incoming links
  subscribe(listener) {
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      listener(url);
    });

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
    };
  },

  config: {
    // Deep link configuration
  },
};

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          options={{headerShown: false, animation: 'none'}}
          name="wallethome"
          component={WalletHome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
