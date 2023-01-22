import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import styles from './styles';

import Model from '../../hooks/Model';
import Touch from '../../components/common/touch';

function AuthScreen({navigation}) {
  React.useEffect(() => {
    Model.setStore('loading', false);
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
        <Touch
          onPress={() => navigation.navigate('wallethome')}
          style={styles.button}>
          <Text style={styles.labelButton}>Create</Text>
        </Touch>
        <Touch
          onPress={() => navigation.navigate('wallethome')}
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
    </View>
  );
}

export default AuthScreen;
