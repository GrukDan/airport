package bsuir.service.impl;

import bsuir.model.Task;
import bsuir.model.paginationModel.TaskPaginationModel;
import bsuir.repository.TaskRepository;
import bsuir.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
        taskRepository.save(task);
        return taskRepository.findByTaskNameAndDateOfCreation(task.getTaskName(),task.getDateOfCreation());
    }

    @Override
    public void delete(long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task getById(long id) {
        return taskRepository.findById(id).get();
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
        Page<Task> taskPage;
        if (direction)
            taskPage = taskRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, parameter)));
        else
            taskPage = taskRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, parameter)));

        List<Task> tasks = taskPage.getContent();
        Task[] tasks1 = new Task[tasks.size()];
        tasks.toArray(tasks1);
        return new TaskPaginationModel(taskPage.getTotalPages(), page, tasks1);
    }
}
