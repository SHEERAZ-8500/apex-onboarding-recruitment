import { Component, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { PermissionService } from '../../shared/services/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-role',
  templateUrl: './create-new-role.component.html',
  styleUrl: './create-new-role.component.scss'
})
export class CreateNewRoleComponent {
  code: string = '';
  name: string = '';
  description: string = '';
  permissionCodes: string[] = [];

  expandedModules: { [key: string]: boolean } = {};

  permissionModules:any [] = []

  constructor(private loader: LoaderService, private apiService: ApiService, private toastr: ToastrService,private permissionService: PermissionService,private router: Router) { 
this.permissionModules = this.permissionService.permissionModules
  }

  toggleModule(moduleKey: string) {
    this.expandedModules[moduleKey] = !this.expandedModules[moduleKey];
  }

  isPermissionSelected(code: string): boolean {
    return this.permissionCodes.includes(code);
  }

  togglePermission(code: string) {
    const index = this.permissionCodes.indexOf(code);
    if (index > -1) {
      this.permissionCodes.splice(index, 1);
    } else {
      this.permissionCodes.push(code);
    }
  }

  getSelectedCount(moduleKey: string): number {
    const module = this.permissionModules.find(m => m.key === moduleKey);
    if (!module) return 0;
    return module.permissions.filter((p:any) => this.permissionCodes.includes(p.code)).length;
  }

  createRole() {
    if (!this.code || !this.name) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    const payload = {
      code: this.code,
      name: this.name,
      description: this.description,
      permissionCodes: ['ADMIN_ASSIGN_PERMISSIONS']
    };
    this.loader.show();
    this.apiService.createNewRole(payload).subscribe({
      next: (response: any) => {
        this.loader.hide();
        this.toastr.success("Role created successfully!");
        this.router.navigate(['/panel/permissions/view-all-roles']);
      },
      error: (err) => {
        this.loader.hide();
        this.toastr.error("Failed to create role!");
      }
    });

  }
}
