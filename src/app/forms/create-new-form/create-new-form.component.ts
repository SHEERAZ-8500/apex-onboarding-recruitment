import { Component } from '@angular/core';
import { CreateFormDto } from '../../shared/dtos/Dto';
import { ApiService } from '../../shared/services/apis/api.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../shared/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-new-form',
  templateUrl: './create-new-form.component.html',
  styleUrl: './create-new-form.component.scss'
})
export class CreateNewFormComponent {

  formData = new CreateFormDto();
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: ToastrService,
    private loader: LoaderService
  ) { }


    onSubmit() {
  if (!this.formData.name || !this.formData.code) {
    this.toaster.error('Please fill required fields');
    return;
  }

  this.loader.show();

  this.apiService.createNewForm(this.formData).subscribe(
    (response: any) => {
      this.toaster.success('Form Created Successfully');
      this.loader.hide();
      this.location.back();
    },
    (error) => {
      this.toaster.error(error.message || 'Error');
      this.loader.hide();
    }
  );
}

    onReset() {
      this.formData = new CreateFormDto();
    }

}
