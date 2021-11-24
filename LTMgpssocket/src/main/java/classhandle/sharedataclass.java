package classhandle;

import java.net.Socket;
import java.util.List;

public class sharedataclass {
    private static List<Socket> listadmin;
    public void addSocketAdmin(Socket socket){
        this.listadmin.add(socket);
    }
    public void deleteSocketAdmin(Socket socket){
        this.listadmin.remove(socket);
    }
}
