package webubb.domain;

import org.json.simple.JSONObject;

public class Quiz {
    private int ID;
    private String title;
    private String listOfQuestions;

    public Quiz(int ID, String title, String listOfQuestions) {
        this.ID = ID;
        this.title = title;
        this.listOfQuestions = listOfQuestions;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getListOfQuestions() {
        return listOfQuestions;
    }

    public void setListOfQuestions(String listOfQuestions) {
        this.listOfQuestions = listOfQuestions;
    }

    public JSONObject convertToJSONObject(){
        JSONObject jObj = new JSONObject();
        jObj.put("ID", ID);
        jObj.put("title", title);
        jObj.put("listOfQuestions", listOfQuestions);
        return jObj;
    }
}
