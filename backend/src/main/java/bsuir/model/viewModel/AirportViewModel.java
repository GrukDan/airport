package bsuir.model.viewModel;

import bsuir.model.Airport;

public class AirportViewModel {

    private long idAirport;
    private long idCity;
    private long idCountry;
    private String airport;
    private String city;
    private String country;

    public AirportViewModel(long idAirport, long idCity, long idCountry, String airport, String city, String country) {
        this.idAirport = idAirport;
        this.idCity = idCity;
        this.idCountry = idCountry;
        this.airport = airport;
        this.city = city;
        this.country = country;
    }

    public AirportViewModel(Airport airport){
        this.idAirport = airport.getIdAirport();
        this.idCity = airport.getCity();
        this.airport = airport.getAirport();
    }

    public AirportViewModel(){}

    @Override
    public String toString() {
        return "AirportViewModel{" +
                "idAirport=" + idAirport +
                ", idCity=" + idCity +
                ", idCountry=" + idCountry +
                ", airport='" + airport + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                '}';
    }

    public long getIdAirport() {
        return idAirport;
    }

    public void setIdAirport(long idAirport) {
        this.idAirport = idAirport;
    }

    public long getIdCity() {
        return idCity;
    }

    public void setIdCity(long idCity) {
        this.idCity = idCity;
    }

    public long getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(long idCountry) {
        this.idCountry = idCountry;
    }

    public String getAirport() {
        return airport;
    }

    public void setAirport(String airport) {
        this.airport = airport;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
