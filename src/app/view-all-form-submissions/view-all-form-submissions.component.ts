import { Component } from '@angular/core';
import { FormSubmissionDto } from '../shared/dtos/Dto';
import { ApiService } from '../shared/services/apis/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all-form-submissions',
  templateUrl: './view-all-form-submissions.component.html',
  styleUrl: './view-all-form-submissions.component.scss'
})
export class ViewAllFormSubmissionsComponent {
  routeNUmber: number = 1;
  FormList: FormSubmissionDto[] = []
  formId: string = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }


  getAllFormSubmissionById(id: string) {
    this.routeNUmber = 2;
    this.apiService.getAllFormSubmissionsById(id).subscribe((res: any) => {
      this.FormList = res.data;
      this.updatePagination();
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
    this.fetIdFromRoute()
    if (this.formId) {
      this.getAllFormSubmissionById(this.formId);
    }

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
  fetIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.formId = params.get('id') || '';
    });
  }
}
