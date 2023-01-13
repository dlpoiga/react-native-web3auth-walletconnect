import React, {Component} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import '@walletconnect/react-native-compat';
import {Store, StoreProvider} from './hooks/main_store';
import Spinner from './components/common/spinner';
import {StatusBar} from 'react-native';
import model_class from './hooks/Model';
import Routing from './routing';
import colors from './themes/colors';

// Function to init dispatch model classes
function InitHooksClasses() {
  const {dispatch} = React.useContext(Store);

  // Init dispatch for model or models
  React.useEffect(() => {
    model_class.set_dispatch(dispatch);
    return () => {};
  }, [dispatch]);
  return <React.Fragment />;
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{flex: 1, backgroundColor: colors.lightgray}}
          // forceInset={{ top: 'never' }}
        >
          <StatusBar barStyle="light-content" />
          <StoreProvider>
            <InitHooksClasses />
            <Routing />
            <Spinner />
          </StoreProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
