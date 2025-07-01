import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Spinner } from './spinner/spinner';



@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    Spinner
  ]
})
export class SpinnerModule { }
