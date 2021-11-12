import {useContext, useEffect, useState} from 'react';
import {Button, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {NetContext} from '../context/net.context';
import React from 'react';
import GetLocation from 'react-native-get-location';

export const MainScreen = () => {
  const {client, isConnected} = useContext(NetContext);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(null);

  useEffect(() => {
    if ((!isOpenMap || !isConnected) && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isOpenMap, intervalId, isConnected]);

  useEffect(() => {
    client.on('data', data => {
      console.log('data from server', data);
    });

    return () => {
      client.removeListener('data');
    };
  }, [client]);

  const [value, setValue] = useState('');

  const onSubmit = () => {
    console.log('send to server', value);

    client.write(value + '\n');
    // console.log('ret', ret);
    setValue('');
  };

  const toggleMap = () => {
    const nextBool = !isOpenMap;
    if (nextBool) {
      const sendLocaleInterver = setInterval(function () {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
          .then(location => {
            const data = {
              userId: 1,
              location: {
                x: location.longitude,
                y: location.latitude,
                timestamp: +new Date(),
              },
            };
            console.log(JSON.stringify(data));
            if (!isConnected) {
              console.log('client not connect nè');
              return clearInterval(sendLocaleInterver);
            }
            client.write(JSON.stringify(data) + '\n');
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
      }, 2000);
      setIntervalId(sendLocaleInterver);
    } else if (!nextBool || !isConnected) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsOpenMap(nextBool);
  };

  return (
    <View>
      <View
        style={{
          marginTop: 20,
          height: 300,
          backgroundColor: 'white',
          borderRadius: 20,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 50,
            marginHorizontal: 20,
          }}>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}>Myzone</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            marginBottom: 10,
            maxHeight: 50,
          }}>
          <TouchableOpacity>
            <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
              <Text>Quét</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMap}>
            <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
              <Text>{!isOpenMap ? 'Theo dõi' : 'Bỏ theo dõi'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 10, marginHorizontal: 20}}>
        <TextInput
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 30,
            marginBottom: 10,
            borderRadius: 10,
          }}
          onChangeText={text => setValue(text)}
          value={value}
        />
        <Button title="Submit" onPress={onSubmit} />
      </View>
    </View>
  );
};
