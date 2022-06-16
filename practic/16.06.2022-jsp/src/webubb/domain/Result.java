package webubb.domain;

public class Result {
    private int ID;
    private String username;
    private int result;

    public Result(int ID, String username, int result) {
        this.ID = ID;
        this.username = username;
        this.result = result;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }
}
