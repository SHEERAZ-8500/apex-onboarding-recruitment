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

  ngOnInit() {

    this.builder = new FormBuilder(
      this.builderRef.nativeElement,
      { display: 'form' },  
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
