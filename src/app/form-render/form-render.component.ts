import { Component, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ApiService } from '../shared/services/apis/api.service';

@Component({
  selector: 'app-form-render',
  templateUrl: './form-render.component.html',
  styleUrl: './form-render.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormRenderComponent {
  formJson = null;
  @ViewChild('formioComp', { read: ElementRef }) formioComp!: ElementRef;
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.apiService.getFormDefinition("95a27209-913e-4c3f-a4cf-99d52b2a5756").subscribe((response: any) => {
      // this.formJson = response;
      console.log(response);
      this.formJson = response.data.formDefinition;
    }, error => {
      debugger

    });
    // if (savedForm) {
    //   this.formJson = JSON.parse(savedForm);
    // }
  }

  onSubmit(event: any) {
    console.log('submission', event);

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
}
