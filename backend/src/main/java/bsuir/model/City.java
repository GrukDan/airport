package bsuir.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class City {
    private long idCity;
    private String city;
    private long country;

    @Id
    @Column(name = "id_city", nullable = false)
    public long getIdCity() {
        return idCity;
    }

    public void setIdCity(long idCity) {
        this.idCity = idCity;
    }

    @Basic
    @Column(name = "city", nullable = false, length = 45)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Basic
    @Column(name = "country", nullable = false)
    public long getCountry() {
        return country;
    }

    public void setCountry(long country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        City city1 = (City) o;
        return idCity == city1.idCity &&
                country == city1.country &&
                Objects.equals(city, city1.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCity, city, country);
    }

}
