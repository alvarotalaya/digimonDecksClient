import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { CryptoService } from './crypto.service';
import { DecodeService } from './decode.service';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { IToken } from '../model/token-interface'


export enum Events {
  login,
  logout
}

export class EmitEvent {
  constructor(public event: Events, public token?: string) { }
}

@Injectable({
    providedIn: 'root'
})

export class SessionService {

  private entityURL = '/session';
  sURL: string = `${API_URL}${this.entityURL}`;
  subject = new Subject<EmitEvent>();

  constructor(
      private oCryptoService: CryptoService,
      private oHttpClient: HttpClient,
      private oDecodeService: DecodeService
  ) { }

  login(strEmail: string, strPassword: string): Observable<string> {
      const loginData = JSON.stringify({ email: strEmail, password: this.oCryptoService.getSHA256(strPassword) });
      return this.oHttpClient.post<string>(this.sURL, loginData, httpOptions);
  }

  getEmail(): string {
      if (!this.isSessionActive()) {
          return "";
      } else {
          let token: string = localStorage.getItem("token");
          return this.oDecodeService.parseJwt(token).email;
      }
  }

  getToken(): string {
      return localStorage.getItem("token");
  }

  isSessionActive(): Boolean {
      let strToken: string = localStorage.getItem("token");
      if (strToken) {            
          let oDecodedToken: IToken = this.oDecodeService.parseJwt(strToken);
          if (Date.now() >= oDecodedToken.exp * 1000) {
              return false;
          } else {
              return true;
          }
      } else {
          return false;
      }
  }

  logout() {
      localStorage.removeItem("token");
  }

  on(event: Events): Observable<String> {
      return this.subject.pipe(
          filter((e: EmitEvent) => {
              return e.event === event;
          }),
          map((e: EmitEvent) => {
              return e.token;
          })
      )
  }

  emit(event: EmitEvent) {
      this.subject.next(event);
  }

}

