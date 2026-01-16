import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent {
  // Form fields
  requisitionId!: number;
  requisitionName!: string;
  department!: string;
  jobTitle!: string;
  designation!: string;
  noOfEmployees!: number;
  requiredDate!: string;
  jobDescription!: string;
  hiringManager!: string;
  status: boolean = false;

  // Dropdown state
  activeDropdown: string = '';

  // Dropdown options
  departments = ['IT','HR','Finance','Sales'];
  jobTitles = ['Developer','Manager','Designer'];
  designations = ['Junior','Senior','Lead'];
  hiringManagers = ['Alice','Bob','Charlie'];

  // Dropdown toggle
  toggleDropdown(event: Event, dropdownId: string) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === dropdownId ? '' : dropdownId;
  }

  selectOption(field: string, value: string, event: Event) {
    event.stopPropagation();
    (this as any)[field] = value;
    this.activeDropdown = '';
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event) {
    this.activeDropdown = '';
  }
}
