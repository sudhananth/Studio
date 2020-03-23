import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { studioapi } from '../appsettings';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }
    API: string = studioapi.URL;

    loginUser(param) {
        return this.http.post<any>(this.API + "user/ValidateLogin", param);
    }

    getLoginUserInfo(param) {
        return this.http.post<any>(this.API + "user/GetUsers", param);
    }

    changePassword(param) {
        return this.http.post<any>(this.API + "User/ChangePassword", param);
    }

    AddUpdateUser(param) {
        return this.http.post<any>(this.API + "user/AddUpdateUser", param);
    }


}