import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { LoaderService } from '../loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { UserInfo } from '../common.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [LoginService]
})
export class UsersComponent implements OnInit {

  constructor(private _loginService: LoginService, private loader: LoaderService, private _frmuser: FormBuilder,
    private _commonService: CommonService) { }
  userId: number = 0;
  userEntity: any;
  users: any[] = [];
  cols: any[];
  frmUser: FormGroup;
  userTypes: any[] = [];
  activeFlags: any[] = [];
  uI: UserInfo;
  ngOnInit(): void {
    this.uI = this.loader.gUserInfo();
    this.cols = [
      { field: 'LoginId', header: 'LoginId' },
      { field: 'UserName', header: 'User Name' },
      { field: 'UserType', header: 'User Type' },
      { field: 'UserEmail', header: 'User Email' }
    ];
    this.frmInilizer();
    this.getUsers();
    this.getDropdownData();
  }

  frmInilizer() {
    this.frmUser = this._frmuser.group({
      UserId: [this.userId, Validators.required],
      UserType: ['Admin', Validators.required],
      UserName: ['', Validators.required],
      UserEmail: [],
      LoginId: ['', Validators.required],
      ActiveFlag: ['Yes'],
      Password: ['', Validators.required],
      NewPassword: ['']
    });
  }

  getUsers() {
    let param = {
      "IntReq1": 0,
      "IntReq2": 0,
      "IntReq3": 0,
      "IntReq4": 0,
      "StrReq1": "0",
      "StrReq2": "0",
      "StrReq3": "0",
      "StrReq4": "0",
      "DtReq1": new Date().toDateString(),
      "DtReq2": new Date().toDateString()
    }
    this.loader.loader.emit(true);
    this._loginService.getLoginUserInfo(param).subscribe(
      s => {
        this.loader.loader.emit(false);
        this.users = s;
      },
      e => { this.loader.loader.emit(false); }
    );
  }

  getDropdownData() {
    this._commonService.UserTypeListData({}).subscribe(
      s => {
        this.userTypes = s;
      },
      e => { }
    );
    this._commonService.YesNoListData({}).subscribe(
      s => {
        this.activeFlags = s;
      },
      e => { }
    );
  }
  addUser() {
    this.userId = 0;
    this.frmInilizer();
  }
  Edit(data) {
    this.userId = +data.UserId;
    let param = {
      "IntReq1": this.userId,
      "IntReq2": 0,
      "IntReq3": 0,
      "IntReq4": 0,
      "StrReq1": "",
      "StrReq2": "",
      "StrReq3": "",
      "StrReq4": "",
      "DtReq1": new Date().toDateString(),
      "DtReq2": new Date().toDateString()
    }
    this.loader.loader.emit(true);
    this._loginService.getLoginUserInfo(param).subscribe(
      u => {
        this.loader.loader.emit(false);
        if (u && u.length > 0) {
          let data = u[0];
          this.frmUser.patchValue({
            UserId: data.UserId,
            UserType: data.UserType,
            UserName: data.UserName,
            UserEmail: data.UserEmail,
            LoginId: data.LoginId,
            ActiveFlag: data.ActiveFlag,
            Password: data.Password,
            NewPassword: data.NewPassword
          });
        }
      },
      e => { this.loader.loader.emit(false); });
  }
  submitUser() {
    debugger;
    let data = this.frmUser.value;
    let param = {
      "UserId": data.UserId,
      "UserType": data.UserType,
      "UserName": data.UserName,
      "UserEmail": data.UserEmail,
      "LoginId": data.LoginId,
      "Password": data.Password,
      "NewPassword": data.NewPassword,
      "ActiveFlag": data.ActiveFlag,
      "UserLog": {
        "CreatedById": this.uI.UserId,
        "CreatedByName": this.uI.UserName,
        "CreatedDate": new Date().toDateString(),
        "UpdatedById": this.uI.UserId,
        "UpdatedByName": this.uI.UserName,
        "UpdatedDate": new Date().toDateString()
      }
    }
    this.loader.loader.emit(true);
    this._loginService.AddUpdateUser(param).subscribe(
      s => {        
        this.loader.loader.emit(false);
        if (s.StatusCode == 0) {
          this.loader.msg.emit({ severity: 'success', summary: 'User', detail: s.StatusText });
          this.addUser();
          this.getUsers();
        }
        else {
          this.loader.msg.emit({ severity: 'error', summary: 'User', detail: s.StatusText });
        }
      },
      e => {
        this.loader.loader.emit(false);
      }
    );
  }
}
