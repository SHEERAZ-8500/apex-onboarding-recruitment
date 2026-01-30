import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared/services/apis/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { ViewEnumValuesInTableDto } from '../../../shared/dtos/Dto';

@Component({
  selector: 'app-view-all-enums-values-in-table',
  templateUrl: './view-all-enums-values-in-table.component.html',
  styleUrl: './view-all-enums-values-in-table.component.scss'
})
export class ViewAllEnumsValuesInTableComponent {

  
  
     constructor(
        private router: Router,
        private toastr: ToastrService,
        private loader: LoaderService,
        private api: ApiService,
        private activatedRoute: ActivatedRoute
      ) { }
  
  lookupName!: string;
       currentPage = 0; // Backend uses 0-based indexing
    itemsPerPage = 5;
    totalItems = 0;
    totalPages = 0;
    enumComponentCode!: string;
      paginatedEnumsValues: ViewEnumValuesInTableDto[] = [];
      enumValues: string[] = [];
  
  
  
  
      ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.enumComponentCode = params['enum'];
  
      if (this.enumComponentCode) {
        this.getEnumsData();
      }
    });
  }
  
  
  
        get totalPagesArray() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
  
   changePage(page: number) {
    const apiPage = page - 1;
    if (apiPage < 0 || apiPage >= this.totalPages) return;
  
    this.currentPage = apiPage;
    this.getEnumsData();
  }
  
  
   getEnumsData() {
  this.loader.show();
  this.api.getAllEnumValuesInTable(
    this.enumComponentCode,
    this.currentPage,
    this.itemsPerPage
  ).subscribe({
    next: (res: any) => {
      this.loader.hide();

      // ✅ YAHAN FIX
      this.enumValues = res.data?.values || [];
      this.totalItems = res.data?.valueCount || 0;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    },
    error: (err: any) => {
      this.loader.hide();
      console.error(err);
    }
  });
}

  
  

}
