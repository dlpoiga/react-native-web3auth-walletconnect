import * as React from 'react';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

import Model from '../../hooks/Model';
import {Store} from '../../hooks/main_store';
import Touch from '../../components/touch';

function HomeScreen({navigation}) {
  const {state} = React.useContext(Store);
  const [doneLoad, setDoneLoad] = React.useState(false);

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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/intro.png')}
      />
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.description}>
        Create a Wallet, send, receive, have your own unique QR code and manage
        your finances.
      </Text>
      <Touch
        onPress={() => navigation.navigate('wallethome')}
        style={styles.button}>
        <Text style={styles.labelButton}>Create</Text>
      </Touch>
      <Touch
        onPress={() => navigation.navigate('wallethome')}
        style={[styles.button, styles.secondaryButton]}>
        <Text style={[styles.labelButton, styles.secondaryLabel]}>Log In</Text>
      </Touch>
      {/* <Button
        title={`Open Ourglass app [${schemeExternalApp}]`}
        onPress={() =>
          Linking.canOpenURL(schemeExternalApp)
            .then(() => Linking.openURL(schemeExternalApp))
            .catch(e => Alert.alert('Linking error', String(e)))
        }
      /> */}
    </View>
  );
}

export default HomeScreen;
