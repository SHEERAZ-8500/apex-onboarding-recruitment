import { Component } from '@angular/core';
import { ToggleService } from '../../shared/services/ToggleService';

@Component({
  selector: 'app-lay-out-one',
  templateUrl: './lay-out-one.component.html',
  styleUrl: './lay-out-one.component.scss'
})
export class LayOutOneComponent {
  isOpen = true;
  constructor(private toggleService: ToggleService) { }

  ngOnInit() {
    this.toggleService.sidebarOpen$.subscribe(open => this.isOpen = open);
  }
}
