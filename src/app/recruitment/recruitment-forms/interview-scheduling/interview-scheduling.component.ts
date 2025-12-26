import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-interview-scheduling',
  templateUrl: './interview-scheduling.component.html',
  styleUrls: ['./interview-scheduling.component.scss']
})
export class InterviewSchedulingComponent {
    title = 'view';
  formTitle=""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        
        // set view mode loigc
      //  this.fetchSkills()
      }
      if  (this.title === 'edit'){
        this.formTitle="Edit Interview Scehdule"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Interview Scehdule"


      }
    });
  }

  // ✅ Date Configuration
  today = new Date();
  minDate = '1900-01-01';
  maxDate = '2099-12-31';

  // ✅ Filter Options (for the new filter dropdown)
  filterOptions = [
    { value: 'today', label: 'Today\'s Interviews' },
    { value: 'upcoming', label: 'Upcoming Interviews' },
    { value: 'past', label: 'Past Interviews' },
    { value: 'hr', label: 'HR Interviews' },
    { value: 'technical', label: 'Technical Interviews' },
    { value: 'manager', label: 'Managerial Interviews' }
  ];

  selectedFilter = '';

  // ✅ Dropdown Options
  dropdownOptions = {
    requisitionIds: [
      'REQ-1001',
      'REQ-1002',
      'REQ-1003',
      'REQ-1004',
      'REQ-1005',
      'REQ-1006',
      'REQ-1007'
    ],
    
    locations: [
      'Head Office - Mumbai',
      'Branch Office - Delhi',
      'Branch Office - Bangalore',
      'Branch Office - Hyderabad',
      'Branch Office - Chennai',
      'Remote - Work from Home'
    ],
    
    interviewers: [
      'John Smith - HR Manager',
      'Sarah Johnson - Technical Lead',
      'Mike Williams - Project Manager',
      'Emily Davis - Senior Developer',
      'Robert Brown - Team Lead',
      'Lisa Wilson - HR Executive',
      'David Miller - Technical Architect',
      'Jennifer Taylor - Recruiter'
    ]
  };
   fetchInterviews() {
    return this.interviews;
  }

  // ✅ Interviews Data
  interviews = [
    {
      interviewCode: 'INT-2024-001',
      requisitionId: 'REQ-1001',
      assignedLocation: 'Head Office - Mumbai',
      interviewDescription: 'Java Developer Technical Round',
      date: '2024-03-15',
      interviewerName: 'Sarah Johnson - Technical Lead',
      interviewFromTime: '09:00',
      interviewToTime: '17:00',
      perCandidateAvgTime: 45
    },
    {
      interviewCode: 'INT-2024-002',
      requisitionId: 'REQ-1002',
      assignedLocation: 'Branch Office - Delhi',
      interviewDescription: 'Project Manager HR Round',
      date: '2024-03-16',
      interviewerName: 'John Smith - HR Manager',
      interviewFromTime: '10:00',
      interviewToTime: '13:00',
      perCandidateAvgTime: 30
    },
    {
      interviewCode: 'INT-2024-003',
      requisitionId: 'REQ-1003',
      assignedLocation: 'Remote - Work from Home',
      interviewDescription: 'DevOps Engineer Technical Assessment',
      date: '2024-03-17',
      interviewerName: 'David Miller - Technical Architect',
      interviewFromTime: '14:00',
      interviewToTime: '16:00',
      perCandidateAvgTime: 60
    },
    {
      interviewCode: 'INT-2024-004',
      requisitionId: 'REQ-1004',
      assignedLocation: 'Branch Office - Bangalore',
      interviewDescription: 'Business Analyst Interview',
      date: '2024-03-18',
      interviewerName: 'Emily Davis - Senior Developer',
      interviewFromTime: '11:00',
      interviewToTime: '15:00',
      perCandidateAvgTime: 40
    },
    {
      interviewCode: 'INT-2024-005',
      requisitionId: 'REQ-1005',
      assignedLocation: 'Head Office - Mumbai',
      interviewDescription: 'QA Engineer Technical Round',
      date: '2024-03-19',
      interviewerName: 'Robert Brown - Team Lead',
      interviewFromTime: '09:30',
      interviewToTime: '12:30',
      perCandidateAvgTime: 50
    }
  ];

  // ✅ Form Fields
  interviewCode = '';
  requisitionId = '';
  assignedLocation = '';
  interviewDescription = '';
  date = '';
  interviewerName = '';
  interviewFromTime = '';
  interviewToTime = '';
  perCandidateAvgTime: number | null = null;

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredInterviews().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    const total = this.totalPages;

    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (this.currentPage === 1) return [1, 2, 3];
    if (this.currentPage === total) return [total - 2, total - 1, total];

    return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
  }

  // ✅ Helper Methods
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
  }

  // Validate time slots
  validateTimeSlots(): boolean {
    if (!this.interviewFromTime || !this.interviewToTime) return true;
    
    const fromTime = new Date(`2000-01-01T${this.interviewFromTime}`);
    const toTime = new Date(`2000-01-01T${this.interviewToTime}`);
    
    return fromTime < toTime;
  }

  // Calculate total interview duration
  calculateTotalDuration(): string {
    if (!this.interviewFromTime || !this.interviewToTime) return '';
    
    const from = new Date(`2000-01-01T${this.interviewFromTime}`);
    const to = new Date(`2000-01-01T${this.interviewToTime}`);
    const diffMs = to.getTime() - from.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    
    return `${hours}h ${minutes}m`;
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.interviewCode &&
      this.requisitionId &&
      this.assignedLocation &&
      this.interviewDescription &&
      this.date &&
      this.interviewerName &&
      this.interviewFromTime &&
      this.interviewToTime &&
      this.perCandidateAvgTime !== null && this.perCandidateAvgTime > 0 &&
      this.validateTimeSlots()
    );
  }

  // ✅ Pagination Data
  paginatedInterviews() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredInterviews().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
                this.router.navigate(['/panel/recruitment-forms/create-new-interview-scheduling']);

  }

  createInterview() {
    if (!this.isFormValid()) return;

    this.interviews.push({
      interviewCode: this.interviewCode,
      requisitionId: this.requisitionId,
      assignedLocation: this.assignedLocation,
      interviewDescription: this.interviewDescription,
      date: this.date,
      interviewerName: this.interviewerName,
      interviewFromTime: this.interviewFromTime,
      interviewToTime: this.interviewToTime,
      perCandidateAvgTime: this.perCandidateAvgTime || 30
    });

    this.hideForm();
  }

  // ✅ Edit
  editInterview() {
                    this.router.navigate(['/panel/recruitment-forms/edit-interview-scheduling']);

  }

  updateInterview() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.interviews[this.editIndex] = {
      interviewCode: this.interviewCode,
      requisitionId: this.requisitionId,
      assignedLocation: this.assignedLocation,
      interviewDescription: this.interviewDescription,
      date: this.date,
      interviewerName: this.interviewerName,
      interviewFromTime: this.interviewFromTime,
      interviewToTime: this.interviewToTime,
      perCandidateAvgTime: this.perCandidateAvgTime || 30
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteInterview(index: number) {
    if (confirm('Are you sure you want to delete this interview?')) {
      this.interviews.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
                        this.router.navigate(['/panel/recruitment-forms/view-all-interview-scheduling']);

  }

  resetForm() {
    this.interviewCode = '';
    this.requisitionId = '';
    this.assignedLocation = '';
    this.interviewDescription = '';
    this.date = '';
    this.interviewerName = '';
    this.interviewFromTime = '';
    this.interviewToTime = '';
    this.perCandidateAvgTime = null;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredInterviews() {
    if (!this.searchText.trim()) return this.interviews;

    const searchLower = this.searchText.toLowerCase();
    return this.interviews.filter(interview =>
      interview.interviewCode.toLowerCase().includes(searchLower) ||
      interview.interviewDescription.toLowerCase().includes(searchLower) ||
      interview.interviewerName.toLowerCase().includes(searchLower) ||
      interview.assignedLocation.toLowerCase().includes(searchLower) ||
      interview.requisitionId.toLowerCase().includes(searchLower)
    );
  }
}