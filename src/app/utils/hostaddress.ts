import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  ip: string = "https://customerdemoapi.herokuapp.com";

  constructor() { }

  getHostIp(){
    return this.ip;
  }

}
