

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { studioapi } from '../appsettings';

@Injectable()
export class AccountService {

    constructor(private http: HttpClient) { }
    API: string = studioapi.URL;

    GetAccounts(param) {
        return this.http.post<any>(this.API + "account/GetAccounts", param);
    }
    AddUpdateAccount(param) {
        return this.http.post<any>(this.API + "account/AddUpdateAccount", param);
    }
    
}