import {createContext, useEffect, useState} from 'react';
import TcpSocket from 'react-native-tcp-socket';
import React from 'react';

export interface NetContextProps {
  client: TcpSocket.Socket;
  isConnected: boolean;
}

const NetContext = createContext<NetContextProps>({
  client: new TcpSocket.Socket(),
  isConnected: false,
});

const NetProvider = ({...props}) => {
  const [client] = useState<TcpSocket.Socket>(() =>
    TcpSocket.createConnection(
      {
        port: 5000,
        host: '10.0.2.2',
        // localAddress: '127.0.0.1',
        reuseAddress: true,
        // localPort: 3000,
        // tls: true,
      },
      () => {},
    ),
  );
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    client.setEncoding('utf8');
    client.on('connect', () => {
      console.log('connection client ok');
      setIsConnected(true);
    });

    client.on('error', function (error: any) {
      console.log(error);
    });

    client.on('close', function (error: any) {
      console.log('Connection closed!', error);
      setIsConnected(false);
    });

    return () => {
      client.removeAllListeners();
      client.destroy();
    };
  }, [client]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <NetContext.Provider value={{client, isConnected}}>
      {props.children}
    </NetContext.Provider>
  );
};

export {NetProvider, NetContext};
