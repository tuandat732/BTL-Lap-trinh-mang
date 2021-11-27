package classhandle.redzone;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Redzone_output_payload {
    public String listRedzone;

    public Redzone_output_payload(String listRedzone) {
        this.listRedzone = listRedzone;
    }
    public Map<String, Object> toMap(){
        Map<String, Object> map= new HashMap<>();
        map.put("listRedzone", this.listRedzone);
        return map;
    }
}
