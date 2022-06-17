package webubb.domain;

import org.json.simple.JSONObject;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class Player {
    private int ID;
    private String name;
    private String position;

    public Player(int ID, String name, String position) {
        this.ID = ID;
        this.name = name;
        this.position = position;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public JSONObject convertToJSONObject(){
        JSONObject jObj = new JSONObject();
        jObj.put("ID", ID);
        jObj.put("name", name);
        jObj.put("position", position);
        return jObj;
    }
}
