import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AirportViewModel} from "../model/view-models/airport-view-model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) {
  }

  getAirportViewModels(): Observable<AirportViewModel[]> {
    return this.http.get<AirportViewModel[]>('/api/airports');
  }
}
