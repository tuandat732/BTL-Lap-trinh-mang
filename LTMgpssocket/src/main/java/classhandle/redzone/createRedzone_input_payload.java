package classhandle.redzone;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class createRedzone_input_payload {
    public String listRedzone;

    public createRedzone_input_payload(Map<String, Object> map) {
        this.listRedzone = map.get("listRedzone").toString();

    }
    public Map<String, Object> toMap(){
        Map<String, Object> map= new HashMap<>();
        map.put("listRedzone", this.listRedzone);
        return map;
    }

}
