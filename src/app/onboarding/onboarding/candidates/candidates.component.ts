import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFieldsSharingService } from '../../../shared/services/dynamic-fields-sharing.service';
import { CandidateDto } from '../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-create-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  // Section-wise candidate data
  candidate: CandidateDto = new CandidateDto();

  // Dropdown state
  activeDropdown: string = '';

  // Dropdown options
  requisitions: string[] = ['Req-101', 'Req-102', 'Req-103'];
  departments: string[] = ['IT', 'HR', 'Finance', 'Marketing'];
  designations: string[] = ['Manager', 'Developer', 'Analyst', 'Intern'];
  hiringManagers: string[] = ['John Doe', 'Jane Smith', 'Alice Johnson'];
  skillRatings: string[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  genders: string[] = ['Male', 'Female', 'Other'];
  countries: string[] = ['USA', 'Pakistan', 'India', 'UK'];
  cities: string[] = ['New York', 'Lahore', 'Mumbai', 'London'];
  categories: string[] = ['General', 'OBC', 'SC', 'ST'];
  onboardingStatuses: string[] = ['Pending', 'Completed', 'Rejected'];
  candidateStatuses: string[] = ['New', 'In Process', 'Hired', 'Rejected'];

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
    event.stopPropagation(); // Prevent document click from closing
    if (this.activeDropdown === field) {
      this.activeDropdown = ''; // Close if already open
    } else {
      this.activeDropdown = field; // Open selected
    }
  }

  // Select option from dropdown
  selectOption(field: string, value: any, event: Event): void {
    event.stopPropagation();
    (this.candidate as any)[field] = value;
    this.activeDropdown = ''; // Close dropdown
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
  saveCandidate(): void {
    const completeData = this.dynamicFieldsService.getCompleteFormData(this.candidate);
    
    this.loader.show();
    // API call to save data
    // this.api.saveFormData('CANDIDATE_FORM', completeData).subscribe({
    //   next: (res: any) => {
    //     this.toastr.success('Candidate data saved successfully');
    //     this.loader.hide();
    //     this.router.navigate(['/panel/onboarding/candidates']);
    //   },
    //   error: (err: any) => {
    //     console.error('Error saving candidate data:', err);
    //     this.toastr.error('Failed to save candidate data');
    //     this.loader.hide();
    //   }
    // });
    
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
