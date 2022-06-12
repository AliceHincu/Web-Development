package webubb.model;

import webubb.domain.FamilyRelation;
import webubb.domain.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.Objects;

/**
 * Created by forest.
 */
public class DBManager {
    private Statement stmt;
    private final String databaseName = "testingconnection";
    private final String connectionString = "jdbc:mysql://localhost:3306/" + databaseName;
    private final String username = "root";
    private final String password = "";
    private final String driver = "com.mysql.cj.jdbc.Driver";

    public DBManager() {
        connect();
    }

    public void connect() {
        try {
            Class.forName(driver);
            Connection con = DriverManager.getConnection(connectionString, username, password);
            stmt = con.createStatement();
        } catch(Exception ex) {
            System.out.println("Error when trying to connect:"+ex.getMessage());
            ex.printStackTrace();
        }
    }

    public String getMother(String username) {
        ResultSet rs;
        String sqlGetMother = "select mother from familyrelations where username='" + username + "'";
        String mother = null;
        try{
            rs = stmt.executeQuery(sqlGetMother);
            if(rs.next()){
                mother = rs.getString("mother");
            }
            //rs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return mother;
    }

    public String getFather(String username) {
        ResultSet rs;
        String sqlGetFather = "select father from familyrelations where username='" + username + "'";
        String father = null;
        try{
            rs = stmt.executeQuery(sqlGetFather);
            if(rs.next()){
                father = rs.getString("father");
            }
            //rs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return father;
    }

    public FamilyRelation getFamily(String username) {
        ResultSet rs;
        String sqlGetFather = "select * from familyrelations where username='" + username + "'";
        FamilyRelation family = null;
        try{
            rs = stmt.executeQuery(sqlGetFather);
            if(rs.next()){
                family = new FamilyRelation(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("mother"),
                        rs.getString("father")
                );
            }
            //rs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return family;
    }

    private boolean checkIfUserExists(String username){
        ResultSet rs;
        String sqlCheckUser = "SELECT * FROM users where username='" + username + "'";

        try {
            rs = stmt.executeQuery(sqlCheckUser);
            if (rs.next()) {
                return true;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    private boolean addUser(String username){
        ResultSet rs;
        String sqlAddUser = "INSERT INTO users(username) VALUES ('" + username + "')";

        int affectedRows = 0;
        try {
            affectedRows = stmt.executeUpdate(sqlAddUser);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return affectedRows > 0;
    }

    public boolean addFamily(String username, String mother, String father) {
        // to add the family in db, both mother and father should be added in the users (if they don't exist).
        boolean motherAdded;
        boolean fatherAdded;

        if(checkIfUserExists(mother)){
            motherAdded = true;
        } else {
            motherAdded = this.addUser(mother);
        }

        if(checkIfUserExists(father)){
            fatherAdded = true;
        } else {
            fatherAdded = this.addUser(father);
        }

        if(motherAdded && fatherAdded){
            // add family
            String sqlAddFamily = "INSERT INTO familyrelations(username, mother, father) VALUES ('"
                    + username + "', '" + mother + "', '" + father + "')";
            int affectedRows = 0;
            try {
                affectedRows = stmt.executeUpdate(sqlAddFamily);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return affectedRows > 0;
        }

        return false;
    }

    public ArrayList<String> getDescendingLineFather(String username) {
        ArrayList<String> fathers = new ArrayList<>();
        fathers.add(username);

        boolean isNotFinished = true;
        String currentUsername = username;

        while(isNotFinished) {
            FamilyRelation family = getFamily(currentUsername);
            if(family == null){
                isNotFinished = false;
            } else {
                String father = family.getFather();
                fathers.add(father);
                currentUsername = father;
            }
        }

        return fathers;
    }

    public ArrayList<String> getDescendingLineMother(String username) {
        ArrayList<String> mothers = new ArrayList<>();
        mothers.add(username);

        boolean isNotFinished = true;
        String currentUsername = username;

        while(isNotFinished) {
            FamilyRelation family = getFamily(currentUsername);
            if(family == null){
                isNotFinished = false;
            } else {
                String mother = family.getMother();
                mothers.add(mother);
                currentUsername = mother;
            }
        }

        return mothers;
    }

    public boolean authenticate(String username, String familyMember) {
        String mother = this.getMother(username);
        String father = this.getFather(username);
        return Objects.equals(mother, familyMember) || Objects.equals(father, familyMember);

    }
//
//    public ArrayList<FamilyRelation> getUserAssets(int userid) {
//        ArrayList<FamilyRelation> assets = new ArrayList<FamilyRelation>();
//        ResultSet rs;
//        try {
//            rs = stmt.executeQuery("select * from assets where userid="+userid);
//            while (rs.next()) {
//                assets.add(new FamilyRelation(
//                        rs.getInt("id"),
//                        rs.getInt("userid"),
//                        rs.getString("description"),
//                        rs.getInt("value")
//                ));
//            }
//            rs.close();
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//        return assets;
//    }

//    public boolean updateAsset(FamilyRelation asset) {
//        int r = 0;
//        try {
//            r = stmt.executeUpdate("update assets set description='"+asset.getDescription()+"', value="+asset.getValue()+
//                    " where id="+asset.getId());
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//        if (r>0) return true;
//        else return false;
//    }

}