// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _isLightTheme = new BehaviorSubject<boolean>(false);
  isLightTheme$ = this._isLightTheme.asObservable();

  toggleLightTheme() {
    const current = this._isLightTheme.value;
    this._isLightTheme.next(!current);

    if (!current) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }

  get isLightTheme() {
    return this._isLightTheme.value;
  }
}
