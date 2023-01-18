import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { ICarddeck } from '../model/carddeck-interface';
import { IPage } from '../model/generic-types-interface';
import { ICarddeck2Send } from 'src/app/model/carddeck-interface';

@Injectable({
  providedIn: 'root'
})
export class CarddeckService {
  private entityURL = '/carddeck';
  url: string = ""

 constructor(private oHttp: HttpClient) {
     this.url = `${API_URL}${this.entityURL}`;
 }

 getCarddecksPlist(page: number, size: number, termino: string, id_deck: number, id_card: number, strSortField: string, strOrderDirection: string): Observable<IPage<ICarddeck>> {
   let params = new HttpParams()
     .set("filter", termino)
     .set("page", page)
     .set("size", size);
   if (id_deck != 0) {
     params = params.set("deck", id_deck);
   }
   if (id_card != 0) {
    params = params.set("card", id_card);
  }
   if (strSortField != "") { //&sort=codigo,[asc|desc]
     if (strOrderDirection != "") {
       params = params.set("sort", strSortField + "," + strOrderDirection);
     } else {
       params = params.set("sort", strSortField);
     }
   }
   return this.oHttp.get<IPage<ICarddeck>>(this.url, {withCredentials:true, params: params });
 }
 
 getOne(id: number): Observable<ICarddeck> {
   return this.oHttp.get<ICarddeck>(this.url + "/" + id, {withCredentials:true});
 }

 removeOne(id: number): Observable<number> {
   return this.oHttp.delete<number>(this.url + '/' + id,  {withCredentials:true});
 }

 updateOne(oCarddeck2Send: ICarddeck2Send): Observable<number> {
   return this.oHttp.put<number>(this.url, oCarddeck2Send,  {withCredentials:true});
 }

 newOne(oCarddeck2Send: ICarddeck2Send): Observable<number> {    
   return this.oHttp.post<number>(this.url, oCarddeck2Send, {withCredentials:true});
 }
 
 generate(): Observable<ICarddeck> {
   return this.oHttp.post<ICarddeck>(this.url + "/generate", null, { withCredentials: true });
 }
}
