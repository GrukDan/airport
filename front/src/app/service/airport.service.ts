import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AirportViewModel} from "../model/view-models/airport-view-model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Airport} from "../model/airport";
import {Alternative} from "../model/alternative";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) {
  }

  getAirportViewModels(): Observable<AirportViewModel[]> {
    return this.http.get<AirportViewModel[]>('/api/airports/get-all');
  }

  save(airport: Airport): Observable<Airport> {
    return this.http.post<Airport>('/api/airports', airport);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>('/api/airports',
      {
        params: new HttpParams()
          .set('id', id.toString())
      })
  }

  getAirportViewModelsByIdIn(airportsId: number[]):Observable<AirportViewModel[]> {
    return this.http.post<AirportViewModel[]>('/api/airports/view-models-by-id',airportsId);
  }
}
