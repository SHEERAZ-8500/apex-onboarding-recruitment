import { Component } from '@angular/core';
import { ToggleService } from './shared/services/ToggleService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'onboarding-recruitment-project';
  isOpen = true;
  constructor(private toggleService: ToggleService) { }

  ngOnInit() {
    this.toggleService.sidebarOpen$.subscribe(open => this.isOpen = open);
  }
}
