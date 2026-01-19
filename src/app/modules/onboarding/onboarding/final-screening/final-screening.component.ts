import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinalScreeningFormDto } from '../../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../shared/services/loader.service';
import { DynamicFieldsSharingService } from '../../../../shared/services/dynamic-fields-sharing.service';

@Component({
  selector: 'app-final-screening',
  templateUrl: './final-screening.component.html',
  styleUrls: ['./final-screening.component.scss']
})
export class FinalScreeningComponent implements OnInit {

  finalScreening: FinalScreeningFormDto = new FinalScreeningFormDto();


  // Dropdown state
  activeDropdown: string = '';

  // Dropdown options
  candidateIds: string[] = ['CAN-001', 'CAN-002', 'CAN-003', 'CAN-004'];
  requisitions: string[] = ['REQ-2024-001', 'REQ-2024-002', 'REQ-2024-003'];
  interviewerStatuses: string[] = ['Scheduled', 'Completed', 'Rescheduled', 'Cancelled'];
  interviewerNames: string[] = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'];
  finalStatuses: string[] = ['Selected', 'Rejected', 'On Hold', 'Pending'];
  payElements: string[] = ['Basic Salary', 'HRA', 'Allowance', 'Bonus', 'Provident Fund'];
  payFrequencies: string[] = ['Monthly', 'Bi-Monthly', 'Weekly', 'Yearly'];

  // Sidebar Tabs Data
  sidebarTabs: any[] = [];
  activeTabId: number = 1;

  constructor(private router: Router, public dynamicFieldsService: DynamicFieldsSharingService,
    private toastr: ToastrService,
    private loader: LoaderService) { }


  ngOnInit(): void {
    this.loader.show();
    this.dynamicFieldsService.loadDynamicFields('EMPLOYEE_REQUISITION', 'USER_DEFINED', [])
      .then(() => {
        // Get tabs from service
        this.sidebarTabs = this.dynamicFieldsService.sidebarTabs;
        this.activeTabId = this.dynamicFieldsService.activeTabId;
        this.loader.hide();
      })
      .catch((err) => {
        console.error('Error loading dynamic fields:', err);
        this.toastr.error('Failed to load dynamic fields');
        this.loader.hide();
      });
  }

  // Toggle Dropdown open/close
  toggleDropdown(event: Event, field: string): void {
    event.stopPropagation();
    if (this.activeDropdown === field) {
      this.activeDropdown = '';
    } else {
      this.activeDropdown = field;
    }
  }

  // Select option from dropdown
  selectOption(field: string, value: any, event: Event): void {
    event.stopPropagation();
    (this.finalScreening as any)[field] = value;
    this.activeDropdown = '';
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    this.activeDropdown = '';
      this.dynamicFieldsService.closeAllDropdowns();
  }

  // Set active tab
  setActiveTab(tabId: number): void {
    this.activeTabId = tabId;
    this.dynamicFieldsService.setActiveTab(tabId);
  }

  // Save candidate data
  saveFinalScreening(): void {

    
    const completeData = this.dynamicFieldsService.getCompleteFormData(this.finalScreening);
    
    this.loader.show();
  
    
    // For now just show success
    setTimeout(() => {
      this.toastr.success('Candidate data saved successfully');
      this.loader.hide();
    }, 1000);
  }


  onCancel(): void {
    this.router.navigate(['/panel']);
  }



}