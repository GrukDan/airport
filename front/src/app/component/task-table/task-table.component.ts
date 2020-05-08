import { Component, OnInit } from '@angular/core';
import {Task} from "../../model/task";
import {Subscription} from "rxjs";
import {TaskService} from "../../service/task.service";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  parameters: string[];
  tasks: Task[];
  subscriptions: Subscription[] = [];

  countOfPages: number;
  parameter: string;
  direction: boolean;
  size: number;
  page: number;

  constructor( private taskService: TaskService,) {
    this.tasks = [];
    this.page = 0;
    this.size = 5;
    this.direction = true;
    this.countOfPages = 11;
  }

  ngOnInit() {
    this.loadSortParameters();
  }

  pageChanged($event: PageChangedEvent) {
    this.page = $event.page - 1;
    this.loadTasks();
  }

  sort(parameter: string) {
    this.parameter = parameter;
    this.direction = !this.direction;
    this.loadTasks();
  }

  loadSortParameters() {
    this.subscriptions.push(this.taskService.getSortParameter().subscribe(parameters => {
      this.parameters = parameters as string[];
      this.parameter = this.parameters[0];
      this.loadTasks()
    }))
  }

  loadTasks() {
    this.subscriptions.push(this.taskService.getSortedTasks(
      this.parameter,
      this.page,
      this.size,
      this.direction
    ).subscribe(sortedTasks => {
      this.tasks = sortedTasks.tasks as Task[];
      this.countOfPages = sortedTasks.countPages * 10;
    }))
  }

  btoa(str: string): string {
    return btoa(str);
  }

  ngOnDestroy(): void {
  }

}
