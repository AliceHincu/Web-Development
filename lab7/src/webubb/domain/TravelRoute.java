package webubb.domain;

import java.util.ArrayList;

public class TravelRoute {
    private int currentCityId;
    private String currentCityName;
    private ArrayList<City> journeyPath;

    public TravelRoute() {
    }

    public int getCurrentCityId() {
        return currentCityId;
    }

    public void setCurrentCityId(int currentCityId) {
        this.currentCityId = currentCityId;
    }

    public String getCurrentCityName() {
        return currentCityName;
    }

    public void setCurrentCityName(String currentCityName) {
        this.currentCityName = currentCityName;
    }

    public void addCity(City city){
        this.journeyPath.add(city);
    }

    public ArrayList<City> getFinalJourney(){
        return this.journeyPath;
    }
}
