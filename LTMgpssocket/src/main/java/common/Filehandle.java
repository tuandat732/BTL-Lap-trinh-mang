package common;

import classhandle.data.Config;
import classhandle.redzone.createRedzone_input_payload;
import classhandle.sendLocation.sendLocation_payload;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

public class Filehandle {
    public  static List<Map<String, Object>> getLocation(String userId, String date) throws IOException, ClassNotFoundException {
        List<Map<String, Object>> location= new ArrayList<>();
        String filename= Config.FILE_ROOT + "/logfile/"  + userId + "/"+ date+".txt";
        File file= new File(filename);
        if(file.length() != 0) {
            FileInputStream fin = new FileInputStream(filename);
            ObjectInputStream ois = new ObjectInputStream(fin);
            location = (List<Map<String, Object>>) ois.readObject();
            fin.close();
        }
        return location;
    }

    private void saveUserLocation(String filename, sendLocation_payload payload) throws IOException, ClassNotFoundException {
        File file= new File(filename);
        List<Map<String, Object>> location= new ArrayList<>();
        if(file.length() != 0) {
            FileInputStream fin = new FileInputStream(filename);
            ObjectInputStream ois = new ObjectInputStream(fin);
           location = (List<Map<String, Object>>) ois.readObject();
            fin.close();
        }
        location.add(payload.getLocation());
        FileOutputStream fout= new FileOutputStream (filename);
        ObjectOutputStream oos = new ObjectOutputStream(fout);

        oos.writeObject(location);
        fout.close();
    }

    public void savefile(sendLocation_payload payload) throws IOException, ClassNotFoundException {
        //user_payload payload= new user_payload(json);
        String root = Config.FILE_ROOT + "/logfile";
        //Create log dir
        File parentdir = new File(root);
        if (!parentdir.exists()) {
            parentdir.mkdir();
        }
        //create user dir
        String filedir = root + "/" + payload.getUserId() ;
        File userdir = new File(filedir);
        if (!userdir.exists()) {
            userdir.mkdir();
        }
        //create location file
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        String formatted = format1.format(calendar.getTime());
        String filename = formatted + ".txt";
        File file= new File(filedir + "/" + filename);
        file.createNewFile();
        saveUserLocation(filedir + "/" + filename, payload);
    }
    public Map<String, Object> saveRedzone(createRedzone_input_payload payload) throws IOException, ClassNotFoundException {
        try {
            String root = Config.FILE_ROOT + "/redzone";
            File parentdir = new File(root);
            if (!parentdir.exists()) {
                parentdir.mkdir();
            }
            //
            String filename = root + "/redzone.txt";
            File file = new File(filename);
            file.createNewFile();
            List<Map<String, Object>> listRedzone = new ArrayList<>();
            if (file.length() != 0) {
                FileInputStream fin = new FileInputStream(filename);
                ObjectInputStream ois = new ObjectInputStream(fin);
                listRedzone = (List<Map<String, Object>>) ois.readObject();
                fin.close();
            }
            // List< Map<String, Object>> test= new ArrayList<>();
            listRedzone.add(payload.toMap());
            FileOutputStream fout = new FileOutputStream(filename);
            ObjectOutputStream oos = new ObjectOutputStream(fout);

            oos.writeObject(listRedzone);
            fout.close();
            Map<String, Object> res= new HashMap<>();
            res.put("status", "success");
            return res;
        } catch(Exception e){
            Map<String, Object> res= new HashMap<>();
            res.put("status", "faile");
            return res;
        }
    }
    public static List<Map<String, Object>>  getRedZone() throws IOException, ClassNotFoundException {
        String filename= Config.FILE_ROOT+ "/redzone/redzone.txt";
        File file= new File(filename);
        List<Map<String, Object>> listRedzone= new ArrayList<>();
        if(file.length()!=0 && file.exists()) {
            FileInputStream fin = new FileInputStream(filename);
            ObjectInputStream ois = new ObjectInputStream(fin);
            listRedzone = (List<Map<String, Object>>) ois.readObject();
            fin.close();
        }
        return listRedzone;
    }
}
