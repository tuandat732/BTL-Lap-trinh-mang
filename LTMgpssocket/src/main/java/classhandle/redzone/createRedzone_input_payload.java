package classhandle.redzone;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class createRedzone_input_payload {
    public String redzoneName;
    public String listLocation;

    public createRedzone_input_payload(Map<String, Object> map) {
        this.listLocation = map.get("listLocation").toString();
        this.redzoneName = map.get("redzoneName").toString();
    }
    public Map<String, Object> toMap(){
        Map<String, Object> map= new HashMap<>();
        map.put("redzoneName", this.redzoneName);
        map.put("listLocation", this.listLocation);
        return map;
    }

}
