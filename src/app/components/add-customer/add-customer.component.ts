import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile = new FormControl('', [Validators.required, Validators.pattern("^((\\+92-?)|0)?[0-9]{10}$")]);
  address = new FormControl('', [Validators.required, Validators.minLength(4)]);
  form: FormGroup | any = new FormGroup({});


  constructor(
    protected customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerService.getCustomer()
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('minlength') ? 'Name length must be greator than 4' : '' || this.name.hasError('maxlength') ? 'Name length must be less  than 20' : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getContactErrorMessage() {
    if (this.mobile.hasError('required')) {
      return 'You must enter a value or Number';
    }

    return this.mobile.hasError('pattern') ? 'Not a valid mobile' : '';
  }

  getAddressErrorMessage() {
    if (this.address.hasError('required')) {
      return 'You must enter a value';
    }

    return this.address.hasError('minlength') ? 'Address length must be greator than 4' : '';
  }

  addUser(name: string, email: string, contact: string, address: string) {
    this.customerService.addCustomer(name, email, contact, address)

  }

}
