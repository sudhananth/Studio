import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { UserInfo } from '../common.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private loader: LoaderService) { }
  uI: UserInfo;
  ngOnInit(): void {
    debugger;
    this.uI = this.loader.gUserInfo();
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  gotoPage(input: string) {
    this.router.navigate(['/' + input]);
  }
}
