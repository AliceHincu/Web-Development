package webubb.domain;

import org.json.simple.JSONObject;

public class Question {
    private int ID;
    private String text;
    private String correctAnswer;
    private String wrongAnswer;

    public Question(int ID, String text, String correctAnswer, String wrongAnswer) {
        this.ID = ID;
        this.text = text;
        this.correctAnswer = correctAnswer;
        this.wrongAnswer = wrongAnswer;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getWrongAnswer() {
        return wrongAnswer;
    }

    public void setWrongAnswer(String wrongAnswer) {
        this.wrongAnswer = wrongAnswer;
    }

    public JSONObject convertToJSONObject(){
        JSONObject jObj = new JSONObject();
        jObj.put("ID", ID);
        jObj.put("text", text);
        jObj.put("correctAnswer", correctAnswer);
        jObj.put("wrongAnswer", wrongAnswer);
        return jObj;
    }
}
