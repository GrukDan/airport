import {Injectable} from '@angular/core';
import {Task} from "../model/task";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TaskPaginationModel} from "../model/pagination-model/task-pagination-model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  save(task: Task): Observable<Task> {
    return this.http.put<Task>('/api/tasks', task)
  }

  update(task: Task): Observable<Task> {
    return this.http.post<Task>('/api/tasks', task)
  }

  delete(idTask: number): Observable<void> {
    return this.http.delete<void>(
      '/api/tasks',
      {
        params: new HttpParams()
          .set('id', idTask.toString())
      })
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks/get-all');
  }

  getSortParameter(): Observable<string[]> {
    return this.http.get<string[]>('/api/tasks/sort-parameter');
  }

  
  getSortedTasks(parameter: string, page: number, size: number, direction: boolean, search: string = ''): Observable<TaskPaginationModel> {
    return this.http.get<TaskPaginationModel>(
      '/api/tasks/sort',
      {
        params: new HttpParams()
          .set('parameter', parameter)
          .set('page', page.toString())
          .set('size', size.toString())
          .set('direction', direction.toString())
          .set('search', search)
      })
  }
}
