import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-create-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {

  // Section-wise candidate data
  candidate: any = {
    id: null,
    firstName: '',
    lastName: '',
    requisition: '',
    email: '',
    contact1: '',
    contact2: '',
    applicationDate: null,
    department: '',
    designation: '',
    dob: null,
    expectedDOJ: null,
    gender: '',
    linkedIn: '',
    religion: '',
    country: '',
    city: '',
    category: '',
    onboardingStatus: '',
    candidateStatus: '',
    remarks: '',

    // Company Details
    companyName: '',
    companyFrom: null,
    companyTo: null,
    position: '',
    lastSalary: null,
    companyRemarks: '',

    // Skills
    skillName: '',
    skillRating: '',
    skillRemarks: '',

    // Qualification
    qualificationName: '',
    passingYear: '',
    institute: '',
    grade: '',
    qualificationRemarks: '',

    // Attachments
    attachmentId: '',
    fileName: '',
    attachmentRemarks: ''
  };

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
    this.candidate[field] = value;
    this.activeDropdown = ''; // Close dropdown
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    this.activeDropdown = '';
  }





}
