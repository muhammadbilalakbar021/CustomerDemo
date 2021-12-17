import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit, AfterViewInit {

  public ELEMENT_DATA: any = []
  tableLoaded = false

  displayedColumns: any = ['id', 'name', 'email', 'phone', 'address'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  @ViewChild('TABLE') table: ElementRef | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;


  constructor(
    private customerService: CustomerService
  ) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  ngOnInit(): void {
    this.customerService.getCustomer()
      .then((data) => {
        console.log(data);
        this.ELEMENT_DATA = data

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.tableLoaded = true;
      })
      .catch((error) => {
        console.log(error);

      })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
