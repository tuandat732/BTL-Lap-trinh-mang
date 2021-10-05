import React from 'react';
import {SafeAreaView} from 'react-native';
import {NetProvider} from './src/context/net.context';
import {Main} from './src/screens/main.screen';

const App = () => {
  return (
    <SafeAreaView>
      <NetProvider>
        <Main />
      </NetProvider>
    </SafeAreaView>
  );
};

export default App;
