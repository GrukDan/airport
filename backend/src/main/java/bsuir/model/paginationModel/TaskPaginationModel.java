package bsuir.model.paginationModel;

import bsuir.model.Task;

import java.util.Arrays;

public class TaskPaginationModel {
    private int countPages;
    private int numberPage;
    private Task tasks[];

    public TaskPaginationModel(){}

    public TaskPaginationModel(int countPages, int numberPage, Task[] tasks) {
        this.countPages = countPages;
        this.numberPage = numberPage;
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "TaskPaginationModel{" +
                "countPages=" + countPages +
                ", numberPage=" + numberPage +
                ", tasks=" + Arrays.toString(tasks) +
                '}';
    }

    public int getCountPages() {
        return countPages;
    }

    public void setCountPages(int countPages) {
        this.countPages = countPages;
    }

    public int getNumberPage() {
        return numberPage;
    }

    public void setNumberPage(int numberPage) {
        this.numberPage = numberPage;
    }

    public Task[] getTasks() {
        return tasks;
    }

    public void setTasks(Task[] tasks) {
        this.tasks = tasks;
    }
}
