import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { ICard } from '../model/card-interface';
import { IPage } from '../model/generic-types-interface';
import { ICard2Form, ICard2Send } from 'src/app/model/card-interface';


@Injectable({
  providedIn: 'root'
})

export class CardService {
  private entityURL = '/card';
  url: string = ""

 constructor(private oHttp: HttpClient) {
     this.url = `${API_URL}${this.entityURL}`;
 }

 getCardsPlist(page: number, size: number, termino: string, strSortField: string, strOrderDirection: string): Observable<IPage<ICard>> {
  let params = new HttpParams()
    .set("filter", termino)
    .set("page", page)
    .set("size", size);
  if (strSortField != "") { //&sort=codigo,[asc|desc]
    if (strOrderDirection != "") {
      params = params.set("sort", strSortField + "," + strOrderDirection);
    } else {
      params = params.set("sort", strSortField);
    }
  }
  return this.oHttp.get<IPage<ICard>>(this.url, {withCredentials:true, params: params });
}

getOne(id: number): Observable<ICard> {
  return this.oHttp.get<ICard>(this.url + "/" + id, {withCredentials:true});
}

removeOne(id: number): Observable<number> {
  return this.oHttp.delete<number>(this.url + '/' + id,  {withCredentials:true});
}

updateOne(oCard2Send: ICard2Send): Observable<number> {
  return this.oHttp.put<number>(this.url, oCard2Send,  {withCredentials:true});
}

newOne(oCard2Send: ICard2Send): Observable<number> {    
  return this.oHttp.post<number>(this.url, oCard2Send, {withCredentials:true});
}

}