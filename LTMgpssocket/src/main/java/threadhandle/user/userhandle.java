package threadhandle.user;

import classhandle.sendLocation.sendLocation_payload;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import classhandle.data.sharedataclass;

import common.Filehandle;

public class userhandle implements Runnable {
    private Socket clientSocket;

    public userhandle(Socket socket) {
        this.clientSocket = socket;
    }

    public void run() {
        try {
            InputStream clientIn = clientSocket.getInputStream();
            BufferedReader br = new BufferedReader(new
                    InputStreamReader(clientIn));
            String msgFromClient;
            sharedataclass sharedata= new sharedataclass();
            while ((msgFromClient = br.readLine()) != null) {
                System.out.println(msgFromClient);
                TypeReference<HashMap<String, Object>> typeRef = new TypeReference<>() {
                };
                Map<String, Object> mapping = new ObjectMapper().readValue(msgFromClient, typeRef);
                Boolean closesocket = false;
                if (mapping.containsKey("endProcess"))
                    closesocket = Boolean.getBoolean(mapping.get("endProcess").toString());
                System.out.println(msgFromClient);
                if (!closesocket) {
                    //database db = new database();
                   // db.savelog(mapping);
                    sendLocation_payload payload= new sendLocation_payload((Map<String, Object>) mapping.get("payload"));
                    Filehandle filehandle = new Filehandle();
                    filehandle.savefile(payload);

                    List<Socket> listadmin= sharedataclass.getListadmin();
                    for(Socket socket: listadmin) {
                        if (socket.isConnected()) {
                            sendLocationRealtime sendLocationSock = new sendLocationRealtime(socket, msgFromClient);
                            new Thread(sendLocationSock).start();
                        } else{
                            sharedata.deleteSocketAdmin(socket);
                        }
                    }

                }
                if ( closesocket) {
                    clientSocket.close();

                    break;
                }
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {

        }
    }
}
