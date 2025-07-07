import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }
  private showSpinner = signal(false);
  get isSpinnerVisible(): boolean {
    return this.showSpinner();
  }
  show():void
  {
    console.log("SpinnerService: show");
    this.showSpinner.set(true);
  }

  hide():void
  {
    console.log("SpinnerService: hide");
     // Simulate a delay for demonstration purposes
    this.showSpinner.set(false);
  }

}
