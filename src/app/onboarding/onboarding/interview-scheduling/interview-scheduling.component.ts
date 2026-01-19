import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicFieldsSharingService } from '../../../shared/services/dynamic-fields-sharing.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { InterviewSchedulingDto } from '../../../shared/dtos/Dto';

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

  // ...existing code for dropdown options...

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
    this.dynamicFieldsService.loadDynamicFields('INTERVIEW_SCHEDULING', 'USER_DEFINED', [])
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
  toggleCandidateDropdown(event: Event): void {
    event.stopPropagation();
    this.isCandidateDropdownOpen = !this.isCandidateDropdownOpen;
    // Close other dropdowns
    this.isLocationDropdownOpen = false;
    this.isInterviewerDropdownOpen = false;
    this.isStatusDropdownOpen = false;
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
    this.interview.selectedCandidate = `${candidate.name} (${candidate.id})`;
    this.isCandidateDropdownOpen = false;
  }

  selectLocation(location: string, event: Event): void {
    event.stopPropagation();
    this.interview.selectedLocation = location;
    this.isLocationDropdownOpen = false;
    
    // Auto-set meeting URL if virtual location selected
    if (location.includes('Virtual')) {
      if (location.includes('Google Meet')) {
        this.interview.meetingURL = 'https://meet.google.com/';
      } else if (location.includes('Zoom')) {
        this.interview.meetingURL = 'https://zoom.us/j/';
      }
    }
  }

  selectInterviewer(interviewer: any, event: Event): void {
    event.stopPropagation();
    this.interview.selectedInterviewer = interviewer.name;
    this.isInterviewerDropdownOpen = false;
  }

  selectStatus(status: string, event: Event): void {
    event.stopPropagation();
    this.interview.selectedStatus = status;
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
    const completeData = this.dynamicFieldsService.getCompleteFormData(this.interview);
    
    this.loader.show();
    // API call to save data
    // this.api.saveFormData('INTERVIEW_SCHEDULING', completeData).subscribe({
    //   next: (res: any) => {
    //     this.toastr.success('Interview scheduled successfully');
    //     this.loader.hide();
    //     this.router.navigate(['/panel/onboarding/candidates']);
    //   },
    //   error: (err: any) => {
    //     console.error('Error saving interview:', err);
    //     this.toastr.error('Failed to schedule interview');
    //     this.loader.hide();
    //   }
    // });
    
    // For now just show success
    setTimeout(() => {
      this.toastr.success('Interview scheduled successfully');
      this.loader.hide();
    }, 1000);
  }

  onCancel(): void {
    this.router.navigate(['/panel']); 
  }
}