import { Component , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-form-render',
  templateUrl: './form-render.component.html',
  styleUrl: './form-render.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class FormRenderComponent {
  formJson = null;
ngOnInit() {
    const savedForm = localStorage.getItem('savedForm');  
  
    if (savedForm) {
      this.formJson = JSON.parse(savedForm);
    }
  }

  onSubmit(event: any) {
    console.log('submission', event);
  
  }
}
