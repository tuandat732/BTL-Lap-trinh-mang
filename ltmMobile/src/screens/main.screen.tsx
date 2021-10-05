import {useContext, useEffect, useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {NetContext} from '../context/net.context';
import React from 'react';
import GetLocation from 'react-native-get-location';

export const Main = () => {
  const {client} = useContext(NetContext);

  useEffect(() => {
    setInterval(function () {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          const data = {
            x: location.longitude,
            y: location.latitude,
            timestamp: +new Date(),
          };
          client.write(JSON.stringify(data) + '\n');
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }, 5000);

    client.on('data', data => {
      console.log('data from server', data);
    });
  }, [client]);

  const [value, setValue] = useState('');

  const onSubmit = () => {
    console.log('send to server', value);

    client.write(value + '\n');
    // console.log('ret', ret);
    setValue('');
  };

  return (
    <View>
      <TextInput onChangeText={text => setValue(text)} value={value} />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};
