import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

public class clientside {
    public static void main(String args[]) {
        Socket client = null;
// Default port number we are going to use
        int portnumber = 1234;
        if (args.length >= 1){
            portnumber = Integer.parseInt(args[0]);
        }
        for(int i=0;i<10;i++) {
            try {
                String msg = "";
// Create a client socket
                client = new Socket(InetAddress.getLocalHost(), portnumber);
                System.out.println("Client socket is created " + client);
// Create an output stream of the client socket
                OutputStream clientOut = client.getOutputStream();
                PrintWriter pw = new PrintWriter(clientOut, true);
// Create an input stream of the client socket
//                InputStream clientIn = client.getInputStream();
//                BufferedReader br = new BufferedReader(new
//                        InputStreamReader(clientIn));
// Create BufferedReader for a standard input

// Read data from standard input device and write it
// to the output stream of the client socket.
                Map<String, Object> mapmsg= new HashMap<>();
                Integer x= (int) Math.floor(Math.random()*(100-1+1)+1);
                Integer y= (int) Math.floor(Math.random()*(100-1+1)+1);
                mapmsg.put("idUser", "user2");
                Map<String, Object> location= new HashMap<>();
                location.put("x",x);
                location.put("y",y);
                mapmsg.put("location", location);
                msg=  new ObjectMapper().writeValueAsString(mapmsg);
                System.out.println(msg);
                pw.println(msg);
// Read data from the input stream of the client socket.
               // System.out.println("Message returned from the server = " + br.readLine());
                pw.close();
                //br.close();
                client.close();
// Stop the operation
                if (msg.equalsIgnoreCase("Bye")) {break;
                }
            } catch (IOException ie) {
                System.out.println("I/O error " + ie);
            }
        }
    }
}
