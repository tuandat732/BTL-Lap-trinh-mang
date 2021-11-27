package classhandle;

import org.json.JSONObject;

import java.util.Map;

public class Message {
    private String pattern;
    private Map<String, Object> payload;

    public Message(String pattern, Map<String, Object> payload) {
        this.pattern = pattern;
        this.payload = payload;
    }
    public String toJson() {
        JSONObject json= new JSONObject();
        json.put("pattern", this.pattern);
        json.put("payload", this.payload);
        return json.toString();
    }

}
