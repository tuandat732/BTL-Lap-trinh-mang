package classhandle.searchLocation;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class searchLocation_output_payload {



    private  List<Map<String, Object>> listLocation;

    public searchLocation_output_payload(List<Map<String, Object>> payload) {

        this.listLocation = payload;
    }
    public List<Map<String, Object>> getListLocation() {
        return listLocation;
    }
    public Map<String, Object> toMap(){
        Map<String, Object> map= new HashMap<>();
        map.put("listLocation", this.listLocation);
        return map;
    }
}
