

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { studioapi } from '../appsettings';

@Injectable()
export class DayBookService {

    constructor(private http: HttpClient) { }
    API: string = studioapi.URL;

    GetDayBooks(param) {
        return this.http.post<any>(this.API + "daybook/GetDayBooks", param);
    }
    AddUpdateDayBook(param) {
        return this.http.post<any>(this.API + "daybook/AddUpdateDayBook", param);
    }

    
    
}