import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from 'formiojs';
import { Components } from 'formiojs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild('builder', { static: true }) builderRef!: ElementRef;
  builder: any;
  sectionCount = 1;
  constructor(private toastr: ToastrService) { }
  // defaultFormJson = {
  //   display: 'form',
  //   components: [] 
  // };
  defaultFormJson = { display: 'form', components: [{ type: 'textfield', key: 'firstName', label: 'First Name', placeholder: 'Enter first name', input: true }, { type: 'textfield', key: 'lastName', label: 'Last Name', placeholder: 'Enter last name', input: true }, { type: 'email', key: 'email', label: 'Email', placeholder: 'Enter email', input: true }, { type: 'password', key: 'password', label: 'Password', placeholder: 'Enter password', input: true }, { type: 'checkbox', key: 'subscribe', label: 'Subscribe to newsletter', input: true }, { type: 'radio', key: 'gender', label: 'Gender', values: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }], input: true }] };
  ngOnInit() {
    // left side inputs options customization

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


    // Customize edit form for textfield component by single component

    // Components.components.textfield.editForm = () => {
    //   return {
    //     components: [
    //       {
    //         key: 'display',
    //         components: [
    //           { key: 'label', type: 'textfield', label: 'Label', input: true },
    //           { key: 'key', type: 'textfield', label: 'Key', input: true },
    //           { key: 'placeholder', type: 'textfield', label: 'Placeholder', input: true },
    //           { key: 'hidden', type: 'checkbox', label: 'Hidden Field', input: true },
    //         ]
    //       },
    //       {
    //         key: 'validation',
    //         components: [
    //           { key: 'validate.required', type: 'checkbox', label: 'Required', input: true },
    //           { key: 'validate.minLength', type: 'number', label: 'Min Length', input: true },
    //           { key: 'validate.maxLength', type: 'number', label: 'Max Length', input: true },
    //         ]
    //       }
    //     ]
    //   };
    // };


    // Customize edit form for all components dynamically

    //     Object.keys(Components.components).forEach((key) => {
    //   const comp = (Components.components as any)[key]; // ✅ type assertion

    //   if (comp && comp.editForm) {
    //     comp.editForm = () => ({
    //       components: [
    //         {
    //           key: 'display',
    //           components: [
    //             { key: 'label', type: 'textfield', label: 'title', input: true },
    //             { key: 'key', type: 'textfield', label: 'Key', input: true },
    //             { key: 'placeholder', type: 'textfield', label: 'Placeholder', input: true },
    //             { key: 'hidden', type: 'checkbox', label: 'Hidden Field', input: true },
    //           ]
    //         },
    //         {
    //           key: 'validation',
    //           components: [
    //             { key: 'validate.required', type: 'checkbox', label: 'Required', input: true },
    //             { key: 'validate.minLength', type: 'number', label: 'Min Length', input: true },
    //             { key: 'validate.maxLength', type: 'number', label: 'Max Length', input: true },
    //           ]
    //         }
    //       ]
    //     });
    //   }
    // });

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
    
    localStorage.setItem('savedForm', JSON.stringify(this.builder.instance.schema));
    console.log('🚀 Final Form JSON:', this.builder.instance.schema);
    this.toastr.success('Data saved successfully!', 'Success');
  }



}
