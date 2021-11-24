import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

import classhandle.sharedataclass;
import threadhandle.clienthandle;

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
                clienthandle clientsock= new clienthandle(client);
                new Thread(clientsock).start();
            } catch (IOException ie) {
            }
        }
    }
}
