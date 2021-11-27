import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

import classhandle.data.Config;
import classhandle.identify_socket;
import classhandle.data.sharedataclass;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import threadhandle.admin.adminhandle;
import threadhandle.user.userhandle;

public class serverside {
    public static void main(String [] args) {
        ServerSocket server = null;
        Socket client;
// Default port number we are going to use
        int portnumber = 1234;
        if (args.length >= 1){
            portnumber = Integer.parseInt(args[0]);
        }
// Create Server side socket
        try {
            server = new ServerSocket(portnumber);
            server.setReuseAddress(true);
        } catch (IOException ie) {
            System.out.println("Cannot open socket." + ie);
            System.exit(1);
        }
        System.out.println("ServerSocket is created " + server);
       sharedataclass sharedata= new sharedataclass();
// Wait for the data from the client and reply
        while(true) {
            try {
// Listens for a connection to be made to
// this socket and accepts it. The method blocks until
// a connection is made
                System.out.println("Waiting for connect request...");
                client = server.accept();
                System.out.println("Connect request is accepted...");
                String clientHost = client.getInetAddress().getHostAddress();
                int clientPort = client.getPort();
                System.out.println("Client host = " + clientHost + " Client port = " + clientPort);
// Read data from the client
                InputStream clientIn = client.getInputStream();
                BufferedReader br = new BufferedReader(new
                        InputStreamReader(clientIn));
                String msgFromClient;
                if((msgFromClient = br.readLine()) != null){
                    System.out.println(msgFromClient);
                    TypeReference<HashMap<String, Object>> typeRef = new TypeReference<>() {
                    };
                    Map<String, Object> mapping = new ObjectMapper().readValue(msgFromClient, typeRef);
                    String pattern= mapping.get("pattern").toString();
                    Map<String, Object> payload= (Map<String, Object>) mapping.get("payload");
                    if (pattern.equals(Config.IDENTITY_SOCKET)){
                        identify_socket idsocket= new identify_socket(payload);
                        if (idsocket.role.equals( "user")){
                            userhandle usersock= new userhandle(client);
                            new Thread(usersock).start();
                        }
                        if (idsocket.role.equals("admin")){
                           sharedata.addSocketAdmin(client);
                           adminhandle adminsock= new adminhandle(client);
                           new Thread(adminsock).start();
                        }

                    }
                }
//                clienthandle clientsock= new clienthandle(client);
//                new Thread(clientsock).start();
            } catch (IOException ie) {
            }
        }
    }
}
