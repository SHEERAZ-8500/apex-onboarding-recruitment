import { Component } from '@angular/core';
import { ToggleService } from '../../services/ToggleService';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.scss'
})
export class SideNavBarComponent {
  isOpen = true;
  constructor(private toggleService: ToggleService) { }
  assesment = true;
  masterdata = true;
  masterdataCollapsed = true;
  generalMasterdataCollapsed = true;
  organizationalMasterdataCollapsed = true;
  outsourcinggMasterdataCollapsed = true;
  adminCollapsed = true;
  requisitionLookupsCollapsed = true;
  ngOnInit() {
    this.toggleService.sidebarOpen$.subscribe(open => this.isOpen = open);
  }
}
