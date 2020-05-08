package bsuir.service.impl;

import bsuir.model.Task;
import bsuir.model.paginationModel.TaskPaginationModel;
import bsuir.repository.TaskRepository;
import bsuir.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    private String[] parameterForSorting = {"taskName", "dateOfCreation"};

    @Override
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void delete(long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task getById(long id) {
        return taskRepository.getOne(id);
    }

    @Override
    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<String> getSortParameter() {
        return Arrays.asList(parameterForSorting);
    }

    @Override
    public TaskPaginationModel getSortedTask(String parameter, int page, int size, boolean direction) {
        return null;
    }
}
