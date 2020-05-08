package bsuir.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Airport {
    private long idAirport;
    private String airport;
    private long city;

    @Id
    @Column(name = "id_airport", nullable = false)
    public long getIdAirport() {
        return idAirport;
    }

    public void setIdAirport(long idAirport) {
        this.idAirport = idAirport;
    }

    @Basic
    @Column(name = "airport", nullable = false, length = 45)
    public String getAirport() {
        return airport;
    }

    public void setAirport(String airport) {
        this.airport = airport;
    }

    @Basic
    @Column(name = "city", nullable = false)
    public long getCity() {
        return city;
    }

    public void setCity(long city) {
        this.city = city;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Airport airport1 = (Airport) o;
        return idAirport == airport1.idAirport &&
                city == airport1.city &&
                Objects.equals(airport, airport1.airport);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idAirport, airport, city);
    }
}
