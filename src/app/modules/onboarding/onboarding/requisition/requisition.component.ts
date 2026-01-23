import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFieldsSharingService } from '../../../../shared/services/dynamic-fields-sharing.service';
import { LookupDto, RequisitionDto } from '../../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../shared/services/loader.service';
import { ApiService } from '../../../../shared/services/apis/api.service';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {
  // Form fields as DTO
  requisition: RequisitionDto = new RequisitionDto();

  // Dropdown state
  activeDropdown: string = '';

  // Dropdown options
  departments: LookupDto[] = [];
  jobTitles: LookupDto[] = [];
  designations: LookupDto[] = [];
  hiringManagers = ['Alice', 'Bob', 'Charlie'];
  backendFieldsMap: Record<string, boolean> = {};
  fieldConfigMap: Record<string, any> = {};
  lookupFields = ['job_title', 'designation', 'department']
  loadedLookups: Record<string, boolean> = {};
  // Sidebar Tabs Data
  sidebarTabs: any[] = [];
  activeTabId: number = 1;
  departMentDropDownValue: string = '';
  jobTitleDropDownValue: string = '';
  designationDropDownValue: string = '';
  hiringManagerDropDownValue: string = '';
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
    this.dynamicFieldsService.loadDynamicFields('JOB_REQUISITION', 'USER_DEFINED', [])
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

  selectOption(field: string, value: LookupDto, event: Event) {
    event.stopPropagation();
    if (field === 'department') this.departMentDropDownValue = value.name;
    if (field === 'job_title') this.jobTitleDropDownValue = value.name;
    if (field === 'designation') this.designationDropDownValue = value.name;
    if (field === 'hiring_manager') this.hiringManagerDropDownValue = value.name;

    (this.requisition as any)[field] = value.code;
    this.activeDropdown = '';
  }
  selectHiringManager(field: string, value: string, event: Event) {
    
    if (field === 'hiring_manager') this.hiringManagerDropDownValue = value;

    (this.requisition as any)[field] = value;
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
    // Remove hiring_manager if its source is 'current user'
    if (this.fieldConfigMap['hiring_manager']?.source === 'CURRENT_USER') {
      delete (this.requisition as any).hiring_manager;
    }
    
    const completeData = this.dynamicFieldsService.getCompleteFormData(this.requisition);
    // console.log('Saving Requisition Data:', completeData);
    this.loader.show();
    // API call to save data
    this.api.saveFormData('JOB_REQUISITION', completeData).subscribe({
      next: (res: any) => {
        this.toastr.success('Requisition saved successfully');
        this.loader.hide();
        // Reset form after successful save
        this.resetForm();
        this.router.navigate(['/panel/onboarding/requisition']);
      },
      error: (err: any) => {
        console.error('Error saving requisition:', err);
        this.toastr.error('Failed to save requisition');
        this.loader.hide();
      }
    });


  }

  onCancel(): void {
    this.router.navigate(['/panel']);
  }

  getFormFileds() {
    this.api.getFormByFormCode('JOB_REQUISITION').subscribe({
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
    this.api.getLokupTableByCode(fieldCode).subscribe({
      next: (res: any) => {
        let data: LookupDto[] = res?.data || [];
        if (fieldCode === 'department') {
          this.departments = data;
        }
         if (fieldCode === 'job_title') {
          this.jobTitles = data;
        }
         if (fieldCode === 'designation') {
          this.designations = data;
        }

      },
      error: (err: any) => {
        console.error(`Error fetching lookup options for ${fieldCode}:`, err);
      }
    });
  }

  resetForm(): void {
    // Reset requisition object
    this.requisition = new RequisitionDto();
    // Reset dropdown display values
    this.departMentDropDownValue = '';
    this.jobTitleDropDownValue = '';
    this.designationDropDownValue = '';
    this.hiringManagerDropDownValue = '';
    // Reset loaded lookups to allow fresh fetch on next form
    this.loadedLookups = {};
    // Reset dynamic fields
    this.dynamicFieldsService.resetDynamicFields();
  }
}
