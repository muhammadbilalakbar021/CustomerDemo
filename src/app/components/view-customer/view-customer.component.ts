import {Customer}  from '../../modals/Customer';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  public CUSTOMER_DATA: any = []
  tableLoaded = false

  displayedColumns: Customer | any = ['name', 'email', 'phone', 'address', 'detail'];
  dataSource = new MatTableDataSource<any>(this.CUSTOMER_DATA);
  @ViewChild('TABLE') table: ElementRef | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;


  constructor(
    private customerService: CustomerService,
    private route_: Router
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.customerService.getCustomer()
      .then((data) => {
        console.log(data);
        this.CUSTOMER_DATA = data

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<Customer>(this.CUSTOMER_DATA);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.tableLoaded = true;
      })
      .catch((error) => {
        console.log(error);

      })

  }

  specificCustomerDetails(index:number){
    this.route_.navigate([
      `./details-customer` ,{"customer": JSON.stringify(this.CUSTOMER_DATA[index])}
    ]);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
