import * as React from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthScreen from './views/auth';
import IntroScreen from './views/auth/introScreen';
import Dashboard from './views/dashboard';
import Profile from './views/profile';
import Routes from './config/routes';

const Stack = createNativeStackNavigator();

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

function Routing() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="intro">
        <Stack.Screen
          name={Routes.INTRO}
          component={IntroScreen}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="auth"
          component={AuthScreen}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="wallethome"
          component={Dashboard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="profile"
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routing;
