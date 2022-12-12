import React, {useRef, useCallback, useEffect} from 'react';
import {WebView} from 'react-native-webview';

function Web3AuthWebView({uri, onClose}) {
  const ref = useRef();

  const onMessage = useCallback(
    async ({nativeEvent: {data}}) => {
      try {
        console.log('Message modal: ', data);
        if (data === 'Close modal') {
          onClose();
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

  useEffect(() => {
    if (ref.current.postMessage) {
      setTimeout(() => {
        // ref.current.postMessage(uri);
      }, 1000);
    }
  }, []);

  return (
    <WebView
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
      originWhitelist={['*']}
      onMessage={onMessage}
      onError={onError}
      source={{uri: 'http://localhost:3000/'}}
    />
  );
}

export default Web3AuthWebView;
