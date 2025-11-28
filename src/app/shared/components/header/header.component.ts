import { Component, ElementRef, HostListener } from '@angular/core';
import { ToggleService } from '../../services/ToggleService';
import { ThemeService } from '../../services/Theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showNotifications = false;

  notifications = [
    { icon: 'fa-solid fa-triangle-exclamation', color: '#f5e967ff', text: 'Duis malesuada justo eu sapien elementum varius.' },
    { icon: 'fa-solid fa-users', color: '#dc3545', text: 'Curabitur id eros quis nunc suscipit blandit.' },
    { icon: 'fa-solid fa-user', color: '#dc3545', text: 'Donec at nisi sit amet tortor commodo dignissim.' },
    { icon: 'fa-solid fa-user', color: '#2c825aff', text: 'Duis malesuada justo eu sapien elementum varius.' },
    { icon: 'fa-solid fa-user', color: '#1274ac', text: 'Curabitur id eros quis nunc suscipit blandit.' }
  ];

  isDarkMode = false;

  constructor(
    private toggleService: ToggleService, 
    public themeService: ThemeService,
    private eRef: ElementRef  // Inject ElementRef
  ) {}

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

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  clearAll() {
    console.log('Clear all notifications clicked');
    this.notifications = [];
  }
  closeNotifications() {
  this.showNotifications = false;
}


  // **Click outside listener**
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showNotifications = false;
    }
  }
}
