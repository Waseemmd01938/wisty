import { Component,Renderer2 } from '@angular/core';
import { SpinnerService } from '../spinner-service';

import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressBarModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss'
})
export class Spinner {
  constructor(private spinnerService: SpinnerService) { }
  get isSpinnerVisible(): boolean{
    return this.spinnerService.isSpinnerVisible;
  }
}
