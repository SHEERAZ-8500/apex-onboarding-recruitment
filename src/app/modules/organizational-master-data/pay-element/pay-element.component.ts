import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFieldsSharingService } from '../../../../app/shared/services/dynamic-fields-sharing.service';
import {  PayElementDto} from '../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../app/shared/services/loader.service';
import { ApiService } from '../../../../app/shared/services/apis/api.service';

@Component({
  selector: 'app-pay-element-form',
  templateUrl: './pay-element.component.html',
  styleUrls: ['./pay-element.component.scss']
})
export class PayElementComponent implements OnInit {
  // Form fields as DTO
  payElement: PayElementDto = new PayElementDto();

  // Dropdown state
  activeDropdown: string = '';

  // Dropdown options

  backendFieldsMap: Record<string, boolean> = {};
  fieldConfigMap: Record<string, any> = {};
  lookupFields = ['type', 'element_type']
  loadedLookups: Record<string, boolean> = {};
  // Sidebar Tabs Data
  sidebarTabs: any[] = [];
  activeTabId: number = 1;
  typeDropDownValue: string = '';
  elementTypeDropDownValue: string = '';



type = [
  { name: 'Form' },
  { name: 'Layout' },
  { name: 'UI' }
];

elementTypes = [
  { name: 'Input' },
  { name: 'Button' },
  { name: 'Checkbox' },
  { name: 'Dropdown' }
];
  constructor(
    private router: Router,
    public dynamicFieldsService: DynamicFieldsSharingService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    // Load dynamic fields and tabs
    // this.loader.show();
    this.dynamicFieldsService.loadDynamicFields('PAY_ELEMENT', 'USER_DEFINED', [])
      .then(() => {
        // Get tabs from service
        this.sidebarTabs = this.dynamicFieldsService.sidebarTabs;
        this.activeTabId = this.dynamicFieldsService.activeTabId;
        console.log('sidebarTabs:', this.sidebarTabs);
        if (this.sidebarTabs.length > 1) {
          console.log('rowTableField:', this.sidebarTabs[1]?.rowTableField);
        }
        this.loader.hide();
      })
      .catch((err) => {
        console.error('Error loading dynamic fields:', err);
        this.toastr.error('Failed to load dynamic fields');
        this.loader.hide();
      });
    this.getFormFileds();



  }


  // Dropdown toggle
  toggleDropdown(event: Event, dropdownId: string) {
    event.stopPropagation();
    
    // Fetch lookup options on first click
    if (this.lookupFields.includes(dropdownId) && !this.loadedLookups[dropdownId]) {
      this.fetchLookupOptions(dropdownId);
      this.loadedLookups[dropdownId] = true;
    }
    
    this.activeDropdown = this.activeDropdown === dropdownId ? '' : dropdownId;
  }

  selectOption(field: string, value: any, event: Event) {
  event.stopPropagation();

  if (field === 'type') {
    this.typeDropDownValue = value.name;
    this.payElement.type = value.name;
  }

  if (field === 'element_type') {
    this.elementTypeDropDownValue = value.name;
    this.payElement.elementType = value.name;
  }

  this.activeDropdown = '';
}






  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event) {
    this.activeDropdown = '';
    this.dynamicFieldsService.closeAllDropdowns();
  }

  // Set active tab
  setActiveTab(tabId: number): void {
    this.activeTabId = tabId;
    this.dynamicFieldsService.setActiveTab(tabId);
  }

  // Save requisition data
  saveRequisition(): void {

     if (
    !this.payElement.code ||
    !this.payElement.type ||
    !this.payElement.elementType ||
    !this.payElement.amount ||
    !this.payElement.percentage
  ) {
    this.toastr.warning('Please fill all required fields');
    return;
  }
    // Remove hiring_manager if its source is 'current user'
    if (this.fieldConfigMap['hiring_manager']?.source === 'CURRENT_USER') {
      delete (this.payElement as any).hiring_manager;
    }
    
    const completeData = this.dynamicFieldsService.getCompleteFormData(this.payElement);
    // console.log('Saving Requisition Data:', completeData);
    this.loader.show();
    // API call to save data
    this.api.saveFormData('PAY_ELEMENT', completeData).subscribe({
      next: (res: any) => {
        this.toastr.success('Pay Element saved successfully');
        this.loader.hide();
        // Reset form after successful save
        this.resetForm();
        this.router.navigate(['/panel/onboarding/requisition']);
      },
      error: (err: any) => {
        console.error('Error saving pay element:', err);
        this.toastr.error('Failed to save pay element');
        this.loader.hide();
      }
    });


  }

  onCancel(): void {
    this.router.navigate(['/panel']);
  }

  getFormFileds() {
    this.api.getFormByFormCode('PAY-ELEMENT').subscribe({
      next: (res: any) => {
        console.log('Form Fields:', res);

        // safety check
        if (res?.data?.fields && Array.isArray(res.data.fields)) {
          res.data.fields.forEach((field: any) => {
            this.backendFieldsMap[field.fieldCode] = field.active;
            // Store field config including source
            if (field.fieldConfig) {
              this.fieldConfigMap[field.fieldCode] = field.fieldConfig;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error fetching form fields:', err);
      }
    });
  }


  isFieldActive(fieldCode: string): boolean {

    return this.backendFieldsMap[fieldCode] !== false;
  }

  fetchLookupOptions(fieldCode: string): void {
    // this.api.getLokupTableByCode(fieldCode).subscribe({
    //   next: (res: any) => {
    //     let data: LookupDto[] = res?.data || [];
    //     if (fieldCode === 'department') {
    //       this.departments = data;
    //     }
    //      if (fieldCode === 'job_title') {
    //       this.jobTitles = data;
    //     }
    //      if (fieldCode === 'designation') {
    //       this.designations = data;
    //     }

    //   },
    //   error: (err: any) => {
    //     console.error(`Error fetching lookup options for ${fieldCode}:`, err);
    //   }
    // });
  }

  resetForm(): void {
    // Reset pay element object
    this.payElement = new PayElementDto();
    // Reset dropdown display values
    this.typeDropDownValue = '';
    this.elementTypeDropDownValue = '';

    // Reset loaded lookups to allow fresh fetch on next form
    this.loadedLookups = {};
    // Reset dynamic fields
    this.dynamicFieldsService.resetDynamicFields();
  }
}
