import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-mobilization',
  templateUrl: './mobilization.component.html',
  styleUrls: ['./mobilization.component.scss']
})
export class MobilizationComponent {

   title = 'view';
  formTitle = ""
    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
        this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Mobilization"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Mobilization"


      }
    });
  }

  // ✅ Date Configuration
  today = new Date();
  minDate = '1900-01-01';
  maxDate = '2099-12-31';

  // ✅ Dropdown Options
  dropdownOptions = {
    requisitionIds: [
      'REQ-2024-001',
      'REQ-2024-002',
      'REQ-2024-003',
      'REQ-2024-004',
      'REQ-2024-005',
      'REQ-2024-006',
      'REQ-2024-007'
    ],
    
    candidates: [
      'John Smith',
      'Sarah Johnson',
      'Michael Brown',
      'Emily Davis',
      'Robert Wilson',
      'Jennifer Taylor',
      'David Anderson',
      'Lisa Martinez',
      'James Thomas',
      'Maria Garcia'
    ],
    
    departments: [
      'Human Resources',
      'Information Technology',
      'Finance',
      'Marketing',
      'Sales',
      'Operations',
      'Research & Development',
      'Customer Support',
      'Administration',
      'Legal'
    ],
    
    locations: [
      'Head Office - New York',
      'Branch Office - Chicago',
      'Branch Office - Los Angeles',
      'Branch Office - Houston',
      'Remote - Work from Home',
      'International Office - London',
      'International Office - Singapore',
      'Regional Office - Miami'
    ],
    
    employeeCodes: [
      'EMP-001',
      'EMP-002',
      'EMP-003',
      'EMP-004',
      'EMP-005',
      'EMP-006',
      'EMP-007',
      'EMP-008',
      'EMP-009',
      'EMP-010'
    ]
  };

  // ✅ Mobilization Data
  mobilizations = [
    {
      mobilizationCode: 'MOB-2024-001',
      requisitionId: 'REQ-2024-001',
      mobilizationDescription: 'Senior Developer Hiring',
      date: '2024-03-15',
      mobilizerName: 'Alex Johnson',
      candidateName: 'John Smith',
      expectedJoiningDate: '2024-04-01',
      departmentName: 'Information Technology',
      locationName: 'Head Office - New York',
      supervisorName: 'Mark Davis',
      assignedEmployeeCode: 'EMP-001',
      totalAgreedSalary: 85000,
      isActive: true
    },
    {
      mobilizationCode: 'MOB-2024-002',
      requisitionId: 'REQ-2024-002',
      mobilizationDescription: 'Marketing Manager Recruitment',
      date: '2024-03-10',
      mobilizerName: 'Sarah Williams',
      candidateName: 'Emily Davis',
      expectedJoiningDate: '2024-03-25',
      departmentName: 'Marketing',
      locationName: 'Branch Office - Chicago',
      supervisorName: 'Jennifer Brown',
      assignedEmployeeCode: 'EMP-002',
      totalAgreedSalary: 75000,
      isActive: true
    },
    {
      mobilizationCode: 'MOB-2024-003',
      requisitionId: 'REQ-2024-003',
      mobilizationDescription: 'Finance Analyst Position',
      date: '2024-03-05',
      mobilizerName: 'Robert Miller',
      candidateName: 'Michael Brown',
      expectedJoiningDate: '2024-03-20',
      departmentName: 'Finance',
      locationName: 'Head Office - New York',
      supervisorName: 'David Wilson',
      assignedEmployeeCode: 'EMP-003',
      totalAgreedSalary: 65000,
      isActive: true
    },
    {
      mobilizationCode: 'MOB-2024-004',
      requisitionId: 'REQ-2024-004',
      mobilizationDescription: 'HR Specialist Hiring',
      date: '2024-02-28',
      mobilizerName: 'Lisa Anderson',
      candidateName: 'Sarah Johnson',
      expectedJoiningDate: '2024-03-15',
      departmentName: 'Human Resources',
      locationName: 'Remote - Work from Home',
      supervisorName: 'Thomas Clark',
      assignedEmployeeCode: 'EMP-004',
      totalAgreedSalary: 60000,
      isActive: false
    },
    {
      mobilizationCode: 'MOB-2024-005',
      requisitionId: 'REQ-2024-005',
      mobilizationDescription: 'Sales Executive Position',
      date: '2024-02-20',
      mobilizerName: 'James Taylor',
      candidateName: 'Robert Wilson',
      expectedJoiningDate: '2024-03-10',
      departmentName: 'Sales',
      locationName: 'Branch Office - Los Angeles',
      supervisorName: 'Patricia Lewis',
      assignedEmployeeCode: 'EMP-005',
      totalAgreedSalary: 70000,
      isActive: true
    }
  ];

 

  // ✅ Form Fields
  mobilizationCode = '';
  requisitionId = '';
  mobilizationDescription = '';
  date = '';
  mobilizerName = '';
  candidateName = '';
  expectedJoiningDate = '';
  departmentName = '';
  locationName = '';
  supervisorName = '';
  assignedEmployeeCode = '';
  totalAgreedSalary: number | null = null;
  isActive: boolean = true;

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;
     paginatedMobilizationsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredMobilizations().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ✅ Helper Methods
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
  }

  // Validate dates
  validateDates(): boolean {
    if (!this.date || !this.expectedJoiningDate) return true;
    const mobilizationDate = new Date(this.date);
    const joiningDate = new Date(this.expectedJoiningDate);
    return mobilizationDate <= joiningDate;
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.mobilizationCode &&
      this.requisitionId &&
      this.date &&
      this.mobilizerName &&
      this.candidateName &&
      this.expectedJoiningDate &&
      this.departmentName &&
      this.locationName &&
      this.supervisorName &&
      this.assignedEmployeeCode &&
      this.totalAgreedSalary !== null && this.totalAgreedSalary > 0 &&
      this.validateDates()
    );
  }

  // ✅ Pagination Data
 

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }


      updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredMobilizations();
    this.paginatedMobilizationsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
      this.router.navigate(['/panel/selection/create-new-mobilization']);
  }

  createMobilization() {
    if (!this.isFormValid()) return;

    this.mobilizations.push({
      mobilizationCode: this.mobilizationCode,
      requisitionId: this.requisitionId,
      mobilizationDescription: this.mobilizationDescription,
      date: this.date,
      mobilizerName: this.mobilizerName,
      candidateName: this.candidateName,
      expectedJoiningDate: this.expectedJoiningDate,
      departmentName: this.departmentName,
      locationName: this.locationName,
      supervisorName: this.supervisorName,
      assignedEmployeeCode: this.assignedEmployeeCode,
      totalAgreedSalary: this.totalAgreedSalary || 0,
      isActive: this.isActive
    });

    this.hideForm();
  }

  // ✅ Edit
  editMobilization() {

      this.router.navigate(['/panel/selection/edit-mobilization']);
  
  }

  updateMobilization() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.mobilizations[this.editIndex] = {
      mobilizationCode: this.mobilizationCode,
      requisitionId: this.requisitionId,
      mobilizationDescription: this.mobilizationDescription,
      date: this.date,
      mobilizerName: this.mobilizerName,
      candidateName: this.candidateName,
      expectedJoiningDate: this.expectedJoiningDate,
      departmentName: this.departmentName,
      locationName: this.locationName,
      supervisorName: this.supervisorName,
      assignedEmployeeCode: this.assignedEmployeeCode,
      totalAgreedSalary: this.totalAgreedSalary || 0,
      isActive: this.isActive
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteMobilization(index: number) {
    if (confirm('Are you sure you want to delete this mobilization record?')) {
      this.mobilizations.splice(index, 1);

     if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
      this.router.navigate(['/panel/selection/view-all-mobilization']);
  }

  resetForm() {
    this.mobilizationCode = '';
    this.requisitionId = '';
    this.mobilizationDescription = '';
    this.date = '';
    this.mobilizerName = '';
    this.candidateName = '';
    this.expectedJoiningDate = '';
    this.departmentName = '';
    this.locationName = '';
    this.supervisorName = '';
    this.assignedEmployeeCode = '';
    this.totalAgreedSalary = null;
    this.isActive = true;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredMobilizations() {
    if (!this.searchText.trim()) return this.mobilizations;

    const searchLower = this.searchText.toLowerCase();
    return this.mobilizations.filter(mob =>
      mob.mobilizationCode.toLowerCase().includes(searchLower) ||
      mob.candidateName.toLowerCase().includes(searchLower) ||
      mob.departmentName.toLowerCase().includes(searchLower) ||
      mob.locationName.toLowerCase().includes(searchLower) ||
      mob.mobilizerName.toLowerCase().includes(searchLower) ||
      mob.supervisorName.toLowerCase().includes(searchLower) ||
      mob.assignedEmployeeCode.toLowerCase().includes(searchLower) ||
      mob.requisitionId.toLowerCase().includes(searchLower) ||
      mob.mobilizationDescription.toLowerCase().includes(searchLower)
    );
  }
}