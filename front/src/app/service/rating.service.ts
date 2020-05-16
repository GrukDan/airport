import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rating} from "../model/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {
  }

  save(ratings: Rating[]): Observable<any> {
    return this.http.put('/api/ratings', ratings);
  }

  loadRatingsByUserAndAlternatives(idUser: number, alternativesId: number[]): Observable<Rating[]> {
    return this.http.post<Rating[]>('/api/ratings/by-user-alternatives',
      alternativesId,
      {
        params: new HttpParams()
          .set('idUser', idUser.toString())
      });
  }

  getRatingsByExpertsAndAlternatives(expertsId: number[], alternativesId: number[]): Observable<Rating[]> {
    return this.http.post<Rating[]>('/api/ratings/by-experts-and-alternatives',
      expertsId,
      {
        params: new HttpParams()
          .set('alternatives', alternativesId.toString())
      });
  }

  getRatingsByAlternatives(alternativesId: number[]): Observable<Rating[]> {
    return this.http.post<Rating[]>('/api/ratings/by-alternatives', alternativesId);
  }

  getSolution(expertsId: number[], alternativesId: number[]): Observable<Map<number, number>> {
    return this.http.post<Map<number, number>>('/api/ratings/solution',
      alternativesId,
      {
        params: new HttpParams()
          .set('experts', expertsId.toString())
      })
  }
}
