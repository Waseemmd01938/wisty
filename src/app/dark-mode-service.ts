import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private __dark_mode:boolean=false;
  constructor() { }

  get isDark()
  {
    return this.__dark_mode
  }
  allowDark(mode:boolean)
  {
    this.__dark_mode=mode
  }
}
