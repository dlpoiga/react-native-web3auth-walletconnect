import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignClient from '../../helpers/signClient';

import styles from './styles';

import Model from '../../hooks/Model';
import {Store} from '../../hooks/main_store';
import Touch from '../../components/common/touch';
import WalletConnectWebView from '../../components/specific/walletConnectWebView';

function AuthScreen({navigation}) {
  const {state} = React.useContext(Store);

  const [doneLoad, setDoneLoad] = React.useState(false);
  const [uriValue, setUriValue] = React.useState('');
  const [uriValueOld, setUriValueOld] = React.useState('');

  const initSign = async () => {
    try {
      Model.setStore('opacity', 0.7);
      Model.setStore('loading', true);
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
      // setErrorValue(`Error:  ${String(e)}`);
    } finally {
      Model.setStore('loading', false);
    }
  };

  const getLocalAccount = async () => {
    try {
      const localAccount = await AsyncStorage.getItem('localAccount');
      if (localAccount !== null) {
        Model.setStore('user', localAccount);
      } else {
        Model.setStore('loading', false);
      }
      setDoneLoad(true);
    } catch (error) {
      setDoneLoad(true);
    }
  };

  React.useEffect(() => {
    if (doneLoad) {
      if (state.user) {
        navigation.navigate('wallethome');
      } else {
        Model.setStore('loading', false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user, doneLoad]);

  React.useEffect(() => {
    getLocalAccount();
  }, []);

  return (
    <View style={styles.content}>
      <ScrollView
        styles={styles.scroll}
        contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/intro.png')}
        />
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.description}>
          Create a Wallet, send, receive, have your own unique QR code and
          manage your finances.
        </Text>
        <Touch onPress={() => initSign()} style={styles.button}>
          <Text style={styles.labelButton}>Create</Text>
        </Touch>
        <Touch
          onPress={() => initSign()}
          style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.labelButton, styles.secondaryLabel]}>
            Log In
          </Text>
        </Touch>
        {/* <Button
        title={`Open Ourglass app [${schemeExternalApp}]`}
        onPress={() =>
          Linking.canOpenURL(schemeExternalApp)
            .then(() => Linking.openURL(schemeExternalApp))
            .catch(e => Alert.alert('Linking error', String(e)))
        }
      /> */}
      </ScrollView>
      {uriValue ? (
        <WalletConnectWebView
          uri={uriValue}
          onClose={e => {
            setUriValue('');
          }}
        />
      ) : null}
    </View>
  );
}

export default AuthScreen;
