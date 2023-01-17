import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { IDeck } from '../model/deck-interface';
import { IPage } from '../model/generic-types-interface';
import { IDeck2Send } from 'src/app/model/deck-interface';


@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private entityURL = '/deck';
  url: string = ""

 constructor(private oHttp: HttpClient) {
     this.url = `${API_URL}${this.entityURL}`;
 }

 getDecksPlist(page: number, size: number, termino: string, id_player: number, strSortField: string, strOrderDirection: string): Observable<IPage<IDeck>> {
   let params = new HttpParams()
     .set("filter", termino)
     .set("page", page)
     .set("size", size);
   if (id_player != 0) {
     params = params.set("player", id_player);
   }
   if (strSortField != "") { //&sort=codigo,[asc|desc]
     if (strOrderDirection != "") {
       params = params.set("sort", strSortField + "," + strOrderDirection);
     } else {
       params = params.set("sort", strSortField);
     }
   }
   return this.oHttp.get<IPage<IDeck>>(this.url, {withCredentials:true, params: params });
 }
 
 getOne(id: number): Observable<IDeck> {
   return this.oHttp.get<IDeck>(this.url + "/" + id, {withCredentials:true});
 }

 removeOne(id: number): Observable<number> {
   return this.oHttp.delete<number>(this.url + '/' + id,  {withCredentials:true});
 }

 updateOne(oDeck2Send: IDeck2Send): Observable<number> {
   return this.oHttp.put<number>(this.url, oDeck2Send,  {withCredentials:true});
 }

 newOne(oDeck2Send: IDeck2Send): Observable<number> {    
   return this.oHttp.post<number>(this.url, oDeck2Send, {withCredentials:true});
 }
 
 generate(): Observable<IDeck> {
   return this.oHttp.post<IDeck>(this.url + "/generate", null, { withCredentials: true });
 }

}
