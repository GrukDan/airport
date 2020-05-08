import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserViewModel} from "../model/view-models/user-view-model";
import {UserPaginationModel} from "../model/pagination-model/user-pagination-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserForTasks(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  save(user: User): Observable<User> {
    return this.http.put<User>('/api/users', user);
  }

  delete(iduser: number): Observable<any> {
    return this.http.delete('/api/users',
      {
        params: new HttpParams()
          .set('id', iduser.toString())
      })
  }

  saveUserViewModel(userViewModel: UserViewModel): Observable<UserViewModel> {
    return this.http.post<UserViewModel>('/api/users', userViewModel);
  }

  getUserViewModel(idUser: number): Observable<UserViewModel> {
    return this.http.get<UserViewModel>(
      '/api/users/',
      {
        params: new HttpParams()
          .set('id', idUser.toString())
      }
    )
  }

  getSortParameter(): Observable<string[]> {
    return this.http.get<string[]>('/api/users/sort-parameter');
  }

  getSortedUser(parameter: string, page: number, size: number, direction: boolean, search: string = ''): Observable<UserPaginationModel> {
    return this.http.get<UserPaginationModel>(
      '/api/users/sort',
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
