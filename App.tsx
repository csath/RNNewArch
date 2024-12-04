/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import * as Keychain from 'react-native-keychain';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const writeValue = () => {
    const value = '1234';
    Keychain.setInternetCredentials('username', 'unused', value, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      storage: Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH,
    }).then(() => {
      Alert.alert('Value written', value);
    }).catch((error) => {
      console.error('error: value written', error);
    }).finally(() => {
      console.log('Value written finally');
    });
  }

  const readValue = () => {
    Keychain.getInternetCredentials('username').then((value) => {
      if (typeof value !== 'object') {
        console.log('value', value);
        return;
      }
      Alert.alert('Value read', value.password);
    }).catch((error) => {
      console.error('error: value written', error);
    }).finally(() => {
      console.log('Value read finally');
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title='Read value' onPress={readValue} />
          <Button title='Write value' onPress={writeValue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default App;
