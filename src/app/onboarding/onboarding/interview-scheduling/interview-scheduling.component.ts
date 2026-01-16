import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interview-scheduling',
  templateUrl: './interview-scheduling.component.html',
  styleUrls: ['./interview-scheduling.component.scss']
})
export class InterviewSchedulingComponent {
  // Form Fields
  interviewDate: string = '';
  interviewStartTime: string = '';
  selectedLocation: string = '';
  meetingURL: string = '';
  selectedInterviewer: string = '';
  selectedStatus: string = '';
  remarks: string = '';
  interviewRemarks: string = '';
  selectedCandidate: string = '';

  // Dropdown States
  isCandidateDropdownOpen: boolean = false;
  isLocationDropdownOpen: boolean = false;
  isInterviewerDropdownOpen: boolean = false;
  isStatusDropdownOpen: boolean = false;

  // Dropdown Options
  candidateOptions: any[] = [
    { id: 'CAND001', name: 'John Doe' },
    { id: 'CAND002', name: 'Jane Smith' },
    { id: 'CAND003', name: 'Robert Johnson' },
    { id: 'CAND004', name: 'Emily Davis' },
    { id: 'CAND005', name: 'Michael Wilson' }
  ];

  locationOptions: string[] = [
    'Office - Floor 5',
    'Office - Conference Room A',
    'Office - Conference Room B',
    'Virtual - Google Meet',
    'Virtual - Zoom',
    'Client Office'
  ];

  interviewerOptions: any[] = [
    { id: 'INT001', name: 'Sarah Williams', department: 'HR' },
    { id: 'INT002', name: 'David Brown', department: 'Technical' },
    { id: 'INT003', name: 'Lisa Taylor', department: 'Management' },
    { id: 'INT004', name: 'Kevin Miller', department: 'Technical' },
    { id: 'INT005', name: 'Amanda Clark', department: 'HR' }
  ];

  statusOptions: string[] = [
    'Scheduled',
    'Completed',
    'Cancelled',
    'Rescheduled',
    'No Show',
    'In Progress'
  ];



 

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
    this.selectedCandidate = `${candidate.name} (${candidate.id})`;
    this.isCandidateDropdownOpen = false;
  }

  selectLocation(location: string, event: Event): void {
    event.stopPropagation();
    this.selectedLocation = location;
    this.isLocationDropdownOpen = false;
    
    // Auto-set meeting URL if virtual location selected
    if (location.includes('Virtual')) {
      if (location.includes('Google Meet')) {
        this.meetingURL = 'https://meet.google.com/';
      } else if (location.includes('Zoom')) {
        this.meetingURL = 'https://zoom.us/j/';
      }
    }
  }

  selectInterviewer(interviewer: any, event: Event): void {
    event.stopPropagation();
    this.selectedInterviewer = interviewer.name;
    this.isInterviewerDropdownOpen = false;
  }

  selectStatus(status: string, event: Event): void {
    event.stopPropagation();
    this.selectedStatus = status;
    this.isStatusDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeAllDropdowns(event: Event): void {
    this.isCandidateDropdownOpen = false;
    this.isLocationDropdownOpen = false;
    this.isInterviewerDropdownOpen = false;
    this.isStatusDropdownOpen = false;
  }

 
  }

