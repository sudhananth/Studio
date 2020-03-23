import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { UserInfo } from '../common.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  constructor(private _accountService: AccountService, private loader: LoaderService, private _frm: FormBuilder,
    private _commonService: CommonService) { }
  accountId: number = 0;
  accounts: any[] = [];
  cols: any[];
  frmAccount: FormGroup;
  accountCategories: any[] = [];
  uI: UserInfo;
  ngOnInit(): void {
    this.uI = this.loader.gUserInfo();
    this.cols = [
      { field: 'AccountName', header: 'Account Name' },
      { field: 'AccountCategory', header: 'Category' }
    ];
    this.frmInilizer();
    this.getAccounts();
    this.getDropdownData();
  }

  frmInilizer() {
    this.frmAccount = this._frm.group({
      AccountId: [this.accountId, Validators.required],
      AccountName: ['', Validators.required],
      AccountCategory: ['Income', Validators.required],
      CreditBalance: ['', Validators.required],
      DebitBalance: ['', Validators.required],
      AsOnDate: ['', Validators.required]
    });




  }

  getAccounts() {
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
    this._accountService.GetAccounts(param).subscribe(
      s => {
        debugger;
        this.loader.loader.emit(false);
        this.accounts = s;
      },
      e => { this.loader.loader.emit(false); }
    );
  }

  getDropdownData() {
    this._commonService.AccountCategoryListData({}).subscribe(
      s => {
        this.accountCategories = s;
      },
      e => { }
    );
  }
  addAccount() {
    this.accountId = 0;
    this.frmInilizer();
  }
  Edit(data) {
    this.accountId = +data.AccountId;
    let param = {
      "IntReq1": this.accountId,
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
    this._accountService.GetAccounts(param).subscribe(
      u => {
        debugger;
        this.loader.loader.emit(false);
        if (u && u.length > 0) {
          let data = u[0];
          this.frmAccount.patchValue({
            AccountId: data.AccountId,
            AccountName: data.AccountName,
            AccountCategory: data.AccountCategory,
            CreditBalance: data.CreditBalance,
            DebitBalance: data.DebitBalance,
            AsOnDate: data.AsOnDate ? new Date(data.AsOnDate) : null
          });
        }
      },
      e => { this.loader.loader.emit(false); });
  }
  submitAccount() {
    debugger;
    let data = this.frmAccount.value;
    let param = {
      "AccountId": data.AccountId,
      "AccountName": data.AccountName,
      "AccountCategory": data.AccountCategory,
      "CreditBalance": data.CreditBalance,
      "DebitBalance": data.DebitBalance,
      "AsOnDate": data.AsOnDate ? new Date(data.AsOnDate).toDateString() : null,
      "Ledger": [
      ],
      "UserLog": {
        "CreatedById": this.uI.UserId,
        "CreatedByName": this.uI.UserName,
        "CreatedDate": new Date().toDateString(),
        "UpdatedById": this.uI.UserId,
        "UpdatedByName": this.uI.UserName,
        "UpdatedDate": new Date().toDateString()
      },
      "FilterData": {
        "FromDate": null,
        "ToDate": null
      }
    }
    this.loader.loader.emit(true);
    this._accountService.AddUpdateAccount(param).subscribe(
      s => {
        debugger;
        this.loader.loader.emit(false);
        if (s.StatusCode == 0) {
          this.loader.msg.emit({ severity: 'success', summary: 'Account', detail: s.StatusText });
          this.addAccount();
          this.getAccounts();
        }
        else {
          this.loader.msg.emit({ severity: 'error', summary: 'Account', detail: s.StatusText });
        }
      },
      e => {
        this.loader.loader.emit(false);
      }
    );
  }
}
