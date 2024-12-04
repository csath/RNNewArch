/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import * as Keychain from 'react-native-keychain';
import { Picker } from '@react-native-picker/picker';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [key, setKey] = useState('1234');
  const [value, setValue] = useState('1111');
  const [storageType, setStorageType] = useState(Keychain.STORAGE_TYPE.AES_GCM);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const writeValue = () => {
    Keychain.setInternetCredentials(key, 'unused', value, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      storage: storageType,
    }).then(() => {
      Alert.alert(`Value write complete`, JSON.stringify({
        key,
        value,
        storageType,
      }, null, 2));
    }).catch((error) => {
      Alert.alert('error: value written', error);
    });
  }

  const readValue = () => {
    Keychain.getInternetCredentials(key).then((value) => {
      if (value === false) {
        Alert.alert('Value read', 'No value found for key');
        return
      }
      Alert.alert(`Value read complete`, JSON.stringify({
        key,
        value: value?.password || false,
        storageType: value?.storage,
      }, null, 2));
    }).catch((error) => {
      Alert.alert('error: value written', error);
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
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.inputTitle}>
            Key:
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setKey}
            value={key}
          />
          <Text style={styles.inputTitle}>
            Value:
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setValue}
            value={value}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
          <View style={styles.picker}>
            <Text style={styles.inputTitle}>
              Storage type:
            </Text>
            <Picker
              selectedValue={storageType}
              onValueChange={(itemValue) =>
                setStorageType(itemValue)
              }>
              {Object.values(Keychain.STORAGE_TYPE).map((item) => {
                return <Picker.Item key={item} label={item} value={item} />
              }
              )}
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='Read value' onPress={readValue} />
          <Button title='Write value' onPress={writeValue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'space-around',
    height: 150
  },
  picker: {
    marginBottom: 10
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    paddingTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default App;
