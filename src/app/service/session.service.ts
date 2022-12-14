import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoService } from './crypto.service';

@Injectable({
    providedIn: 'root'
})

export class SessionService {


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8'
        }),
        withCredentials: true
    };

    sURL = 'http://localhost:8082' + '/session';

    constructor(
        private oCryptoService: CryptoService,
        private oHttpClient: HttpClient
    ) { }

    login(strLogin: string, strPassword: string): Observable<any> {
        const loginData = JSON.stringify({ username: strLogin, password: this.oCryptoService.getSHA256(strPassword) });
        return this.oHttpClient.post<String>(this.sURL, loginData, this.httpOptions);
    }

    check(): Observable<any> {
        return this.oHttpClient.get<String>(this.sURL, this.httpOptions);
    }

}
