import React, {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import SignClient from '@walletconnect/sign-client';

// import '@walletconnect/react-native-compat';

import styles from './styles';

import WalletConnectWebView from '../../components/specific/walletConnectWebView';
// import Web3AuthWebView from '../../components/specific/web3authWebView';
import Touch from '../../components/common/touch';
import Model from '../../hooks/Model';
import {Store} from '../../hooks/main_store';

const Profile = ({route, navigation}) => {
  const {state} = React.useContext(Store);

  const userWallets = [
    {label: 'Account 1', address: '0xf70F19952D3b64f5E72b1e8E60602f5FaF8161BD'},
    {label: 'Eth account', address: '0xasdf57sD3b64f5E72b1e8E60602f567SDF8'},
    {label: 'My sol', address: 'wcx9952D3b64f5E72b1e8E60602f5Fff4TR'},
    {label: 'Btc', address: 'btcx244419952D3b64f5E72b1e8E60602f5asdf'},
    {label: 'Account 2', address: '0x9952D3b64f5E72b1e8E60602f5FaF8'},
    {label: 'Eth account 2', address: '0x57sD3b64f5E72b1e8E60602f56'},
    {label: 'My sol 2', address: 'wcx92D3b64f5E72b1e8E60602f5FfT'},
    {label: 'Btc 2', address: 'btcx4419952D3b64f5E72b1e8E60602f5as'},
  ];
  const [openEdit, setOpenEdit] = useState(false);
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

        // signClient.on('session_event', ({event}) => {
        //   // Handle session events, such as "chainChanged", "accountsChanged", etc.
        //   console.log(event);
        // });

        // signClient.on('session_update', ({topic, params}) => {
        //   const {namespaces} = params;
        //   const _session = signClient.session.get(topic);
        //   // Overwrite the `namespaces` of the existing session with the incoming one.
        //   const updatedSession = {..._session, namespaces};
        //   // Integrate the updated session state into your dapp state.
        //   console.log(updatedSession);
        // });

        // signClient.on('session_delete', () => {
        //   // Session was deleted -> reset the dapp state, clean up from user session, etc.
        //   console.log('session_delete');
        // });

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

  const renderWallets = () =>
    userWallets.map((wallet, index) => (
      <Touch
        key={wallet.address}
        style={styles.containerItemWallet}
        onPress={() => Model.setStore('selectedWallet', index)}>
        <View style={styles.logoItemWallet} />
        <View style={styles.infoItemWallet}>
          <Text style={styles.labelItemWallet} numberOfLines={1}>
            {wallet.label}
          </Text>
          <Text style={styles.addressItemWallet} numberOfLines={1}>
            {wallet.address.slice(0, 8)}...
            {wallet.address.slice(wallet.address.length - 8)}
          </Text>
        </View>
        {state.selectedWallet === index ? (
          <View style={styles.selectedItemWallet} />
        ) : null}
      </Touch>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/profile-bg.png')}
          style={styles.headerBg}
        />
        <Touch style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Text style={styles.textHeaderButton}>Back</Text>
        </Touch>
        <Touch style={styles.headerButton}>
          <Text
            style={styles.textHeaderButton}
            onPress={() => navigation.navigate('auth')}>
            Log out
          </Text>
        </Touch>
      </View>
      <View style={styles.containerImageProfile}>
        <View style={styles.imageProfile} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameAccount}>
          {userWallets[state.selectedWallet].label}
        </Text>
        <Text style={styles.addressAccount}>
          {userWallets[state.selectedWallet].address.slice(0, 4)}...
          {userWallets[state.selectedWallet].address.slice(
            userWallets[state.selectedWallet].address.length - 5,
          )}
        </Text>
        <Touch
          style={[styles.connectButton, openEdit ? styles.saveButton : {}]}
          onPress={() => setOpenEdit(ov => !ov)}>
          <Text style={styles.textConnectButton}>
            {openEdit ? 'Save changes' : 'Edit Profile'}
          </Text>
        </Touch>
      </View>
      {openEdit ? (
        <>
          <Text style={styles.labelList}>Select default wallet</Text>
          <ScrollView style={styles.scrollList}>
            <Touch style={styles.addWalletButton} onPress={initSign}>
              <Text style={styles.textConnectButton}>Add new wallet</Text>
            </Touch>
            {renderWallets()}
          </ScrollView>
        </>
      ) : null}
      {uriValue ? (
        <WalletConnectWebView
          uri={uriValue}
          onClose={e => {
            setUriValue('');
            if (e === 'Close modal') {
              setOpenEdit(false);
            }
          }}
        />
      ) : null}
    </View>
  );
};

export default Profile;
