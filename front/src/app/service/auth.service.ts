import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<User> {
    return this.http.post<User>("/api/users/sign-in", user);
  }
}
