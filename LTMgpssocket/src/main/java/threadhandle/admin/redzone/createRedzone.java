package threadhandle.admin.redzone;

import classhandle.data.Config;
import classhandle.Message;
import classhandle.data.sharedataclass;
import classhandle.redzone.createRedzone_input_payload;
import common.Filehandle;
import threadhandle.user.sendLocationRealtime;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.List;

public class createRedzone  implements Runnable{
    private Socket clientSocket;
    private createRedzone_input_payload payload;

    public createRedzone(Socket clientSocket, createRedzone_input_payload payload) {
        this.clientSocket = clientSocket;
        this.payload = payload;
    }


    public void run() {
        try {
            //createRedzone_input_payload createpayload= new createRedzone_input_payload(this.payload);
            Filehandle file= new Filehandle();
            file.saveRedzone(payload);
            Message mess= new Message(Config.CREATE_REDZONE, payload.toMap());
            sharedataclass sharedata= new sharedataclass();
            List<Socket> listadmin= sharedataclass.getListadmin();
            for(Socket socket: listadmin) {
                if (socket.isConnected()) {
                    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                             out.println(mess.toJson());
                } else{
                    sharedata.deleteSocketAdmin(socket);
                }
            }
//            PrintWriter out = new PrintWriter(
//                    clientSocket.getOutputStream(), true);
//            out.println(mess.toJson());
            System.out.println("send success: " + mess.toJson());
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }  finally {

        }
    }
}
