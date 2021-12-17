import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  detailedCustomer: any
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.detailedCustomer = this.route.snapshot.paramMap.get('customer')
    this.detailedCustomer = JSON.parse(this.detailedCustomer)
    console.log(this.detailedCustomer);

  }

}
