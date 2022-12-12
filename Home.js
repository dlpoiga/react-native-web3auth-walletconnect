/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import '@walletconnect/react-native-compat';

import SignClient from '@walletconnect/sign-client';
import WalletConnectWebView from './WalletConnectWebView';

import Web3AuthWebView from './Web3AuthWebView';

const App = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [uriValue, setUriValue] = React.useState('');
  const [uriValueOld, setUriValueOld] = React.useState('');
  const [authShow, setAuthShow] = React.useState(false);
  const [errorValue, setErrorValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const initSign = async () => {
    try {
      setIsLoading(true);
      setErrorValue('');
      if (uriValueOld) {
        setUriValue(uriValueOld);
      } else {
        const signClient = await SignClient.init({
          projectId: 'ef915b605ac87cfa0ea50754539c516b',
          metadata: {
            name: 'Test Wallet',
            description: 'Test Wallet',
            url: '#',
            icons: ['https://walletconnect.com/walletconnect-logo.png'],
          },
        });

        const {uri} = await signClient.connect({
          requiredNamespaces: {
            eip155: {
              methods: ['eth_sign'],
              chains: ['eip155:1'],
              events: ['accountsChanged'],
            },
          },
        });
        setUriValue(uri);
        setUriValueOld(uri);
      }

      // console.log('Response: ', uri, Object.keys(signClient));
    } catch (e) {
      setErrorValue(`Error:  ${String(e)}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Params: ', route?.params);
  }, [route?.params]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Button title="Back" onPress={() => navigation.navigate('home')} />
        <Text style={styles.titleHeader}>HD Wallet - Demo</Text>
        <View style={{width: 42}} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {uriValue || authShow ? (
          <>
            {uriValue ? (
              <WalletConnectWebView
                uri={uriValue}
                onClose={e => {
                  setUriValue('');
                  setErrorValue(e);
                }}
              />
            ) : null}
            {authShow ? <Web3AuthWebView /> : null}

            <Button
              title="Close connection"
              onPress={() => {
                setUriValue('');
                setAuthShow(false);
                setErrorValue('');
              }}
            />
          </>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}>
            <Text style={styles.noAccountMsg}>
              User ID: {route?.params?.userId || 'Error params'}
            </Text>
            <Text style={styles.noAccountMsg}>
              Hey! You don't have any account saved, please choose one of the
              following options:
            </Text>

            {isLoading ? (
              <Button
                onPress={() => {
                  setUriValue('');
                  setAuthShow(false);
                  setIsLoading(false);
                }}
                title="Loading ..."
              />
            ) : (
              <>
                <Button title="Connect Wallet" onPress={initSign} />
                {/* <Text style={styles.OrSeparator}>-- Or --</Text>
                <Button
                  title="Sign in with Social"
                  onPress={() => setAuthShow(true)}
                /> */}
              </>
            )}

            {errorValue ? (
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: isDarkMode ? Colors.light : Colors.dark,
                  },
                ]}>
                Error message: {errorValue}
              </Text>
            ) : null}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  noAccountMsg: {
    textAlign: 'center',
    marginHorizontal: 60,
    fontSize: 18,
    marginBottom: 60,
  },
  OrSeparator: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 12,
    opacity: 0.5,
  },
});

export default App;
