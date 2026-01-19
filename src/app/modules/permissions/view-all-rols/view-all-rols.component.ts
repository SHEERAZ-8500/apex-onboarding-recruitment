import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/apis/api.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../shared/services/loader.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-all-rols',
  templateUrl: './view-all-rols.component.html',
  styleUrl: './view-all-rols.component.scss'
})
export class ViewAllRolsComponent {
  usersList: any[] = [];
  totalItems: number = 0;
  totalPagesCount: number = 0;

  constructor(private apiService: ApiService, private toastr: ToastrService, private loader: LoaderService,private router: Router) {

  }

  currentPage = 1;
  itemsPerPage = 10;
  paginatedUsersList: any[] = [];

  get totalPages() {
    return this.totalPagesCount || Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loader.show();
    this.apiService.getAllRolls().subscribe({
      next: (response: any) => {
        this.loader.hide();
        this.usersList = response.data;
        this.totalItems = response.paginator.totalItems;
        this.totalPagesCount = response.paginator.totalPages;
        this.currentPage = response.paginator.currentPage + 1; // Backend 0-indexed
        this.paginatedUsersList = this.usersList;
      }
      ,
      error: (error) => {
        this.loader.hide();
        this.toastr.error('Error fetching users list');
      }
    });
  }



  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadUsers();
  }

  formatRoleName(role: string): string {
    if (!role) return "";

    return role
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  goToPermissions(user: any) {

  this.router.navigate(
    ['/panel/permissions/view-permissions'],
    {
      queryParams: { publicId: user.publicId }
    }
  );
}
}
