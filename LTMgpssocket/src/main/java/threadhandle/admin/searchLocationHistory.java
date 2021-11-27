package threadhandle.admin;

import classhandle.data.Config;
import classhandle.Message;
import classhandle.searchLocation.searchLocation_output_payload;
import classhandle.searchLocation.searchLocation_input_payload;
import common.Filehandle;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

public class searchLocationHistory implements Runnable{
    private Socket clientSocket;
    private String userId;
    private String fromDate;
    private String toDate;

    public searchLocationHistory(Socket clientSocket, searchLocation_input_payload payload) {
        this.clientSocket = clientSocket;
        this.userId = payload.userId;
        this.fromDate = payload.fromDate;
        this.toDate = payload.toDate;
    }

    public void run() {
        try {

            Calendar fromCal = Calendar.getInstance();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            fromCal.setTime(sdf.parse(this.fromDate));
            Calendar toCal = Calendar.getInstance();
            toCal.setTime(sdf.parse(this.toDate));
            List<Map<String, Object>> result= new ArrayList<>();
            for(Calendar cal= fromCal; cal.compareTo(toCal) <=0 ; cal.add(Calendar.DAY_OF_MONTH,1)  ){
                        String dateString= sdf.format(cal.getTime());
                        String filename=  Config.FILE_ROOT + "/logfile/"  + this.userId + "/"+ sdf.format(cal.getTime()) + ".txt";
                        File file= new File(filename);
                        if (!file.exists() && file.length()==0) continue;
                        List<Map<String, Object>> listlocation= Filehandle.getLocation(this.userId, dateString);
                        result.addAll(listlocation);
             }
            ////
            searchLocation_output_payload output = new searchLocation_output_payload(result);
            Message mess= new Message(Config.SEND_LOCATION_HISTORY, output.toMap());
            PrintWriter out = new PrintWriter(
                    clientSocket.getOutputStream(), true);
            out.println(mess.toJson());
            System.out.println("send success: "+ mess.toJson());
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {

        }
    }
}
