import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicFieldsSharingService } from '../../../../shared/services/dynamic-fields-sharing.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { InterviewSchedulingDto, LookupDto } from '../../../../shared/dtos/Dto';
import { ApiService } from '../../../../shared/services/apis/api.service';

@Component({
  selector: 'app-interview-scheduling',
  templateUrl: './interview-scheduling.component.html',
  styleUrls: ['./interview-scheduling.component.scss']
})
export class InterviewSchedulingComponent implements OnInit {
  // Form Fields as DTO
  interview: InterviewSchedulingDto = new InterviewSchedulingDto();

  // Dropdown States
  isCandidateDropdownOpen: boolean = false;
  isLocationDropdownOpen: boolean = false;
  isInterviewerDropdownOpen: boolean = false;
  isStatusDropdownOpen: boolean = false;

  // Backend field management - for static fields visibility
  backendFieldsMap: Record<string, boolean> = {};
  fieldConfigMap: Record<string, any> = {};

  // Display values for dropdowns
  selectedInterviewerDisplay: string = '';
  selectedCandidate: string = ''
  // Dropdown Options
  candidateOptions: any[] = [];

  locationOptions: string[] = [];

  interviewerOptions: any[] = [
    { id: 'CURRENT_USER', name: 'Current User', department: 'Admin' },

  ];

  statusOptions: string[] = [];

  // ...existing code for dropdown options...

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
    this.dynamicFieldsService.loadDynamicFields('INTERVIEW', 'USER_DEFINED', [])
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

  // Dropdown Handlers
  toggleCandidateDropdown(event: Event, field: string): void {
    event.stopPropagation();
    this.isCandidateDropdownOpen = !this.isCandidateDropdownOpen;
    // Close other dropdowns
    this.isLocationDropdownOpen = false;
    this.isInterviewerDropdownOpen = false;
    this.isStatusDropdownOpen = false;
    if (field === 'candidate') {
      this.fetchLookupOptionsWhenLokupTypeForm('candidate')

    }
  }

  toggleLocationDropdown(event: Event): void {
    event.stopPropagation();
    this.isLocationDropdownOpen = !this.isLocationDropdownOpen;
    // Close other dropdowns
    this.isCandidateDropdownOpen = false;
    this.isInterviewerDropdownOpen = false;
    this.isStatusDropdownOpen = false;
  }

  toggleInterviewerDropdown(event: Event): void {
    event.stopPropagation();
    this.isInterviewerDropdownOpen = !this.isInterviewerDropdownOpen;
    // Close other dropdowns
    this.isCandidateDropdownOpen = false;
    this.isLocationDropdownOpen = false;
    this.isStatusDropdownOpen = false;
  }

  toggleStatusDropdown(event: Event): void {
    event.stopPropagation();
    this.isStatusDropdownOpen = !this.isStatusDropdownOpen;
    // Close other dropdowns
    this.isCandidateDropdownOpen = false;
    this.isLocationDropdownOpen = false;
    this.isInterviewerDropdownOpen = false;
  }

  // Selection Handlers
  selectCandidate(candidate: any, event: Event): void {
    event.stopPropagation();
    this.selectedCandidate = candidate.summary || candidate.name;
    this.interview.candidate = candidate.code;
    this.isCandidateDropdownOpen = false;
  }

  selectLocation(location: string, event: Event): void {
    event.stopPropagation();
    this.interview.location = location;
    this.isLocationDropdownOpen = false;

    // Auto-set meeting URL if virtual location selected
    if (location.includes('Virtual')) {
      if (location.includes('Google Meet')) {
        this.interview.meeting_url = 'https://meet.google.com/';
      } else if (location.includes('Zoom')) {
        this.interview.meeting_url = 'https://zoom.us/j/';
      }
    }
  }

  selectInterviewer(interviewer: any, event: Event): void {
    event.stopPropagation();
    (this.interview as any).interviewer_user = interviewer.name;
    this.selectedInterviewerDisplay = interviewer.name;
    this.isInterviewerDropdownOpen = false;
  }

  selectStatus(status: string, event: Event): void {
    event.stopPropagation();
    this.interview.interview_status = status;
    this.isStatusDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeAllDropdowns(event: Event): void {
    this.isCandidateDropdownOpen = false;
    this.isLocationDropdownOpen = false;
    this.isInterviewerDropdownOpen = false;
    this.isStatusDropdownOpen = false;
    this.dynamicFieldsService.closeAllDropdowns();
  }

  // Set active tab
  setActiveTab(tabId: number): void {
    this.activeTabId = tabId;
    this.dynamicFieldsService.setActiveTab(tabId);
  }

  // Save interview scheduling data
  saveInterview(): void {


      if (
    !this.interview.candidate ||
    !this.interview.interview_date ||
    !this.interview.start_time ||
    !this.interview.location ||
    !this.interview.interview_status 
  
  ) {
    this.toastr.warning('Please fill all required fields');
    return;
  }
    // Remove interviewer if its source is 'current user'
    if (this.fieldConfigMap['interviewer_user']?.source === 'CURRENT_USER') {
      delete (this.interview as any).interviewer_user;
    }

    // Format start_time to HH:mm:ss if it exists and is in HH:mm format
    if (this.interview.start_time && this.interview.start_time.length === 5) {
      this.interview.start_time = this.interview.start_time + ':00';
    }

    const completeData = this.dynamicFieldsService.getCompleteFormData(this.interview);

    this.loader.show();
    // API call to save data
    this.api.saveFormData('INTERVIEW', completeData).subscribe({
      next: (res: any) => {
        this.toastr.success('Interview scheduled successfully');
        this.loader.hide();
        this.router.navigate(['/panel/onboarding/candidates']);
      },
      error: (err: any) => {
        console.error('Error saving interview:', err);
        this.toastr.error('Failed to schedule interview');
        this.loader.hide();
      }
    });

    // For now just show success
    setTimeout(() => {
      this.toastr.success('Interview scheduled successfully');
      this.loader.hide();
    }, 1000);
  }

  onCancel(): void {
    this.router.navigate(['/panel']);
  }

  getFormFileds() {
    this.api.getFormByFormCode('INTERVIEW').subscribe({
      next: (res: any) => {
        console.log('Form Fields:', res);

        // safety check
        if (res?.data?.fields && Array.isArray(res.data.fields)) {
          res.data.fields.forEach((field: any) => {
            this.backendFieldsMap[field.fieldCode] = field.active;            // Store field config including source
            if (field.fieldConfig) {
              this.fieldConfigMap[field.fieldCode] = field.fieldConfig;
            }
            if (field.fieldCode === 'location') {
              this.locationOptions = field.enumValues || [];
            }
            if (field.fieldCode === 'interview_status') {
              this.statusOptions = field.enumValues || [];
            }
            if (field.fieldCode === 'is_active') {
              this.interview['is_active'] = true;
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
        if (fieldCode === 'candidate') {
          this.candidateOptions = data;
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
        if (fieldCode === 'candidate') {
          this.candidateOptions = data;
        }


      },
      error: (err: any) => {
        console.error(`Error fetching lookup options for ${fieldCode}:`, err);
      }
    });
  }
}