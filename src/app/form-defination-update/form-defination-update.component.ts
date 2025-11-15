import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from 'formiojs';
import { Components } from 'formiojs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/services/apis/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-defination-update',
  templateUrl: './form-defination-update.component.html',
  styleUrl: './form-defination-update.component.scss'
})
export class FormDefinationUpdateComponent {
  @ViewChild('builder', { static: true }) builderRef!: ElementRef;
  builder: any;
  sectionCount = 1;
  @ViewChild('formnameModalBtn') formnameModalBtn!: ElementRef;
  @ViewChild('closeFormnameModal') closeFormnameModal!: ElementRef;
  formName = ''
  publicId = ''

  constructor(private toastr: ToastrService, private apiService: ApiService, private route: ActivatedRoute) { }
  defaultFormJson = {
    display: 'form',
    components: []
  };
  ngOnInit() {
    // left side inputs options customization
    this.fetchFormIdFromRoute()
    this.getFormStructure()


  }

  addSection() {
    const schema = this.builder.instance.schema;
    const newSection = {
      type: 'panel',
      key: `section_${schema.components.length + 1}`,
      title: `Section ${schema.components.length + 1}`,
      components: []
    };

    schema.components.push(newSection);
    this.builder.instance.setForm(schema);
    console.log(' Section added', newSection);

    setTimeout(() => {
      const formArea = document.querySelector('.formarea') as HTMLElement;
      if (formArea) {
        // scroll to bottom
        formArea.scrollTop = formArea.scrollHeight;
      }
    }, 300); // delay taake DOM render ho jaye
  }


  logCurrentFormJson() {
    console.log('🧾 Form JSON:', this.builder.instance.schema);
  }

  onSubmit() {
    if (this.formnameModalBtn) {
      this.formnameModalBtn.nativeElement.click();
    }

  }

  saveFormData() {
    if (this.formName === '') {
      this.toastr.error('Form name is required!', 'Error');
      return
    }
    let payload = {
      ...this.builder.instance.schema,
      formName: this.formName
    };
    this.apiService.updateFormDefinitionById(this.publicId, payload).subscribe({
      next: (response) => {
        if (this.closeFormnameModal) {
          this.closeFormnameModal.nativeElement.click();
        }
        this.toastr.success('Form definition saved successfully!', 'Success');
      },
      error: (error) => {
      }
    });
  }

  getFormStructure() {
    this.apiService.getFormDefinitionById(this.publicId).subscribe((response: any) => {
      // this.formJson = response;
      console.log(response);
      let data = response.data.formDefinition;
      this.formName = data.formName;
      this.defaultFormJson.components = data.components;

      this.formBuilderInit()

    }, error => {


    });
  }

  fetchFormIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.publicId = params.get('id') || '';
    });
  }




  formBuilderInit() {
    const builderOptions = {
      builder: {
        basic: {
          title: 'Basic',
          default: true,
          weight: 0,
          components: {
            textfield: true,
            number: true,
            email: true,
            password: true,
            textarea: true,
            checkbox: true,
            select: true,
            radio: true,
            file: true,
            selectboxes: true,
            button: true,
          }
        },

        advanced: {
          title: 'Advanced',
          weight: 20,
          components: {
            email: false,
            url: false,
            phoneNumber: true,
            tags: true,
            address: true,
            datetime: true,
            day: true,
            time: true,
            currency: true,
            survey: false,
            signature: true,
          }
        },
        // layout: {
        //   title: 'Layout',
        //   weight: 10,
        //   components: {
        //     panel: true,
        //     table: true,
        //     columns: true,
        //     fieldset: true,
        //     tabs: true
        //   }
        // },
        // 👇 Disable other tabs completely
        layout: false,
        data: false,
        premium: false,
        resource: false
      }
    };
    this.builder = new FormBuilder(this.builderRef.nativeElement, { display: 'form', components: this.defaultFormJson.components }, builderOptions);
    this.builder.ready.then(() => {

      // Existing listeners
      this.builder.instance.on('saveComponent', (component: any) => {
        console.log('🧩 Component added or updated', component);
      });

      this.builder.instance.on('moveComponent', (component: any, before: any) => {
        console.log('📦 Component moved', component, before);
      });

      // ====== PUT THE CONDITIONAL LOGIC HANDLER HERE ======
      this.builder.instance.on('change', (event: any) => {
        const formio = this.builder.instance;
        const formValues = formio.webform?.submission?.data || {};

        const checkConditional = (component: any) => {
          if (!component) return;

          // Conditional logic available?
          if (component.conditional && component.conditional.when) {
            const whenKey = component.conditional.when;
            const expectedValue = component.conditional.eq;
            const showWhenTrue = component.conditional.show; // true or false

            const actualValue = formValues[whenKey];
            const compInstance = formio.webform?.getComponent(component.key);
            let stringActualvalue = String(actualValue)
            if (compInstance && compInstance.element) {
              //  Decide visibility based on condition
              const conditionMatched = String(stringActualvalue) === String(expectedValue);

              // Agar "show" true hai aur condition match hui → visible, else hidden
              const shouldShow = showWhenTrue ? conditionMatched : !conditionMatched;

              //  Apply visibility directly on the field wrapper
              compInstance.element.style.display = shouldShow ? '' : 'none';
              // compInstance.visible = shouldShow;
            }
          }

          // Nested components handle karo
          if (Array.isArray(component.components)) {
            component.components.forEach((child: any) => checkConditional(child));
          }
        };

        const allComponents = formio.schema?.components || [];
        allComponents.forEach((c: any) => checkConditional(c));
      });







      // =====================================================
    });
  }
}
