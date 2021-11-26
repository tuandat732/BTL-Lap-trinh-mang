package classhandle;

import java.util.Map;

public class identify_socket {
    public String role;
    public identify_socket(Map<String, Object> rolemap) {
        this.role= rolemap.get("role").toString();

    }

}
