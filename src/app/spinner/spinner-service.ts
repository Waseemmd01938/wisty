import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }
  private showSpinner: boolean = false;
  get isSpinnerVisible(): boolean {
    return this.showSpinner;
  }
  show():void
  {
    console.log("SpinnerService: show");
    this.showSpinner = true;
  }

  hide():void
  {
    console.log("SpinnerService: hide");
     // Simulate a delay for demonstration purposes
    this.showSpinner = false;
  }

}
