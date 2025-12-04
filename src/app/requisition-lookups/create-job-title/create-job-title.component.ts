import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestionLookupDto } from '../../shared/dtos/Dto';
import { ApiService } from '../../shared/services/apis/api.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-create-job-title',
  templateUrl: './create-job-title.component.html',
  styleUrl: './create-job-title.component.scss',
})
export class CreateJobTitleComponent implements OnInit {
  formTitle: string = 'Job Title';
  formData = new RequestionLookupDto()
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: ToastrService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    const currentPath = this.route.snapshot.routeConfig?.path;
    if (currentPath === 'create-employee-category') {
      this.formTitle = 'Employee Category';
    } else {
      this.formTitle = 'Job Title';
    }
  }

  onSubmit() {
    if (this.formTitle === 'Job Title') {
      if (!this.formData.name || !this.formData.code || !this.formData.emailAddress) {
         this.toaster.error('Please Fill required fileds')
         return
      }
      this.loader.show();
      this.apiService.createJobTitle(this.formData).subscribe((response: any) => {
        this.toaster.success('Job Title Created Successfully')
        this.loader.hide()

      }, (error) => {
        this.toaster.error('Error')
        this.loader.hide()

      }
      );
    }
     if (this.formTitle === 'Employee Category') {
      if (!this.formData.name || !this.formData.code || !this.formData.emailAddress) {
         this.toaster.error('Please Fill required fileds')
         return
      }
      this.loader.show();
      this.apiService.createEmployeeCategories(this.formData).subscribe((response: any) => {
        this.toaster.success('Employee Category Created Successfully')
        this.loader.hide()

      }, (error) => {
        this.toaster.error('Error')
        this.loader.hide()

      }
      );
    }
  }
}
