import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { studioapi } from './appsettings';


@Injectable()
export class CommonService {

    constructor(private http: HttpClient) { }
    API: string = studioapi.URL;

    UserTypeListData(param) {
        return this.http.post<any>(this.API + "common/UserTypeListData", param);
    }

    YesNoListData(param) {
        return this.http.post<any>(this.API + "common/YesNoListData", param);
    }

    AccountCategoryListData(param) {
        return this.http.post<any>(this.API + "common/AccountCategoryListData", param);
    }

    CreditAccountList(param) {
        return this.http.post<any>(this.API + "account/GetAccounts", param);
    }

    PaymentReceiptModeListData(param) {
        return this.http.post<any>(this.API + "common/PaymentReceiptModeListData", param);
    }

    ChequeStatusListData(param) {
        return this.http.post<any>(this.API + "common/ChequeStatusListData", param);
    }
    

}