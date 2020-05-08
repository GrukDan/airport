package bsuir.service;

import bsuir.model.Task;
import bsuir.model.paginationModel.TaskPaginationModel;

import java.util.List;

public interface TaskService {
    Task save(Task task);

    void delete(long id);

    Task getById(long id);

    List<Task> getAll();


    List<String> getSortParameter();

    TaskPaginationModel getSortedTask(String parameter, int page, int size, boolean direction);
}
