import { Component } from '@angular/core';
import { ToggleService } from '../../services/ToggleService';
import { ThemeService } from '../../services/Theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode = false;
  constructor(private toggleService: ToggleService, public themeService: ThemeService) {
   
  }
  ngOnInit() {
  this.themeService.isLightTheme$.subscribe(value => {
    this.isDarkMode = !value; 
  });
}
  toggleSidebar() {
    if (window.innerWidth > 1000) {
      this.toggleService.toggleSidebar();
    } else {
      const offcanvasElement = document.getElementById('offcanvasScrolling');
      if (offcanvasElement) {
        const bootstrapOffcanvas = new (window as any).bootstrap.Offcanvas(offcanvasElement);
        bootstrapOffcanvas.show();

      }
    }
  }
}
