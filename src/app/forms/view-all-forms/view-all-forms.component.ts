import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/apis/api.service';
import { AllFormsLisitngDto } from '../../shared/dtos/Dto';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-all-forms',
  templateUrl: './view-all-forms.component.html',
  styleUrl: './view-all-forms.component.scss'
})
export class ViewAllFormsComponent {
  routeNUmber: number = 1;
  FormList: AllFormsLisitngDto[] = []
  formId: string = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute, private loader: LoaderService,    private toaster: ToastrService,
  ) {

  }

getAllFormlist() {
  this.routeNUmber = 1;
  this.loader.show();
  this.apiService.getUserAllForms().subscribe((res: any) => {
      this.FormList = res.data;
    console.log(this.FormList);
    this.updatePagination();
    this.loader.hide();
  }, error => {
    this.loader.hide();
  });
}
  getAllFormSubmissionById(id: string) {
    this.routeNUmber = 2;
    this.apiService.getAllFormSubmissionsById(id).subscribe((res: any) => {
      this.FormList = res.data;
      console.log(this.FormList, 'byid');
      this.updatePagination();
    });
  }

  setInterest(candidate: any, value: boolean | null) {
    candidate.interested = value;
  }
  currentPage = 1;
  itemsPerPage = 8;
  paginatedFormList: any[] = [];

  get totalPages() {
    return Math.ceil(this.FormList.length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.updatePagination();

    this.getAllFormlist();

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


  toggleActive(form: any, index: number) {
    let status = true;
    if (form.status === "ACTIVE") {
      status = false;
    }
    
  this.apiService.activateForm(form.formCode, status).subscribe(
    () => {
      this.toaster.success(`Form ${status ? 'activated' : 'deactivated'} successfully`);
    },
    (error) => {
      // console.error('Error activating form:', error.error);
      debugger
      this.FormList[index].status = status ? 'ACTIVE' : 'INACTIVE'; // Revert status on error
      this.toaster.error(error.error.message || 'Error activating form');
    }
  );
}
}
