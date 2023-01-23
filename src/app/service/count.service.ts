import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})


export class CountService {
  constructor(private http: HttpClient) { }

  getCountCards(): Observable<number> {
    return this.http.get<number>(API_URL + '/card/count', httpOptions);
  }

  getCountDecks(): Observable<number> {
    return this.http.get<number>(API_URL + '/deck/count', httpOptions);
  }

  getCountPlayers(): Observable<number> {
    return this.http.get<number>(API_URL + '/player/count', httpOptions);
  }

  getCountUsertypes(): Observable<number> {
    return this.http.get<number>(API_URL + '/usertype/count', httpOptions);
  }

  getCountCarddecks(): Observable<number> {
    return this.http.get<number>(API_URL + '/carddeck/count', httpOptions);
  }

}
