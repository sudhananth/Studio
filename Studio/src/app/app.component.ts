import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from './myapp/loader.service';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngAfterViewInit(): void {
    this.loader.nativeElement.style.display = 'none';
    this.loaderService.loader.subscribe(s => {
      if (s)
        this.loader.nativeElement.style.display = 'block';
      else
        this.loader.nativeElement.style.display = 'none';
    });
    this.loaderService.msg.subscribe(s => {
      this.msg.add(s);
    });
  }
  ngOnDestroy(): void {
    this.loaderService.loader.unsubscribe();
    this.loaderService.msg.unsubscribe();
  }
  @ViewChild("loader", { static: true }) loader: ElementRef
  constructor(private loaderService: LoaderService, readonly viewportScroller: ViewportScroller, private router: Router, private msg: MessageService) {
    router.events
      .subscribe((event: NavigationEnd) => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });
  }
  ngOnInit(): void {

  }
}
