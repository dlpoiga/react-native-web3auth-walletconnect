import React, {useRef, useCallback, useEffect, useState} from 'react';
import {View, Text, Linking} from 'react-native';
// import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Touch from '../../common/touch';
import Model from '../../../hooks/Model';
import styles from './styles';

function WalletConnectWebView({uri, onClose}) {
  const ref = useRef();
  const [lastUrl, setLastUrl] = useState('');

  // const saveLocalAccount = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('localAccount', value)
  //   } catch (error) {}
  // };

  const onMessage = useCallback(
    async ({nativeEvent: {data}}) => {
      try {
        console.log('Message modal: ', data);
        if (data === 'Close modal') {
          onClose('Close modal');
        }
      } catch (e) {
        /* web */
      }
    },
    [onClose],
  );

  const onError = useCallback(
    async e => {
      // console.log('Error modal: ', e);
      // Linking.canOpenURL(e?.nativeEvent?.url)
      //   .then(() => {
      //     return Linking.openURL(e?.nativeEvent?.url);
      //   })
      //   .catch(e => console.loog(e));
      onClose(e?.nativeEvent?.description);
    },
    [onClose],
  );

  const htmlValue = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>WalletConnect</title>
      </head>

      <body style="margin: 0; padding: 0">
        <script src="https://cdn.jsdelivr.net/npm/@walletconnect/qrcode-modal@1.8.0/dist/umd/index.min.js"></script>
        <script>
          var WalletConnectQRCodeModal = window.WalletConnectQRCodeModal.default; 

          var shouldPostMessage = data => {
            if (window.ReactNativeWebView) {
              return window.ReactNativeWebView.postMessage(data);
            }
          };

          window.addEventListener("message", message => {
            shouldPostMessage("Open modal");
    
            WalletConnectQRCodeModal.open(message.data, () => {
              WalletConnectQRCodeModal.close();
              shouldPostMessage("Close modal");
            });
          });
    
        </script>
      </body>
    </html>
    `;

  useEffect(() => {
    if (ref.current?.postMessage) {
      setTimeout(() => {
        ref.current.postMessage(uri);
      }, 500);
    }
  }, [uri]);

  useEffect(() => {
    if (lastUrl && lastUrl.includes('http')) {
      Model.setStore('loading', true);
      setTimeout(() => {
        Linking.canOpenURL(lastUrl)
          .then(() => {
            return Linking.openURL(lastUrl);
          })
          .then(() => {
            Model.setStore('loading', false);
          })
          .catch(e => console.log('Error open link: ', e))
          .finally(() => Model.setStore('loading', false));
      }, 2000);
    }
  }, [lastUrl]);

  return (
    <View style={styles.container}>
      <WebView
        ref={ref}
        style={{
          width: '100%',
          height: '100%',
        }}
        originWhitelist={['*']}
        onMessage={onMessage}
        onError={onError}
        source={{
          baseUrl: '',
          html: htmlValue.trim(),
        }}
        onLoadStart={e => {
          // console.log('Load: ', e?.nativeEvent?.url);
          setLastUrl(e?.nativeEvent?.url || '');
        }}
      />
      <Touch style={styles.containerbutton} onPress={() => onClose()}>
        <Text style={styles.textButton}>Cancel process</Text>
      </Touch>
    </View>
  );
}

// WalletConnectWebView.propTypes = {
//   id: PropTypes.string.isRequired,
//   onQRCodeModalClosed: PropTypes.func.isRequired,
//   onWalletConnected: PropTypes.func.isRequired,
//   onWalletUpdated: PropTypes.func.isRequired,
//   onCallbacksGenerated: PropTypes.func.isRequired,
// };

// WalletConnectWebView.defaultProps = {};

export default WalletConnectWebView;
