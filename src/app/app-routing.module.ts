import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { DetailCustomerComponent } from './components/detail-customer/detail-customer.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-customer',
    pathMatch: 'full'
  },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'view-customer', component: ViewCustomerComponent},
  { path: 'details-customer', component: DetailCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
