import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { LoaderService } from '../loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../common.model';
import { DayBookService } from './daybook.service';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.css'],
  providers: [DayBookService]
})
export class DaybookComponent implements OnInit {

  constructor(private _daybookService: DayBookService, private loader: LoaderService, private _frm: FormBuilder,
    private _commonService: CommonService) { }
  DayBookId: number = 0;
  daybooks: any[] = [];
  cols: any[];
  cols1: any[];
  frmdaybooks: FormGroup;
  CreditAccountList: any[] = [];
  uI: UserInfo;
  TransactionMode: any[] = [];
  chequeStatusList: any[] = [];
  chequeStatus: any[] = [];
  ngOnInit(): void {
    this.uI = this.loader.gUserInfo();
    this.cols = [
      { field: 'TxnDate', header: 'Txn Date' },
      { field: 'TxnMode', header: 'TxnMode' },
      { field: 'CreditAccountName', header: 'Credit AccountName' },
      { field: 'DebitAccountName', header: 'Debit AccountName' },
      { field: 'TxnAmount', header: 'Txn Amount' },
      { field: 'TaxAmount', header: 'Tax Amount' },
      { field: 'Description', header: 'Description' },
      { field: 'BankName', header: 'Bank Name' },
      { field: 'ChequeNo', header: 'Cheque No' },

    ];

    this.cols1 = [
      { field: 'TxnDate', header: 'Txn Date' },
      { field: 'Status', header: 'Status' },
      { field: 'Remarks', header: 'Remarks' }
    ]

    this.frmInilizer();
    this.getDaybooks();
    this.getDropdownData();
  }

  frmInilizer() {
    this.frmdaybooks = this._frm.group({
      DayBookId: [this.DayBookId, Validators.required],
      UniqueRef: [''],
      TxnDate: ['', Validators.required],
      TxnMode: ['Cash', Validators.required],
      TxnReferenceNo: [''],
      CreditAccount: [''],
      CreditAccountId: ['', Validators.required],
      DebitAccountId: ['', Validators.required],
      DebitAccount: ['', Validators.required],
      TxnAmount: ['', Validators.required],
      TaxAmount: ['', Validators.required],
      Description: ['', Validators.required],
      RefNo: [''],
      RefText: [''],
      BankName: [''],
      ChequeId: [0],
      ChequeNo: [''],
      ChequeDate: [''],
      ChequeStatus: ['Collected'],
      ChequeUniqueRef: ['']
    });

  }

  getDaybooks() {
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
    this._daybookService.GetDayBooks(param).subscribe(
      s => {
        this.loader.loader.emit(false);
        this.daybooks = s;
        this.daybooks.map(m => {
          if (m.Cheque) {
            m.BankName = m.Cheque.BankName;
            m.ChequeNo = m.Cheque.ChequeNo;
          }
        })
      },
      e => { this.loader.loader.emit(false); }
    );
  }



