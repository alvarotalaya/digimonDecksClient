import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlayer } from '../model/player-interface';
import { IPage } from '../model/generic-types-interface';
import { IPlayer2Form, IPlayer2Send } from 'src/app/model/player-interface';

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

    removeOne(id: number): Observable<number> {
      return this.oHttp.delete<number>(this.url + '/' + id);
    }

    updateOne(oPlayer2Form: IPlayer2Form): Observable<number> {
      let oPlayer2Send: IPlayer2Send = {
        id: oPlayer2Form.id.value,
        name: oPlayer2Form.name.value,
        email: oPlayer2Form.email.value,
        usertype: oPlayer2Form.usertype.value
      }
      return this.oHttp.put<number>(this.url, oPlayer2Send);
    }

    newOne(oPlayer2Form: IPlayer2Form): Observable<number> {
      let oPlayer2Send: IPlayer2Send = {
        id: oPlayer2Form.id.value,
        name: oPlayer2Form.name.value,
        email: oPlayer2Form.email.value,
        usertype: oPlayer2Form.usertype.value
      }
      return this.oHttp.put<number>(this.url, oPlayer2Send);
    }

}