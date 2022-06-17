package webubb.domain;

import org.json.simple.JSONObject;

public class Team {
    private int ID;
    private String name;
    private String homeCity;

    public Team(int ID, String name, String homeCity) {
        this.ID = ID;
        this.name = name;
        this.homeCity = homeCity;
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

    public String getHomeCity() {
        return homeCity;
    }

    public void setHomeCity(String homeCity) {
        this.homeCity = homeCity;
    }

    public JSONObject convertToJSONObject(){
        JSONObject jObj = new JSONObject();
        jObj.put("ID", ID);
        jObj.put("name", name);
        jObj.put("homeCity", homeCity);
        return jObj;
    }
}
