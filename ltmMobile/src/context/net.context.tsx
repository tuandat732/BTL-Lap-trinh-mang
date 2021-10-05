import {createContext, useEffect, useState} from 'react';
import TcpSocket from 'react-native-tcp-socket';
import React from 'react';

export interface NetContextProps {
  client: TcpSocket.Socket;
}

const NetContext = createContext<NetContextProps>({
  client: new TcpSocket.Socket(),
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

  useEffect(() => {
    client.setEncoding('utf8');
    client.on('connect', () => {
      console.log('connection client ok');
    });

    client.on('error', function (error: any) {
      console.log(error);
    });

    client.on('close', function (error: any) {
      console.log('Connection closed!', error);
    });

    return () => {
      client.removeAllListeners();
      client.destroy();
    };
  }, [client]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <NetContext.Provider value={{client}}>{props.children}</NetContext.Provider>
  );
};

export {NetProvider, NetContext};
