import { Component,Renderer2 } from '@angular/core';
import { SpinnerService } from '../spinner-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinner],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss'
})
export class Spinner {
  constructor(private spinnerService: SpinnerService) { }
  get isSpinnerVisible(): boolean{
    return this.spinnerService.isSpinnerVisible;
  }
}
