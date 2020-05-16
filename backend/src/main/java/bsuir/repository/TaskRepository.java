package bsuir.repository;

import bsuir.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    Task findByTaskNameAndDateOfCreation(String taskName, Date dateOfCreation);
}
