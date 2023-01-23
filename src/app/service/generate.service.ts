import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';
import { ICard } from '../model/card-interface';


@Injectable({
  providedIn: 'root',
})


export class GenerateService {
  constructor(private http: HttpClient) { }  

  generateDecks(n: number): Observable<number> {
    return this.http.post<number>(API_URL + '/deck/generate/' + n, { amount: n }, httpOptions);
  }

  generatePlayers(n: number): Observable<number> {
    return this.http.post<number>(API_URL + '/player/generate/' + n, { amount: n }, httpOptions);
  }

  generateUsertypes(): Observable<number> {
    return this.http.post<number>(API_URL + '/usertype/generate', "", httpOptions);
  }

  generateCarddecks(n: number): Observable<number> {
    return this.http.post<number>(API_URL + '/carddeck/generate/' + n, { amount: n }, httpOptions);
  }

  getAllCardsAPI(n: number): Observable<number> {
    return this.http.get<number>(API_URL + "/card/getcards", {withCredentials:true});
  }

}
