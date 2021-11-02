import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

public class clientside1 {
    public static void main(String args[]) throws IOException {
        Socket client = null;
// Default port number we are going to use
        int portnumber = 1234;
        client = new Socket(InetAddress.getLocalHost(), portnumber);
        OutputStream clientOut = client.getOutputStream();
        PrintWriter pw = new PrintWriter(clientOut, true);
        for(int i=0;i<10;i++) {
            try {
                Thread.sleep(5000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            try {
                String msg = "";
// Create a client socket


// Create an output stream of the client socket

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
                mapmsg.put("idUser", "user1");
                Map<String, Object> location= new HashMap<>();
                location.put("x",x);
                location.put("y",y);
                mapmsg.put("location", location);
                msg=  new ObjectMapper().writeValueAsString(mapmsg);
                System.out.println(msg+"\n");
                pw.println(msg);
// Read data from the input stream of the client socket.
               // System.out.println("Message returned from the server = " + br.readLine());

                pw.flush();
                //br.close();
                //client.close();
// Stop the operation
                if (msg.equalsIgnoreCase("Bye")) {break;
                }
            } catch (IOException ie) {
                System.out.println("I/O error " + ie);
            }

        }
        pw.close();
    }
}
