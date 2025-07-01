import { DarkModeService } from './../dark-mode-service';

import { Component,ElementRef,Renderer2, viewChild } from '@angular/core';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  darkModeLogo=viewChild.required<ElementRef>('darkModeLogo');
  setDark:boolean=false;
  constructor(private renderer: Renderer2, private DarkModeServices:DarkModeService) {
    // Initialize any necessary properties or services here
  }
  redirectToUrl(url:string): void {

    // Implement the logic to redirect to a specific URL
    // For example, you can use the Angular Router to navigate to a different route
    let anchor=this.renderer.createElement('a');
    anchor.href=url;
    this.renderer.setProperty(anchor, 'target', '_blank');
    this.renderer.appendChild(document.body, anchor);
    anchor.click();
    this.renderer.removeChild(document.body, anchor);
    console.log("Redirecting to a specific URL", url);

  }

  get isDark()
  {
    return this.setDark
  }
  setDarkmode(){
    this.setDark = !this.setDark

    this.DarkModeServices.allowDark(this.setDark)
  }
}
