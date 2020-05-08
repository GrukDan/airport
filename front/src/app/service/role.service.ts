import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Role} from "../model/role";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>('/api/roles');
  }
}
