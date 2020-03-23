import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor() { }
  cars: any[] = [];
  cols: any[];
  ngOnInit(): void {
    this.cols = [
      { field: 'vin', header: 'Customer Name' },
      { field: 'year', header: 'Order Details' },
      { field: 'brand', header: 'Order Amount' },
      { field: 'color', header: 'Order Date' }
    ];


    this.cars = [
      { "brand": "BMW", "year": 2013, "color": "Grey", "vin": "fh2uf23" },
      { "brand": "Chevrolet", "year": 2011, "color": "Black", "vin": "4525g23" }
    ]
  }

}
