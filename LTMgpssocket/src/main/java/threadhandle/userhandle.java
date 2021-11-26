package threadhandle;

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
import classhandle.sharedataclass;

import common.database;
import common.savetofile;

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
//                    savetofile file= new savetofile();
//                    file.savefile(mapping);
                    List<Socket> listadmin= sharedataclass.getListadmin();
                    for(Socket socket: listadmin) {
                        if (socket.isConnected()) {
                            adminhandle adminsock = new adminhandle(socket, msgFromClient);
                            new Thread(adminsock).start();
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
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

        }
    }
}
