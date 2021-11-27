package threadhandle.admin;

import classhandle.data.Config;
import classhandle.redzone.createRedzone_input_payload;
import classhandle.searchLocation.searchLocation_input_payload;
import classhandle.data.sharedataclass;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import threadhandle.admin.redzone.createRedzone;
import threadhandle.admin.redzone.getRedzone;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

public class adminhandle implements Runnable {
    private Socket clientSocket;

    public adminhandle(Socket clientSocket) {
        this.clientSocket = clientSocket;
    }

    @Override
    public void run() {
        try {
            InputStream clientIn = clientSocket.getInputStream();
            BufferedReader br = new BufferedReader(new
                    InputStreamReader(clientIn));
            String msgFromClient;
            sharedataclass sharedata= new sharedataclass();
            //String msg= br.readLine();
         //   br.
            while ((msgFromClient = br.readLine()) != null) {
                System.out.println(msgFromClient);
                TypeReference<HashMap<String, Object>> typeRef = new TypeReference<>() {
                };
                Map<String, Object> mapping = new ObjectMapper().readValue(msgFromClient, typeRef);
                Boolean closesocket = false;
                if (mapping.containsKey("endProcess"))
                    closesocket = Boolean.getBoolean(mapping.get("endProcess").toString());
                //System.out.println(msgFromClient);
                String pattern= mapping.get("pattern").toString();
                Map<String, Object> payload= (Map<String, Object>) mapping.get("payload");
                //
                if (pattern.equals(Config.SEARCH_LOCATION_HISTORY)){
                    searchLocation_input_payload searchpayload= new searchLocation_input_payload(payload);
                    searchLocationHistory searchsock= new searchLocationHistory(this.clientSocket, searchpayload);
                    new Thread(searchsock).start();
                }
                if (pattern.equals(Config.CREATE_REDZONE)){
                    createRedzone_input_payload createpayload= new createRedzone_input_payload(payload);
                    createRedzone createsock= new createRedzone(this.clientSocket, createpayload);
                    new Thread(createsock).start();


                }
                if (pattern.equals(Config.GET_REDZONE)){
                                getRedzone getredzone= new getRedzone(this.clientSocket);
                                new Thread(getredzone).start();
                }
                if ( closesocket) {
                    clientSocket.close();

                    break;
                }
            }
        } catch (IOException  e) {
            e.printStackTrace();
        } finally {

        }
    }
}
