import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-user-permissions',
  templateUrl: './view-user-permissions.component.html',
  styleUrl: './view-user-permissions.component.scss'
})
export class ViewUserPermissionsComponent {
  constructor(private apiservice: ApiService, private loader: LoaderService, private toast: ToastrService) { }
  ngOnInit(): void {
    this.getUserPermissions();
  }
  getUserPermissions() {
    this.loader.show();
    this.apiservice.getUserRolePermissions('').subscribe((res: any) => {
      this.loader.hide();
      console.log(res);
    }, (err: any) => {
      this.loader.hide();
      this.toast.error('Failed to load user permissions', 'Error');
    });

  }
}
