import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { LoaderService } from '../loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../common.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  constructor(private _customerService: CustomerService, private loader: LoaderService, private _frm: FormBuilder,
    private _commonService: CommonService) { }
  customerId: number = 0;
  customers: any[] = [];
  cols: any[];
  frmCustomer: FormGroup;
  accountCategories: any[] = [];
  uI: UserInfo;
  ngOnInit(): void {
    this.uI = this.loader.gUserInfo();
    this.cols = [
      { field: 'CustomerName', header: 'Customer Name' },
      { field: 'CustomerMobile', header: 'Mobile' },
      { field: 'CustomerEmail', header: 'Email' }
    ];
    this.frmInilizer();
    this.getCustomers();
  }

  frmInilizer() {
    this.frmCustomer = this._frm.group({
      CustomerId: [this.customerId, Validators.required],
      AccountId: [0, Validators.required],
      CustomerName: ['', Validators.required],
      CustomerMobile: ['', Validators.required],
      CustomerEmail: [''],
      CustomerAddress1: [''],
      CustomerAddress2: [''],
      CustomerAddress3: [''],
      CustomerAddress4: ['']
    });

  }

  getCustomers() {
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
    this._customerService.GetCustomers(param).subscribe(
      s => {        
        this.loader.loader.emit(false);
        this.customers = s;
      },
      e => { this.loader.loader.emit(false); }
    );
  }

  addCustomer() {
    this.customerId = 0;
    this.frmInilizer();
  }
  Edit(data) {
    this.customerId = +data.CustomerId;
    let param = {
      "IntReq1": this.customerId,
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
    this._customerService.GetCustomers(param).subscribe(
      u => {        
        this.loader.loader.emit(false);
        if (u && u.length > 0) {
          let data = u[0];
          this.frmCustomer.patchValue({
            CustomerId: data.CustomerId,
            AccountId: data.AccountId,
            CustomerName: data.CustomerName,
            CustomerMobile: data.CustomerMobile,
            CustomerEmail:data.CustomerEmail,
            CustomerAddress1: data.CustomerAddress1,
            CustomerAddress2:data.CustomerAddress2,
            CustomerAddress3:data.CustomerAddress3,
            CustomerAddress4:data.CustomerAddress4
          });
        }
      },
      e => { this.loader.loader.emit(false); });
  }
  submitCustomer() {    
    let data = this.frmCustomer.value;
    let param = {
      "CustomerId": data.CustomerId,
      "AccountId": data.AccountId,
      "CustomerName": data.CustomerName,
      "CustomerMobile": data.CustomerMobile,
      "CustomerEmail": data.CustomerEmail,
      "CustomerAddress1": data.CustomerAddress1,
      "CustomerAddress2": data.CustomerAddress2,
      "CustomerAddress3": data.CustomerAddress3,
      "CustomerAddress4": data.CustomerAddress4,
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
    this._customerService.AddUpdateCustomer(param).subscribe(
      s => {        
        this.loader.loader.emit(false);
        if (s.StatusCode == 0) {
          this.loader.msg.emit({ severity: 'success', summary: 'Customer', detail: s.StatusText });
          this.addCustomer();
          this.getCustomers();
        }
        else {
          this.loader.msg.emit({ severity: 'error', summary: 'Customer', detail: s.StatusText });
        }
      },
      e => {
        this.loader.loader.emit(false);
      }
    );
  }

}
