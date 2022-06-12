package webubb.domain;

import org.json.simple.JSONObject;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class Topic {
    private int id;
    private String topicname;

    public Topic(int id, String topicname) {
        this.id = id;
        this.topicname = topicname;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTopicname() {
        return topicname;
    }

    public void setTopicname(String topicname) {
        this.topicname = topicname;
    }

    public JSONObject convertToJSONObject(){
        JSONObject jObj = new JSONObject();
        jObj.put("id", id);
        jObj.put("topicname", topicname);
        return jObj;
    }
}
