package classhandle.sendLocation;

import java.util.Map;

public class sendLocation_payload {
    private  String userId;
    private  Map<String, Object> location;

    public Map<String, Object> getLocation() {
        return location;
    }

    public String getUserId() {
        return userId;
    }

    public sendLocation_payload(Map<String, Object> json){
        this.userId= json.get("userId").toString();
        this.location= (Map<String, Object>) json.get("location");
    }
}
