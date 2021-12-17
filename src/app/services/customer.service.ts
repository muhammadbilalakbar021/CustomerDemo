import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import SnackBar from '../utils/snackbar';
import { HostService } from '../utils/hostaddress';
import { Customer } from '../modals/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private hostAddress: HostService,
    protected _snack: SnackBar,
  ) { }


  addCustomer(name:any,email:any,phone:any,address:any) {
    let customer = {
      "name":name,
      "email":email,
      "phone":phone,
      "address":address
    }
    console.log(customer)

    return new Promise<Customer>((resolve, reject) => {
      this.http.post(`${this.hostAddress.getHostIp()}/api/customer/`, customer)
        .toPromise()
        .then((data: any) => {
          // Debugger
          console.log(data)
          // Check Length of Data
          if (data == null) {
            // Error PopUp
            this._snack.showSnackBar("No response from server", "")
          }
          // Hurrah Baby
          this._snack.showSnackBar("Customer Added", "")
          resolve(data)
        })
        .catch((err) => {
          // Debugger
          console.log(err)
          // Error PopUp
          this._snack.showSnackBar(err.error, "")
          // Rejection Baby
          reject(err)
        })
    })
  }

  getCustomer(){
    return new Promise<Customer>((resolve, reject) => {
      this.http.get(`${this.hostAddress.getHostIp()}/api/customer/`)
        .toPromise()
        .then((data: any) => {
          // Debugger
          console.log(data)
          // Check Length of Data
          if (data == null) {
            // Error PopUp
            this._snack.showSnackBar("No response from server", "")
          }
          // Hurrah Baby
          resolve(data)
        })
        .catch((err) => {
          // Debugger
          console.log(err)
          // Error PopUp
          this._snack.showSnackBar(err.error, "")
          // Rejection Baby
          reject(err)
        })
    })

  }
}
