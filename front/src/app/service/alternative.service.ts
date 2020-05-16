import { Injectable } from '@angular/core';
import {Alternative} from "../model/alternative";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlternativeService {

  constructor(private http : HttpClient) { }

  saveAlternatives(alternatives: Alternative[]):Observable<boolean> {
    return this.http.put<boolean>('/api/alternatives',alternatives);
  }

  getAlternativesByTask(idTask: number):Observable<Alternative[]> {
    return this.http.get<Alternative[]>('/api/alternatives/by-task',{
      params:new HttpParams()
        .set('idTask',idTask.toString())
    })
  }
}
