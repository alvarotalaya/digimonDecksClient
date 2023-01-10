import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { IUsertype, IUsertype2Send } from '../model/usertype-interface';
import { IPage } from '../model/generic-types-interface';

@Injectable({
  providedIn: 'root'
})
export class UsertypeService {

  private entityURL = '/usertype';
  url: string = ""

 constructor(private oHttp: HttpClient) {
     this.url = `${API_URL}${this.entityURL}`;
 }


  getUsertypePlist(page: number, size: number): Observable<IPage<IUsertype>>{
    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    const url : string = `${API_URL}${this.entityURL}`;
    return this.oHttp.get<IPage<IUsertype>>(url,{withCredentials:true, params: params});
  }

  getOne(id: number): Observable<IUsertype> {
      return this.oHttp.get<IUsertype>(`${API_URL}${this.entityURL}` + "/" + id, {withCredentials:true});
    }
  
  removeOne(id: number): Observable<number> {
    return this.oHttp.delete<number>(this.url + '/' + id,  {withCredentials:true});
  }

  updateOne(oUsertype2Send: IUsertype2Send): Observable<number> {
    return this.oHttp.put<number>(this.url, oUsertype2Send,  {withCredentials:true});
  }

  newOne(oUsertype2Send: IUsertype2Send): Observable<number> {    
    return this.oHttp.post<number>(this.url, oUsertype2Send, {withCredentials:true});
  }
}
