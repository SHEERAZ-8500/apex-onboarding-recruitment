import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/apis/api.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-view-all-lookup-tables',
  templateUrl: './view-all-lookup-tables.component.html',
  styleUrl: './view-all-lookup-tables.component.scss'
})
export class ViewAllLookupTablesComponent {
 routeNUmber: number = 1;
  FormList: any[] = []
  formId: string = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute, private loader: LoaderService) {

  }

  getAllTablesList() {
    this.routeNUmber = 1;
    this.loader.show();
    this.apiService.getAllLookUpTables().subscribe((res: any) => {
      this.FormList = res.data;
      console.log(this.FormList);
      this.updatePagination();
      this.loader.hide();

    }, error => {
      this.loader.hide();
    });
  }


  setInterest(candidate: any, value: boolean | null) {
    candidate.interested = value;
  }
  currentPage = 1;
  itemsPerPage = 5;
  paginatedFormList: any[] = [];

  get totalPages() {
    return Math.ceil(this.FormList.length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.updatePagination();

    this.getAllTablesList();

  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedFormList = this.FormList.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}
