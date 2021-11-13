import java.io.*;
import java.util.Map;
import java.util.Formatter;
import java.util.Scanner;

public class savetofile {
    private void save(File file, Map<String, Object> json) throws IOException {
        Scanner myReader= new Scanner(file);
        String log="";
        while (myReader.hasNextLine()) {
            log=log+ myReader.nextLine();
        }
        log= log+json.get("location").toString();
        myReader.close();
        FileWriter myWriter = new FileWriter(file);
        myWriter.write(log);
        myWriter.close();
    }
    public void savefile(Map<String, Object> json) throws IOException {
        String root= "/home/hieu/Desktop/BTL-Lap-trinh-mang/LTMgpssocket/src/main/java/";
        File parentdir= new File(root +"logfile");
        if (!parentdir.exists()){
            parentdir.mkdir();
        }
        File[] children= parentdir.listFiles();
        Boolean check= true;
        String filestr= json.get("userId").toString()+ ".txt";
        if (children== null){
            File logfile= new File(root +"logfile"+ "/"+ filestr);
            save(logfile, json);
        }
        for(File file: children){
            if(file.getName()==filestr){
               save(file, json);
                check= false;
            }
        }
        if (check){
            File logfile= new File(root +"logfile"+ "/"+ filestr);
            logfile.createNewFile();
            save(logfile, json);
        }
    }
}
