import { Injectable, EventEmitter } from '@angular/core';
import { UserInfo } from './common.model';
@Injectable()
export class LoaderService {
    loader = new EventEmitter();
    msg = new EventEmitter();
    getUserInfo: UserInfo;
    constructor() {
        this.getUserInfo = this.gUserInfo();
    }

    gUserInfo(): UserInfo {
        return {
            UserId: +localStorage.getItem("UserId"),
            UserName: localStorage.getItem("UserName"),
            UserTypeId: localStorage.getItem("UserTypeId"),
            UserEmail: localStorage.getItem("UserEmail"),
        }
    }
    getUserType(type: number): string {
        let val = {
            1: 'SuperAdmin',
            2: 'AdminUser',
            3: 'NormalUser'
        }
        return val[type]
    }

    getSectionType(type: number): string {
        let val = {
            1: 'Text',
            2: 'Image',
            3: 'Options',
            4: 'Buttons',
            5: 'Hint',
            6: 'Input'
        }
        return val[type]
    }

}