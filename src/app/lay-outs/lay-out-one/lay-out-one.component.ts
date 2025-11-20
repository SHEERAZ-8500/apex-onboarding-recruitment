import { Component } from '@angular/core';
import { ToggleService } from '../../shared/services/ToggleService';
import { ThemeService } from '../../shared/services/Theme.service';

@Component({
  selector: 'app-lay-out-one',
  templateUrl: './lay-out-one.component.html',
  styleUrl: './lay-out-one.component.scss'
})
export class LayOutOneComponent {
  isOpen = true;
  constructor(private toggleService: ToggleService, public themeService: ThemeService) { }
  // Current Theme: {{ themeService.isLightTheme ? 'Light' : 'Dark' }}
  ngOnInit() {
    this.toggleService.sidebarOpen$.subscribe(open => this.isOpen = open);
  }
   isLightTheme = false;

  toggleLightTheme() {
    this.isLightTheme = !this.isLightTheme;
    if (this.isLightTheme) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }
}
