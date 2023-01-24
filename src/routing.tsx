import * as React from 'react';
import {Linking} from 'react-native';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthScreen from './views/auth';
import IntroScreen from './views/auth/introScreen';
import Dashboard from './views/dashboard';
import Profile from './views/profile';

const Stack = createNativeStackNavigator();

const linking: LinkingOptions<{}> = {
  prefixes: ['ourglasswallet://'],

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },

  config: {
    screens: [],
  },
};

function Routing() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="intro">
        <Stack.Screen
          name="intro"
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
