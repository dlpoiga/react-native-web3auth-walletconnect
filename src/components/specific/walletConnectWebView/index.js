import React, {useRef, useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
// import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Touch from '../../common/touch';
import styles from './styles';

function WalletConnectWebView({uri, onClose}) {
  const ref = useRef();

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
      // console.log('Error modal: ', e?.nativeEvent?.description);
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
