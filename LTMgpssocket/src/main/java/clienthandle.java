import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

public class clienthandle implements Runnable {
    private Socket clientSocket;

    public clienthandle(Socket socket) {
        this.clientSocket = socket;
    }

    public void run() {
        try {
            InputStream clientIn = clientSocket.getInputStream();
            BufferedReader br = new BufferedReader(new
                    InputStreamReader(clientIn));
            String msgFromClient;
            while ((msgFromClient = br.readLine()) != null) {
                TypeReference<HashMap<String, Object>> typeRef = new TypeReference<>() {
                };
                Map<String, Object> mapping = new ObjectMapper().readValue(msgFromClient, typeRef);
                Boolean closesocket = false;
                if (mapping.containsKey("endProcess"))
                    closesocket = Boolean.getBoolean(mapping.get("endProcess").toString());
                System.out.println(msgFromClient);
                if (!closesocket) {
                    database db = new database();
                    db.savelog(mapping);
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
