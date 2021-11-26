package classhandle;

import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class sharedataclass {
    private static List<Socket> listadmin= new ArrayList<>();

    public static List<Socket> getListadmin() {
        return listadmin;
    }

    public  void addSocketAdmin(Socket socket){
        listadmin.add(socket);
    }
    public void deleteSocketAdmin(Socket socket){
        listadmin.remove(socket);
    }
}
