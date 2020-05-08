package bsuir.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Country {
    private long idCountry;
    private String country;

    @Id
    @Column(name = "id_country", nullable = false)
    public long getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(long idCountry) {
        this.idCountry = idCountry;
    }

    @Basic
    @Column(name = "country", nullable = false, length = 45)
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Country country1 = (Country) o;
        return idCountry == country1.idCountry &&
                Objects.equals(country, country1.country);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCountry, country);
    }
}
