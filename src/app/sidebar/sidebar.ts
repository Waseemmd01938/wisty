import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [MatSlideToggleModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
@Input()title: string = 'Wisty';
@Output() toggleSidebar:EventEmitter<boolean> = new EventEmitter<boolean>();
isSidebarOpen: boolean = false;
menuItems:any[]=[]
constructor(private router: Router){
this.menuItems = [
  { name: 'Home', icon: 'bi bi-house-door-fill', url: 'home' },
  { name: 'Code', icon: 'bi bi-code', url: 'code' },
  //  { name: 'About', icon: 'info', url: '/about' },
  // { name: 'Contact', icon: 'contact_mail', url: '/contact' }
];
}
toggle() {
  this.isSidebarOpen = !this.isSidebarOpen;
  this.toggleSidebar.emit(this.isSidebarOpen);
}
navigateTo(url: string): void {
  // Implement the logic to navigate to a specific URL
  // For example, you can use the Angular Router to navigate to a different route
  this.router.navigate([url])
}
get currentPath():string {
  let path:string[] = this.router.url.split('/');
  if(!path[path.length - 1]) return 'home';

  return path[path.length - 1] || '';
}
}
