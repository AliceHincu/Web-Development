package webubb.domain;

import org.json.simple.JSONObject;

public class TeamMembers {
    private int ID;
    private int IDplayer1;
    private int IDplayer2;
    private int IDteam;

    public TeamMembers(int ID, int IDplayer1, int IDplayer2, int IDteam) {
        this.ID = ID;
        this.IDplayer1 = IDplayer1;
        this.IDplayer2 = IDplayer2;
        this.IDteam = IDteam;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getIDplayer1() {
        return IDplayer1;
    }

    public void setIDplayer1(int IDplayer1) {
        this.IDplayer1 = IDplayer1;
    }

    public int getIDplayer2() {
        return IDplayer2;
    }

    public void setIDplayer2(int IDplayer2) {
        this.IDplayer2 = IDplayer2;
    }

    public int getIDteam() {
        return IDteam;
    }

    public void setIDteam(int IDteam) {
        this.IDteam = IDteam;
    }

    public JSONObject convertToJSONObject(){
        JSONObject jObj = new JSONObject();
        jObj.put("ID", ID);
        jObj.put("IDplayer1", IDplayer1);
        jObj.put("IDplayer2", IDplayer2);
        jObj.put("IDteam", IDteam);
        return jObj;
    }
}
