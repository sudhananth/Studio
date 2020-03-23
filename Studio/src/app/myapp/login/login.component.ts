import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  frmSignUp: FormGroup;
  statusId: number = 1;
  constructor(private router: Router, private loginService: LoginService, private loader: LoaderService, private _frm: FormBuilder) {

  }

  ngOnInit(): void {
    this.frmSignUp = this._frm.group({
      'UserName': ['1', Validators.required],
      'Email': ['', Validators.required],
      'NewPassword': ['', Validators.required]
    });

  }
  get f() { return this.frmSignUp.value; }

  SignIn() {

    let param = {
      "IntReq1": 0,
      "IntReq2": 0,
      "IntReq3": 0,
      "IntReq4": 0,
      "StrReq1": this.f.Email,
      "StrReq2": this.f.NewPassword,
      "StrReq3": "",
      "StrReq4": "",
      "DtReq1": new Date().toDateString(),
      "DtReq2": new Date().toDateString()
    }    
    this.loader.loader.emit(true);
    this.loginService.loginUser(param).subscribe(
      s => {        
        if (s.StatusCode == 0) {
          let param = {
            "IntReq1": s.RefValue1,
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

          this.loginService.getLoginUserInfo(param).subscribe(
            u => {              
              this.loader.loader.emit(false);
              if (u && u.length > 0) {
                let user = u[0];
                localStorage.setItem("UserId", user.UserId);
                localStorage.setItem("UserName", user.UserName);
                localStorage.setItem("UserTypeId", user.UserType);
                localStorage.setItem("UserEmail", user.UserEmail);
                this.loader.msg.emit({ severity: 'success', summary: 'Login !', detail: s.StatusText });
                this.router.navigate(['/home']);
              }

            },
            e => {
              this.loader.loader.emit(false);
            }
          );
        }
        else {
          this.loader.msg.emit({ severity: 'error', summary: 'Sign-in failed !', detail: s.StatusText });
          this.loader.loader.emit(false);
        }

      },
      e => { this.loader.loader.emit(false); }
    );
  }
  gotoForgorPassword() {
    this.statusId = 2;
  }
}
