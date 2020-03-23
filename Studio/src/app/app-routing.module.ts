import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './myapp/layout/layout.component';
import { OrderdetailsComponent } from './myapp/orderdetails/orderdetails.component';
import { LoginComponent } from './myapp/login/login.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './myapp/users/users.component';
import { AccountComponent } from './myapp/account/account.component';
import { CustomerComponent } from './myapp/customer/customer.component';
import { DaybookComponent } from './myapp/daybook/daybook.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'daybook'
      },
      {
        path: 'orderdetails', component: OrderdetailsComponent
      },
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'account', component: AccountComponent
      },
      {
        path: 'customer', component: CustomerComponent
      },
      {
        path: 'daybook', component: DaybookComponent
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**', redirectTo: 'daybook',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
