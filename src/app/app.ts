import { SpinnerService } from './spinner/spinner-service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./sidebar/sidebar";
import { CommonModule } from '@angular/common';
import { Spinner } from "./spinner/spinner/spinner";
import { Navbar } from './navbar/navbar';
import { DarkModeService } from './dark-mode-service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule, Spinner,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isSidebarOpen = false;
  protected title = 'Wisty';

  constructor(private spinnerService: SpinnerService,private DarkModeServices:DarkModeService) {

  }
  showSpinner(): void {
    console.log("App: showSpinner");
    this.spinnerService.show();
  }
  hideSpinner(): void {
    console.log("App: hideSpinner");
    this.spinnerService.hide();
  }
  get isDark()
  {
    return this.DarkModeServices.isDark
  }
}
