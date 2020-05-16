import { Injectable } from '@angular/core';
import {Country} from "../model/country";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http :HttpClient) { }

  save(newCountry: Country):Observable<Country> {
    return this.http.post<Country>('/api/countries',newCountry);
  }

  getAll():Observable<Country[]>{
    return this.http.get<Country[]>('/api/countries/get-all')
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(
      '/api/countries',
      {params:new HttpParams()
          .set('id',id.toString())}
    )
  }
}
