package classhandle.searchLocation;

import java.util.Map;

public class searchLocation_input_payload {
    public String userId;
    public String fromDate;
    public String toDate;
    public searchLocation_input_payload(Map<String, Object> map) {
        this.userId= map.get("userId").toString();
        this.fromDate = map.get("fromDate").toString();
        this.toDate = map.get("toDate").toString();
    }



}
