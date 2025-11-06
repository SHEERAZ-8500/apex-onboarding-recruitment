import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from 'formiojs';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild('builder', { static: true }) builderRef!: ElementRef;
  builder: any;
  defaultFormJson = {
    display: 'form',
    components: [
      {
        type: 'textfield',
        key: 'firstName',
        label: 'First Name',
        placeholder: 'Enter first name',
        input: true
      },
      {
        type: 'textfield',
        key: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter last name',
        input: true
      },
      {
        type: 'email',
        key: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        input: true
      },
      {
        type: 'password',
        key: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        input: true
      },
      {
        type: 'checkbox',
        key: 'subscribe',
        label: 'Subscribe to newsletter',
        input: true
      },
      {
        type: 'radio',
        key: 'gender',
        label: 'Gender',
        values: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ],
        input: true
      }
    ]
  };
  ngOnInit() {

    this.builder = new FormBuilder(
      this.builderRef.nativeElement,
      // { display: 'form' },  
      this.defaultFormJson, 
      {}                   
    );

    
    this.builder.ready.then(() => {
      console.log('✅ Builder loaded successfully');
    });

    this.builder.instance.on('saveComponent', () => {
      console.log('🧩 Component added or updated');
      this.logCurrentFormJson();
    });
  }

  logCurrentFormJson() {
    const json = this.builder.instance.schema;
    console.log('🧾 Current Form JSON:', json);
  }

  onSubmit() {
    const json = this.builder.instance.schema;
    console.log('🚀 Final Form JSON to Send:', json);
  }
}
