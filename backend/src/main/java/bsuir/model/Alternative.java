package bsuir.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Alternative {
    private long idAlternative;
    private long task;
    private long airport;

    @Id
    @Column(name = "id_alternative", nullable = false)
    public long getIdAlternative() {
        return idAlternative;
    }

    public void setIdAlternative(long idAlternative) {
        this.idAlternative = idAlternative;
    }

    @Basic
    @Column(name = "task", nullable = false)
    public long getTask() {
        return task;
    }

    public void setTask(long task) {
        this.task = task;
    }

    @Basic
    @Column(name = "airport", nullable = false)
    public long getAirport() {
        return airport;
    }

    public void setAirport(long airport) {
        this.airport = airport;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Alternative that = (Alternative) o;
        return idAlternative == that.idAlternative &&
                task == that.task &&
                airport == that.airport;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idAlternative, task, airport);
    }
}
