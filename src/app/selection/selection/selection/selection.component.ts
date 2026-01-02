import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent {

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
        this.formTitle = "Edit Selection"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Selection"


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
    
    selectors: [
      'Alex Johnson - HR Manager',
      'Sarah Williams - Recruiter',
      'Robert Miller - Team Lead',
      'Lisa Anderson - HR Specialist',
      'James Taylor - Department Head',
      'Mark Davis - Senior Manager',
      'Jennifer Brown - Director'
    ],
    
    supervisors: [
      'Mark Davis - Senior Manager',
      'Jennifer Brown - Director',
      'David Wilson - VP Operations',
      'Thomas Clark - HR Manager',
      'Patricia Lewis - Sales Head',
      'Richard Moore - IT Director',
      'Susan Taylor - Finance Controller'
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
      'International Office - Singapore'
    ]
  };

  // ✅ Selection Data
  selections = [
    {
      selectionCode: 'SEL-2024-001',
      requisitionId: 'REQ-2024-001',
      selectionDescription: 'Senior Developer Selection',
      date: '2024-03-20',
      selectorName: 'Alex Johnson - HR Manager',
      supervisorName: 'Mark Davis - Senior Manager',
      assignedDepartment: 'Information Technology',
      assignedLocation: 'Head Office - New York',
      expectedJoiningDate: '2024-04-01',
      candidateName: 'John Smith',
      totalAgreedSalary: 85000,
      documentNo: 'DOC-001',
      isActive: true
    },
    {
      selectionCode: 'SEL-2024-002',
      requisitionId: 'REQ-2024-002',
      selectionDescription: 'Marketing Manager Selection',
      date: '2024-03-15',
      selectorName: 'Sarah Williams - Recruiter',
      supervisorName: 'Jennifer Brown - Director',
      assignedDepartment: 'Marketing',
      assignedLocation: 'Branch Office - Chicago',
      expectedJoiningDate: '2024-03-25',
      candidateName: 'Emily Davis',
      totalAgreedSalary: 75000,
      documentNo: 'DOC-002',
      isActive: true
    },
    {
      selectionCode: 'SEL-2024-003',
      requisitionId: 'REQ-2024-003',
      selectionDescription: 'Finance Analyst Selection',
      date: '2024-03-10',
      selectorName: 'Robert Miller - Team Lead',
      supervisorName: 'David Wilson - VP Operations',
      assignedDepartment: 'Finance',
      assignedLocation: 'Head Office - New York',
      expectedJoiningDate: '2024-03-20',
      candidateName: 'Michael Brown',
      totalAgreedSalary: 65000,
      documentNo: 'DOC-003',
      isActive: true
    },
    {
      selectionCode: 'SEL-2024-004',
      requisitionId: 'REQ-2024-004',
      selectionDescription: 'HR Specialist Selection',
      date: '2024-03-05',
      selectorName: 'Lisa Anderson - HR Specialist',
      supervisorName: 'Thomas Clark - HR Manager',
      assignedDepartment: 'Human Resources',
      assignedLocation: 'Remote - Work from Home',
      expectedJoiningDate: '2024-03-15',
      candidateName: 'Sarah Johnson',
      totalAgreedSalary: 60000,
      documentNo: 'DOC-004',
      isActive: false,
      description: 'Candidate opted for another offer'
    },
    {
      selectionCode: 'SEL-2024-005',
      requisitionId: 'REQ-2024-005',
      selectionDescription: 'Sales Executive Selection',
      date: '2024-03-01',
      selectorName: 'James Taylor - Department Head',
      supervisorName: 'Patricia Lewis - Sales Head',
      assignedDepartment: 'Sales',
      assignedLocation: 'Branch Office - Los Angeles',
      expectedJoiningDate: '2024-03-10',
      candidateName: 'Robert Wilson',
      totalAgreedSalary: 70000,
      documentNo: 'DOC-005',
      isActive: true,
      description: 'Final selection for Sales Executive'
    }
  ];



  // ✅ Form Fields
  selectionCode = '';
  requisitionId = '';
  selectionDescription = '';
  date = '';
  selectorName = '';
  supervisorName = '';
  assignedDepartment = '';
  assignedLocation = '';
  expectedJoiningDate = '';
  candidateName = '';
  totalAgreedSalary: number | null = null;
  documentNo = '';
  isActive: boolean = true;
  description = '';

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;
     paginatedSelectionsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredSelections().length / this.itemsPerPage);
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
    const selectionDate = new Date(this.date);
    const joiningDate = new Date(this.expectedJoiningDate);
    return selectionDate <= joiningDate;
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.selectionCode &&
      this.requisitionId &&
      this.date &&
      this.selectorName &&
      this.supervisorName &&
      this.assignedDepartment &&
      this.assignedLocation &&
      this.expectedJoiningDate &&
      this.candidateName &&
      this.totalAgreedSalary !== null && this.totalAgreedSalary > 0 &&
      this.validateDates()
    );
  }

  // ✅ Pagination Data
  paginatedSelections() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredSelections().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }

      updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredSelections();
    this.paginatedSelectionsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
      this.router.navigate(['/panel/selection/create-new-selection']);
  }

  createSelection() {
    if (!this.isFormValid()) return;

    this.selections.push({
      selectionCode: this.selectionCode,
      requisitionId: this.requisitionId,
      selectionDescription: this.selectionDescription,
      date: this.date,
      selectorName: this.selectorName,
      supervisorName: this.supervisorName,
      assignedDepartment: this.assignedDepartment,
      assignedLocation: this.assignedLocation,
      expectedJoiningDate: this.expectedJoiningDate,
      candidateName: this.candidateName,
      totalAgreedSalary: this.totalAgreedSalary || 0,
      documentNo: this.documentNo,
      isActive: this.isActive,
      description: this.description
    });

    this.hideForm();
  }

  // ✅ Edit
  editSelection() {

      this.router.navigate(['/panel/selection/edit-selection']);

  }

  updateSelection() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.selections[this.editIndex] = {
      selectionCode: this.selectionCode,
      requisitionId: this.requisitionId,
      selectionDescription: this.selectionDescription,
      date: this.date,
      selectorName: this.selectorName,
      supervisorName: this.supervisorName,
      assignedDepartment: this.assignedDepartment,
      assignedLocation: this.assignedLocation,
      expectedJoiningDate: this.expectedJoiningDate,
      candidateName: this.candidateName,
      totalAgreedSalary: this.totalAgreedSalary || 0,
      documentNo: this.documentNo,
      isActive: this.isActive,
      description: this.description
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteSelection(index: number) {
    if (confirm('Are you sure you want to delete this selection record?')) {
      this.selections.splice(index, 1);
 if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
      this.router.navigate(['/panel/selection/view-all-selection']);
  }

  resetForm() {
    this.selectionCode = '';
    this.requisitionId = '';
    this.selectionDescription = '';
    this.date = '';
    this.selectorName = '';
    this.supervisorName = '';
    this.assignedDepartment = '';
    this.assignedLocation = '';
    this.expectedJoiningDate = '';
    this.candidateName = '';
    this.totalAgreedSalary = null;
    this.documentNo = '';
    this.isActive = true;
    this.isEdit = false;
    this.editIndex = null;
    this.description='';
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredSelections() {
    if (!this.searchText.trim()) return this.selections;

    const searchLower = this.searchText.toLowerCase();
    return this.selections.filter(sel =>
      sel.selectionCode.toLowerCase().includes(searchLower) ||
      sel.candidateName.toLowerCase().includes(searchLower) ||
      sel.supervisorName.toLowerCase().includes(searchLower) ||
      sel.assignedDepartment.toLowerCase().includes(searchLower) ||
      sel.selectorName.toLowerCase().includes(searchLower) ||
      sel.requisitionId.toLowerCase().includes(searchLower) ||
      sel.documentNo.toLowerCase().includes(searchLower) ||
      sel.selectionDescription.toLowerCase().includes(searchLower) ||
      sel.assignedLocation.toLowerCase().includes(searchLower)
    );
  }
}