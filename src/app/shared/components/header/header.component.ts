import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { ToggleService } from '../../services/ToggleService';
import { ThemeService } from '../../services/Theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // 🔹 Notification card ka reference
  @ViewChild('notifyCard') notifyCard!: ElementRef;

  showNotifications = false;
  animateBounce = false;

  notifications = [
    { icon: 'fa-solid fa-triangle-exclamation', color: '#f5e967ff', text: 'Duis malesuada justo eu sapien elementum varius.' },
    { icon: 'fa-solid fa-users', color: '#dc3545', text: 'Curabitur id eros quis nunc suscipit blandit.' },
    { icon: 'fa-solid fa-user', color: '#dc3545', text: 'Donec at nisi sit amet tortor commodo dignissim.' },
    { icon: 'fa-solid fa-user', color: '#2c825aff', text: 'Duis malesuada justo eu sapien elementum varius.' },
    { icon: 'fa-solid fa-user', color: '#1274ac', text: 'Curabitur id eros quis nunc suscipit blandit.' }
  ];

  isDarkMode = false;
  showChat = false;

  constructor(
    private toggleService: ToggleService,
    public themeService: ThemeService
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
        const bootstrapOffcanvas =
          new (window as any).bootstrap.Offcanvas(offcanvasElement);
        bootstrapOffcanvas.show();
      }
    }
  }

  // 🔔 Bell click
  toggleNotifications(event: MouseEvent) {
    event.stopPropagation(); // 🔴 very important
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      this.animateBounce = true;
      setTimeout(() => {
        this.animateBounce = false;
      }, 1000);
    }
  }

  clearAll() {
    this.notifications = [];
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  // 🔥 Real outside click handler
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.showNotifications) return;

    const clickedInsideNotify =
      this.notifyCard?.nativeElement.contains(event.target);

    if (!clickedInsideNotify) {
      this.showNotifications = false;
    }
  }

  openChat() {
    this.showChat = true;
  }

  closeChat() {
    this.showChat = false;
  }
}
