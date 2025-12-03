import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-user-permissions',
  templateUrl: './view-user-permissions.component.html',
  styleUrl: './view-user-permissions.component.scss'
})
export class ViewUserPermissionsComponent {
publicId: string = '';
  constructor(private apiservice: ApiService, private loader: LoaderService, private toast: ToastrService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.publicId = this.route.snapshot.queryParamMap.get('publicId') || '';
    this.getUserPermissions();

   
  }
  getUserPermissions() {
    this.loader.show();
    
    this.apiservice.getUserRolePermissions(this.publicId).subscribe((res: any) => {
      this.loader.hide();
      console.log(res);
    }, (err: any) => {
      this.loader.hide();
      this.toast.error('Failed to load user permissions', 'Error');
    });

  }
}
