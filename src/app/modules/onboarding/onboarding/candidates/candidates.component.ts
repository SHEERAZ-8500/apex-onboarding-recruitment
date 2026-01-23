import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFieldsSharingService } from '../../../../shared/services/dynamic-fields-sharing.service';
import { CandidateDto, LookupDto, LookupDtoWhenTypeForm } from '../../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../shared/services/loader.service';
import { ApiService } from '../../../../shared/services/apis/api.service';

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

  // Backend field management - for static fields visibility
  backendFieldsMap: Record<string, boolean> = {};

  // Dropdown options
  requisitions: string[] = ['Req-101', 'Req-102', 'Req-103'];
  departments: string[] = ['IT', 'HR', 'Finance', 'Marketing'];
  designations: string[] = ['Manager', 'Developer', 'Analyst', 'Intern'];
  hiringManagers: string[] = ['John Doe', 'Jane Smith', 'Alice Johnson'];
  // genders: string[] = ['Male', 'Female', 'Other'];
  countries: string[] = ['USA', 'Pakistan', 'India', 'UK'];
  cities: string[] = ['New York', 'Lahore', 'Mumbai', 'London'];
  categories: string[] = ['General', 'OBC', 'SC', 'ST'];
  onboardingStatuses: string[] = ['Pending', 'Completed', 'Rejected'];
  candidateStatuses: string[] = ['New', 'In Process', 'Hired', 'Rejected'];
  genderEnumArray = []
  candidateEnumArray = []
  onboardingStatusEnumArray = []
  requsitionDropDownValue: LookupDtoWhenTypeForm[] = [];
  departmentDropDownValue: LookupDto[] = [];
  designationDropDownValue: LookupDto[] = [];
  requisitionDisplayValue: string = '';
  religionEnumArray = []
  selectedDesignationDisplay: string = '';
  // Sidebar Tabs Data
  sidebarTabs: any[] = [];
  activeTabId: number = 1;

  constructor(
    private router: Router,
    public dynamicFieldsService: DynamicFieldsSharingService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getFormFileds();

    // Load dynamic fields and tabs
    this.loader.show();
    this.dynamicFieldsService.loadDynamicFields('CANDIDATE', 'USER_DEFINED', [])
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
    if (field === 'requisition') {
      this.fetchLookupOptionsWhenLokupTypeForm('job_requisition');
    }
    if (field === 'department') {
      this.fetchLookupOptions('department');
    }
    if (field === 'designation') {
      this.fetchLookupOptions('designation');
    }
  }

  // Select option from dropdown
  selectOption(field: string, value: any, event: Event): void {
    event.stopPropagation();

    if (field === 'requisition' && value.code) {
      // For requisition, store code and display summary
      this.candidate.requisition = value.code;
      this.requisitionDisplayValue = value.summary;
    } else if (field === 'designation') {
      this.candidate.designation = value.code;
      this.selectedDesignationDisplay = value.name;
    } else {
      (this.candidate as any)[field] = value;
    }

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

    
  if (
    !this.candidate.code ||
    !this.candidate.first_name ||
    !this.candidate.last_name ||
    !this.candidate.requisition
  ) {
    this.toastr.warning('Please fill all required fields');
    return;
  }


    delete (this.candidate as any).designation;
    delete (this.candidate as any).category;
    delete (this.candidate as any).remarks;



    const completeData = this.dynamicFieldsService.getCompleteFormData(this.candidate);

    this.loader.show();

    // API call to save data
    this.api.saveFormData('CANDIDATE', completeData).subscribe({
      next: (res: any) => {
        this.toastr.success('Candidate data saved successfully');
        this.loader.hide();
        this.router.navigate(['/panel/onboarding/candidates']);
      },
      error: (err: any) => {
        console.error('Error saving candidate data:', err);
        this.toastr.error('Failed to save candidate data');
        this.loader.hide();
      }
    });

    // For now just show success

  }

  onCancel(): void {
    this.router.navigate(['/panel']);
  }
  getFormFileds() {
    this.api.getFormByFormCode('CANDIDATE').subscribe({
      next: (res: any) => {
        console.log('Form Fields:', res);

        // safety check
        if (res?.data?.fields && Array.isArray(res.data.fields)) {
          res.data.fields.forEach((field: any) => {
            this.backendFieldsMap[field.fieldCode] = field.active;
            if (field.fieldCode === 'gender') {
              this.genderEnumArray = field.enumValues || [];
            }
            if (field.fieldCode === 'status') {
              this.candidateEnumArray = field.enumValues || [];
            }
            if (field.fieldCode === 'onboarding_status') {
              this.onboardingStatusEnumArray = field.enumValues || [];
            }
            if (field.fieldCode === 'religion') {
              this.religionEnumArray = field.enumValues || [];
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
          this.departmentDropDownValue = data;
        }
        if (fieldCode === 'designation') {
          this.designationDropDownValue = data;
        }

      },
      error: (err: any) => {
        console.error(`Error fetching lookup options for ${fieldCode}:`, err);
      }
    });
  }
  fetchLookupOptionsWhenLokupTypeForm(fieldCode: string): void {
    this.api.getLokupTableByCodeWithFormType(fieldCode).subscribe({
      next: (res: any) => {

        let data = res?.data || [];
        if (fieldCode === 'job_requisition') {
          this.requsitionDropDownValue = data;
        }


      },
      error: (err: any) => {
        console.error(`Error fetching lookup options for ${fieldCode}:`, err);
      }
    });
  }

}
