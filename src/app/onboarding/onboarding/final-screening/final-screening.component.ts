import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-final-screening',
  templateUrl: './final-screening.component.html',
  styleUrls: ['./final-screening.component.scss']
})
export class FinalScreeningComponent  {

  // Candidate data model
  candidate: any = {
    // Candidate Info
    id: null,
    candidateId: '',
    
    // Basic Information
    firstName: '',
    lastName: '',
    requisition: '',
    email: '',
    contact1: '',
    contact2: '',
    
    // Interview Details
    interviewId: '',
    interviewDate: null,
    interviewTime: '',
    interviewerStatus: '',
    interviewerRemarks: '',
    interviewerName: '',
    
    // Final Decision
    finalStatus: '',
    finalRemarks: '',
    dateOfJoining: null,
    
    // Salary Details
    payElement: '',
    effectiveDate: null,
    payFrequency: '',
    amount: null,
    salaryRemarks: ''
  };

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
    this.candidate[field] = value;
    this.activeDropdown = '';
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    this.activeDropdown = '';
  }

 

 
  

}