import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../model/city";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {
  }

  getAllByCountry(idCountry: number): Observable<City[]> {
    return this.http.get<City[]>(
      '/api/cities/get-by-country',
      {
        params: new HttpParams()
          .set('country', idCountry.toString())
      })
  }

  save(city: City): Observable<City> {
    return this.http.post<City>('/api/cities', city);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/cities',
      {
        params: new HttpParams()
          .set('id', id.toString())
      })
  }
}
