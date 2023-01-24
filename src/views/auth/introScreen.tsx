import * as React from 'react';
import Spinner from '../../components/common/spinner';

function IntroScreen({navigation}) {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('auth');
    }, 1000);
  });

  return <Spinner />;
}

export default IntroScreen;
