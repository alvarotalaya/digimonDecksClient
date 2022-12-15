import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlayer } from '../model/player-interface';
import { IPage } from '../model/generic-types-interface';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
    private entityURL = '/player';
     url: string = ""

    constructor(private oHttp: HttpClient) {
        this.url = `${environment.baseURL}${this.entityURL}`;
    }

    getPlayersPlist(page: number, size: number, termino: string, id_usertype: number, strSortField: string, strOrderDirection: string): Observable<IPage<IPlayer>> {
      let params = new HttpParams()
        .set("filter", termino)
        .set("page", page)
        .set("size", size);
      if (id_usertype != 0) {
        params = params.set("usertype", id_usertype);
      }
      if (strSortField != "") { //&sort=codigo,[asc|desc]
        if (strOrderDirection != "") {
          params = params.set("sort", strSortField + "," + strOrderDirection);
        } else {
          params = params.set("sort", strSortField);
        }
      }
      return this.oHttp.get<IPage<IPlayer>>(this.url, { params: params });
    }
    
      getOne(id: number): Observable<IPlayer> {
        return this.oHttp.get<IPlayer>(this.url + "/" + id);
      }
}