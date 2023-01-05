import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, Button, ScrollView} from 'react-native';

import '@walletconnect/react-native-compat';

import SignClient from '../../helpers/signClient';

import styles from './styles';

import WalletConnectWebView from '../../components/specific/walletConnectWebView';
import Web3AuthWebView from '../../components/specific/web3authWebView';
import Touch from '../../components/common/touch';
import {Store} from '../../hooks/main_store';

const Dashboard = ({route, navigation}) => {
  const {state} = React.useContext(Store);

  const [uriValue, setUriValue] = React.useState('');
  const [uriValueOld, setUriValueOld] = React.useState('');
  const [authShow, setAuthShow] = React.useState(false);
  const [errorValue, setErrorValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

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

  const renderContent = () => {
    if (state?.accounts?.length < 1) {
      return (
        <View style={styles.emptyContainer}>
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
            <Text style={styles.sectionDescription}>
              Error message: {errorValue}
            </Text>
          ) : null}
        </View>
      );
    }
  };

  useEffect(() => {
    console.log('Params: ', route?.params);
  }, [route?.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Accounts</Text>
        <Touch
          onPress={() => navigation.navigate('home')}
          style={styles.buttonLogOut}>
          <Text style={styles.textLogOut}>Log out</Text>
        </Touch>
      </View>
      <View style={styles.body}>
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
          renderContent()
        )}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