  getDropdownData() {
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
    this._commonService.CreditAccountList(param).subscribe(
      s => {

        this.CreditAccountList = s;
        this.creditAccounts = s.map(m => m.AccountName);
        this._commonService.PaymentReceiptModeListData(param).subscribe(
          s => {
            this.loader.loader.emit(false);
            this.TransactionMode = s;
          },
          e => {
            this.loader.loader.emit(false);
          }
        );

      },
      e => {
        this.loader.loader.emit(false);
      }
    );
    this._commonService.ChequeStatusListData(param).subscribe(
      s => {
        this.chequeStatusList = s;
      },
      e => {

      }
    );
  }
  addDaybook() {
    this.DayBookId = 0;
    this.frmInilizer();
  }
  Edit(data) {
    this.DayBookId = +data.DayBookId;
    let param = {
      "IntReq1": this.DayBookId,
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
    this._daybookService.GetDayBooks(param).subscribe(
      u => {
        this.loader.loader.emit(false);
        if (u && u.length > 0) {
          let data = u[0];
          this.frmdaybooks.patchValue({
            DayBookId: data.DayBookId,
            UniqueRef: data.UniqueRef,
            TxnDate: data.TxnDate ? new Date(data.TxnDate) : null,
            TxnMode: data.TxnMode,
            TxnReferenceNo: data.TxnReferenceNo,
            CreditAccountId: data.CreditAccount,
            CreditAccount: data.CreditAccountName,
            DebitAccountId: data.DebitAccount,
            DebitAccount: data.DebitAccountName,
            TxnAmount: data.TxnAmount,
            TaxAmount: data.TaxAmount,
            Description: data.Description,
            RefNo: data.RefNo,
            RefText: data.RefText
          });

          if (data.Cheque) {
            this.frmdaybooks.patchValue({
              BankName: data.Cheque.BankName,
              ChequeId: data.Cheque.ChequeId,
              ChequeNo: data.Cheque.ChequeNo,
              ChequeDate: data.Cheque.ChequeDate ? new Date(data.Cheque.ChequeDate) : null,
              ChequeUniqueRef: data.Cheque.UniqueRef
            });

            this.chequeStatus = data.Cheque.ChequeStatus;            
            this.chequeStatus.map(m => {
              m.TxnDate = m.TxnDate ? new Date(m.TxnDate).toDateString() : null;
            });
          }
        }
      },
      e => { this.loader.loader.emit(false); });
  }
  submitDaybook() {
    let data = this.frmdaybooks.value;

    let ifCheque: any = null;
    let isvalidated: boolean = true;
    if (data.TxnMode == 'Cheque') {
      if (data.BankName != '' && data.ChequeNo != '' && (data.ChequeDate != '' || data.ChequeDate != null)) {

        let status: any[] = [];

        this.chequeStatus.forEach(e => {
          status.push({
            "ChequeStatusId": e.ChequeStatusId,
            "ChequeId": e.ChequeId,
            "TxnDate": e.TxnDate ? new Date(e.TxnDate).toDateString() : null,
            "Status": e.Status,
            "Remarks": e.Remarks
          });
        });

        let newStatus = {
          "ChequeStatusId": 0,
          "ChequeId": data.ChequeId,
          "TxnDate": data.TxnDate ? new Date(data.TxnDate).toDateString() : null,
          "Status": data.ChequeStatus,
          "Remarks": ""
        }
        if (!status.some(f => f.Status == data.ChequeStatus))
          status.push(newStatus);
        ifCheque = {
          "ChequeId": data.ChequeId,
          "UniqueRef": data.ChequeUniqueRef,
          "BankName": data.BankName,
          "ChequeNo": data.ChequeNo,
          "ChequeDate": data.ChequeDate ? new Date(data.ChequeDate).toDateString() : null,
          "ChequeStatus": status

        };
      }
      else {
        isvalidated = false;
        this.loader.msg.emit({ severity: 'error', summary: 'DayBook', detail: 'Please Fill Mandatory Fields' });
      }
    }

    if (data.TxnMode != 'Cash' && data.TxnMode != 'Cheque') {
      if (data.TxnReferenceNo == '') {
        isvalidated = false;
        this.loader.msg.emit({ severity: 'error', summary: 'DayBook', detail: 'Please Fill Mandatory Fields' });
      }
    }

    if (isvalidated) {
      let param = {
        "DayBookId": data.DayBookId,
        "UniqueRef": data.UniqueRef,
        "TxnDate": data.TxnDate ? new Date(data.TxnDate).toDateString() : null,
        "TxnMode": data.TxnMode,
        "TxnReferenceNo": data.TxnReferenceNo,
        "CreditAccount": data.CreditAccountId,
        "CreditAccountName": data.CreditAccount,
        "DebitAccount": data.DebitAccountId,
        "DebitAccountName": data.DebitAccount,
        "TxnAmount": data.TxnAmount,
        "TaxAmount": data.TaxAmount,
        "Description": data.Description,
        "RefNo": data.RefNo,
        "RefText": data.RefText,
        "Cheque": ifCheque,
        "UserLog": {
          "CreatedById": this.uI.UserId,
          "CreatedByName": this.uI.UserName,
          "CreatedDate": new Date().toDateString(),
          "UpdatedById": this.uI.UserId,
          "UpdatedByName": this.uI.UserName,
          "UpdatedDate": new Date().toDateString()
        }
      }
      if (data.CreditAccountId != data.DebitAccountId) {
        this.loader.loader.emit(true);
        this._daybookService.AddUpdateDayBook(param).subscribe(
          s => {
            this.loader.loader.emit(false);
            if (s.StatusCode == 0) {
              this.loader.msg.emit({ severity: 'success', summary: 'DayBook', detail: s.StatusText });
              this.addDaybook();
              this.getDaybooks();
            }
            else {
              this.loader.msg.emit({ severity: 'error', summary: 'DayBook', detail: s.StatusText });
            }
          },
          e => {
            this.loader.loader.emit(false);
          }
        );
      }
      else
        this.loader.msg.emit({ severity: 'error', summary: 'DayBook', detail: 'Debit and Credit Account Should not be Equal' });

    }

  }
  filteredAccounts: any[] = [];
  creditAccounts: string[] = [];

  filterAccounts(event) {
    this.filteredAccounts = [];
    for (let i = 0; i < this.creditAccounts.length; i++) {
      let brand = this.creditAccounts[i];
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0)
        this.filteredAccounts.push(brand);
    }
  }
  focusOutAccounts(obj, control: string) {
    let a = '';
    if (control == "CreditAccount")
      a = this.frmdaybooks.value.CreditAccount;
    else
      a = this.frmdaybooks.value.DebitAccount;
    let data = this.creditAccounts.find(s => s == a);
    if (!data) {
      if (control == "CreditAccount")
        this.frmdaybooks.patchValue({ CreditAccount: '' });
      else
        this.frmdaybooks.patchValue({ DebitAccount: '' });
    }
    else {
      let result = this.CreditAccountList.find(f => f.AccountName == a);
      if (control == "CreditAccount")
        this.frmdaybooks.patchValue({
          CreditAccount: result.AccountName,
          CreditAccountId: result.AccountId
        });
      else
        this.frmdaybooks.patchValue({
          DebitAccount: result.AccountName,
          DebitAccountId: result.AccountId
        });
    }
  }
}
