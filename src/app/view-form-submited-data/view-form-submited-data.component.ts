import { Component, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ApiService } from '../shared/services/apis/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-form-submited-data',
  templateUrl: './view-form-submited-data.component.html',
  styleUrl: './view-form-submited-data.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class ViewFormSubmitedDataComponent {
  formJson = null;
  savedData: any = null;
  publicId = ''
  formPublicId = ''
  @ViewChild('formioComp', { read: ElementRef }) formioComp!: ElementRef;
  constructor(private apiService: ApiService, private toastr: ToastrService, private route: ActivatedRoute) { }
  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.fetchFormIdFromRoute()
    this.getFormStructure()
  }



  getFormStructure() {
    this.apiService.getUserFormData(this.publicId).subscribe((response: any) => {
      // this.formJson = response;
      console.log(response);
      let data = response.data.formDefinition.formDefinition;
      let savedData = response.data.submission.data;
      console.log(savedData);

      const hasSubmitButton = data.components.some(
        (comp: any) => comp.type === 'button' && comp.key === 'submit'
      );

      if (!hasSubmitButton) {

        data.components.push({
          label: "Submit",
          showValidations: false,
          tableView: false,
          key: "submit",
          type: "button",
          input: true
        });
        
        this.formJson = data;
        this.formPublicId = response.data.submission.publicId;
        this.savedData = { data: savedData };

      } else {
        this.formJson = data;
        this.savedData = { data: savedData };



      }

    }, error => {


    });
  }


  onSubmit(event: any) {
    
    console.log('submission', event);
    this.apiService.updateUserFormData(this.formPublicId, {data:event.data}).subscribe((response: any) => {
      this.toastr.success('data updated successfully!');
    }, error => {
    }
    );
  }
  currentColumns = 1;

  setLayout(columns: number) {
    this.currentColumns = columns;

    // Formio ke andar dynamically update karna
    const groups = this.formioComp.nativeElement.querySelectorAll('.formio-form-group');

    groups.forEach((group: HTMLElement) => {
      const isSubmit = group.classList.contains('formio-component-submit');
      const isSignature = group.classList.contains('formio-component-signature');
      if (isSubmit) {
        // submit button hamesha full width
        group.style.width = '100%';
        // group.style.display = 'block';
        group.style.marginRight = '0';
      } else {
        if (columns === 1) {
          const form = document.querySelector('.formio-form');
          if (form) {
            form.classList.add('single-column');
          }
          group.style.width = '100%';

        } else if (columns === 2) {
          group.style.width = 'calc(45% - 0.5rem)';
        } else if (columns === 3) {
          group.style.width = 'calc(30.333% - 0.66rem)';
        }
        group.style.display = 'inline-block';
        group.style.marginRight = '1rem';
      }
    });
  }


  fetchFormIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.publicId = params.get('id') || '';
      console.log('Route ID:', this.publicId);
    });
  }
}
