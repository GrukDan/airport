package bsuir.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity
public class Task {
    private long idTask;
    private String taskName;
    private String description;
    private Date dateOfCreation;

    @Id
    @Column(name = "id_task", nullable = false)
    public long getIdTask() {
        return idTask;
    }

    public void setIdTask(long idTask) {
        this.idTask = idTask;
    }

    @Basic
    @Column(name = "task_name", nullable = false, length = 45)
    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "date_of_creation", nullable = false)
    public Date getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(Date dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return idTask == task.idTask &&
                Objects.equals(taskName, task.taskName) &&
                Objects.equals(description, task.description) &&
                Objects.equals(dateOfCreation, task.dateOfCreation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTask, taskName, description, dateOfCreation);
    }
}
