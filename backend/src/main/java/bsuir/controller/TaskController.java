package bsuir.controller;


import bsuir.model.Task;
import bsuir.model.paginationModel.TaskPaginationModel;
import bsuir.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @RequestMapping(method = RequestMethod.PUT)
    public Task save(@RequestBody Task task){
        return taskService.save(task);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Task update(@RequestBody Task task){
        return taskService.save(task);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam("id") long id){
        taskService.delete(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Task getById(@RequestParam("id") long id){
        return taskService.getById(id);
    }

    @RequestMapping(value = "/get-all",method = RequestMethod.GET)
    public List<Task> getAllTasks(){
        return taskService.getAll();
    }

    @RequestMapping(value = "/sort-parameter", method = RequestMethod.GET)
    public List<String> getSortParameter() {
        return taskService.getSortParameter();
    }

    @RequestMapping(value = "/sort", method = RequestMethod.GET)
    public TaskPaginationModel getSortedTask(
            @RequestParam("parameter") String parameter,
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam("direction") boolean direction,
            @RequestParam("search") String search) {
        return taskService.getSortedTask(parameter, page, size, direction);
    }
}
