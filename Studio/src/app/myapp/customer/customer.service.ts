

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { studioapi } from '../appsettings';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }
    API: string = studioapi.URL;

    GetCustomers(param) {
        return this.http.post<any>(this.API + "customer/GetCustomers", param);
    }
    AddUpdateCustomer(param) {
        return this.http.post<any>(this.API + "customer/AddUpdateCustomer", param);
    }
    
}