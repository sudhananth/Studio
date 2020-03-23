import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutComponent } from './myapp/layout/layout.component';
import { TableModule } from 'primeng/table';
import { OrderdetailsComponent } from './myapp/orderdetails/orderdetails.component';
import { LoginComponent } from './myapp/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { LoaderService } from './myapp/loader.service';
import { MessageService } from 'primeng/api';
import { UsersComponent } from './myapp/users/users.component';
import { CommonService } from './myapp/common.service';
import { AccountComponent } from './myapp/account/account.component';
import { TooltipModule } from 'ngx-bootstrap';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { CustomerComponent } from './myapp/customer/customer.component';
import { DaybookComponent } from './myapp/daybook/daybook.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    OrderdetailsComponent,
    LoginComponent,
    UsersComponent,
    AccountComponent,
    CustomerComponent,
    DaybookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    TooltipModule.forRoot(),
    ProgressBarModule,
    CalendarModule,
    AutoCompleteModule
  ],
  providers: [LoaderService, MessageService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
