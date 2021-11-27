package threadhandle.admin.redzone;

import classhandle.data.Config;
import classhandle.Message;
import classhandle.redzone.Redzone_output_payload;
import common.Filehandle;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.List;
import java.util.Map;

public class getRedzone implements Runnable {
    private Socket clientSocket;

    public getRedzone(Socket clientSocket) {
        this.clientSocket = clientSocket;
    }
     public void run(){
         try {
             String listRedzone= Filehandle.getRedZone();
             Redzone_output_payload payload= new Redzone_output_payload(listRedzone);

             Message mess= new Message(Config.GET_REDZONE, payload.toMap());
             PrintWriter out = new PrintWriter(
                     clientSocket.getOutputStream(), true);
             out.println(mess.toJson());
             System.out.println("send success: "+ mess.toJson());

         } catch (IOException e) {
             e.printStackTrace();
         } catch (ClassNotFoundException e) {
             e.printStackTrace();
         }
     }

}
