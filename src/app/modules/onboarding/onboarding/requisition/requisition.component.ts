import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFieldsSharingService } from '../../../../shared/services/dynamic-fields-sharing.service';
import { RequisitionDto } from '../../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../shared/services/loader.service';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit{
  // Form fields as DTO
  requisition: RequisitionDto = new RequisitionDto();

  // Dropdown state
  activeDropdown: string = '';

  // Dropdown options
  departments = ['IT','HR','Finance','Sales'];
  jobTitles = ['Developer','Manager','Designer'];
  designations = ['Junior','Senior','Lead'];
  hiringManagers = ['Alice','Bob','Charlie'];

  // Sidebar Tabs Data
  sidebarTabs: any[] = [];
  activeTabId: number = 1;

  constructor(
    private router: Router,
    public dynamicFieldsService: DynamicFieldsSharingService,
    private toastr: ToastrService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    // Load dynamic fields and tabs
    this.loader.show();
    this.dynamicFieldsService.loadDynamicFields('EMPLOYEE_REQUISITION', 'USER_DEFINED', [])
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
  }


  // Dropdown toggle
  toggleDropdown(event: Event, dropdownId: string) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === dropdownId ? '' : dropdownId;
  }

  selectOption(field: string, value: string, event: Event) {
    event.stopPropagation();
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
    const completeData = this.dynamicFieldsService.getCompleteFormData(this.requisition);
    
    this.loader.show();
    // API call to save data
    // this.api.saveFormData('REQUISITION_FORM', completeData).subscribe({
    //   next: (res: any) => {
    //     this.toastr.success('Requisition saved successfully');
    //     this.loader.hide();
    //     this.router.navigate(['/panel/onboarding/requisition']);
    //   },
    //   error: (err: any) => {
    //     console.error('Error saving requisition:', err);
    //     this.toastr.error('Failed to save requisition');
    //     this.loader.hide();
    //   }
    // });
    
    // For now just show success
    setTimeout(() => {
      this.toastr.success('Requisition saved successfully');
      this.loader.hide();
    }, 1000);
  }

  onCancel(): void {
    this.router.navigate(['/panel']); 
  }
}
