import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestionLookupDto } from '../../shared/dtos/Dto';

@Component({
  selector: 'app-create-job-title',
  templateUrl: './create-job-title.component.html',
  styleUrl: './create-job-title.component.scss'
})
export class CreateJobTitleComponent implements OnInit {
  formTitle: string = 'Job Title';
  formData = new RequestionLookupDto()
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const currentPath = this.route.snapshot.routeConfig?.path;
    if (currentPath === 'create-employee-category') {
      this.formTitle = 'Employee Category';
    } else {
      this.formTitle = 'Job Title';
    }
  }

  onSubmit() {

  }

}
