package bsuir.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Rating {
    private long idRating;
    private long rating;
    private long expert;
    private int alternative;
    private Timestamp timeOfCreation;

    @Id
    @Column(name = "id_rating", nullable = false)
    public long getIdRating() {
        return idRating;
    }

    public void setIdRating(long idRating) {
        this.idRating = idRating;
    }

    @Basic
    @Column(name = "rating", nullable = false)
    public long getRating() {
        return rating;
    }

    public void setRating(long rating) {
        this.rating = rating;
    }

    @Basic
    @Column(name = "expert", nullable = false)
    public long getExpert() {
        return expert;
    }

    public void setExpert(long expert) {
        this.expert = expert;
    }

    @Basic
    @Column(name = "alternative", nullable = false)
    public int getAlternative() {
        return alternative;
    }

    public void setAlternative(int alternative) {
        this.alternative = alternative;
    }

    @Basic
    @Column(name = "timeOfCreation", nullable = false)
    public Timestamp getTimeOfCreation() {
        return timeOfCreation;
    }

    public void setTimeOfCreation(Timestamp timeOfCreation) {
        this.timeOfCreation = timeOfCreation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rating rating1 = (Rating) o;
        return idRating == rating1.idRating &&
                rating == rating1.rating &&
                expert == rating1.expert &&
                alternative == rating1.alternative &&
                Objects.equals(timeOfCreation, rating1.timeOfCreation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRating, rating, expert, alternative, timeOfCreation);
    }
}
