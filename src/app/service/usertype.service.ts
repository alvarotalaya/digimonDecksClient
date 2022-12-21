import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { IUsertype } from '../model/usertype-interface';
import { IPage } from '../model/generic-types-interface';

@Injectable({
  providedIn: 'root'
})
export class UsertypeService {

  constructor( private oHttp : HttpClient ) { }

  private entityURL: string = "/usertype";


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
}
