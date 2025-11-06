import { Component } from '@angular/core';
import { ToggleService } from '../../services/ToggleService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private toggleService: ToggleService) { }

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
