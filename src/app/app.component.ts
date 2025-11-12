import { Component } from '@angular/core';
import { ToggleService } from './shared/services/ToggleService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'onboarding-recruitment-project';
  isOpen = true;
  constructor(private toggleService: ToggleService,private toastr: ToastrService,) { }

  ngOnInit() {
    this.toggleService.sidebarOpen$.subscribe(open => this.isOpen = open);
  }
  toaster(){
      this.toastr.success('Data saved successfully!', 'Success');
  }
}
