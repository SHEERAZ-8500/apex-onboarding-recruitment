import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule
  ],
  exports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule
  ]
})
export class SahringModule { }
