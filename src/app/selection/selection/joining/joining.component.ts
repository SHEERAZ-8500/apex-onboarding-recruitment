import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-joining',
  templateUrl: './joining.component.html',
  styleUrls: ['./joining.component.scss']
})
export class JoiningComponent {

   title = 'view';
  formTitle = ""
    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Joining"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Joining"


      }
    });
  }

  // ✅ Date Configuration
  today = new Date();
  minDate = '1900-01-01';
  maxDate = '2099-12-31';

  // ✅ Dropdown Options
  dropdownOptions = {
    employees: [
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
    
    supervisors: [
      'Mark Davis - Senior Manager',
      'Jennifer Brown - Director',
      'David Wilson - VP Operations',
      'Thomas Clark - HR Manager',
      'Patricia Lewis - Sales Head',
      'Richard Moore - IT Director',
      'Susan Taylor - Finance Controller',
      'William Jackson - Marketing Head'
    ]
  };

  // ✅ Joining Data
  joinings = [
    {
      attendantName: 'Alex Johnson',
      date: '2024-04-01',
      departmentName: 'Information Technology',
      locationName: 'Head Office - New York',
      employeeName: 'John Smith',
      joiningCode: 'JOIN-2024-001',
      supervisorName: 'Mark Davis - Senior Manager',
      isActive: true,
      joiningDescription: 'Onboarding for Senior Developer role',
      mobilizerName: 'Alex Johnson',
      assignedEmployeeCode: 'EMP-001',
      expectedJoiningDate: '2024-04-01'
    },
    {
      attendantName: 'Sarah Williams',
      date: '2024-03-25',
      departmentName: 'Marketing',
      locationName: 'Branch Office - Chicago',
      employeeName: 'Emily Davis',
      joiningCode: 'JOIN-2024-002',
      supervisorName: 'Jennifer Brown - Director',
      isActive: true,
      joiningDescription: 'Marketing Manager onboarding',
      mobilizerName: 'Sarah Williams',
      assignedEmployeeCode: 'EMP-002',
      expectedJoiningDate: '2024-03-25'
    },
    {
      attendantName: 'Robert Miller',
      date: '2024-03-20',
      departmentName: 'Finance',
      locationName: 'Head Office - New York',
      employeeName: 'Michael Brown',
      joiningCode: 'JOIN-2024-003',
      supervisorName: 'David Wilson - VP Operations',
      isActive: true,
      joiningDescription: 'Finance Analyst joining process',
      mobilizerName: 'Robert Miller',
      assignedEmployeeCode: 'EMP-003',
      expectedJoiningDate: '2024-03-20'
    },
    {
      attendantName: 'Lisa Anderson',
      date: '2024-03-15',
      departmentName: 'Human Resources',
      locationName: 'Remote - Work from Home',
      employeeName: 'Sarah Johnson',
      joiningCode: 'JOIN-2024-004',
      supervisorName: 'Thomas Clark - HR Manager',
      isActive: false,
      joiningDescription: 'HR Specialist joining',
      mobilizerName: 'Lisa Anderson',
      assignedEmployeeCode: 'EMP-004',
      expectedJoiningDate: '2024-03-15'
    },
    {
      attendantName: 'James Taylor',
      date: '2024-03-10',
      departmentName: 'Sales',
      locationName: 'Branch Office - Los Angeles',
      employeeName: 'Robert Wilson',
      joiningCode: 'JOIN-2024-005',
      supervisorName: 'Patricia Lewis - Sales Head',
      isActive: true,
      joiningDescription: 'Sales Executive joining formalities',
      mobilizerName: 'James Taylor',
      assignedEmployeeCode: 'EMP-005',
      expectedJoiningDate: '2024-03-10'
    }
  ];

  fetchJoinings() {
    return this.joinings;
  }

  // ✅ Form Fields
  joiningCode = '';
  joiningDescription = '';
  date = '';
  mobilizerName = '';
  employeeName = '';
  departmentName = '';
  locationName = '';
  supervisorName = '';
  assignedEmployeeCode = '';
  expectedJoiningDate = '';
  isActive: boolean = true;

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
    return Math.ceil(this.filteredJoinings().length / this.itemsPerPage);
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

  // Validate dates
  validateDates(): boolean {
    if (!this.date || !this.expectedJoiningDate) return true;
    const joiningDate = new Date(this.date);
    const expectedDate = new Date(this.expectedJoiningDate);
    return joiningDate <= expectedDate;
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.joiningCode &&
      this.date &&
      this.mobilizerName &&
      this.employeeName &&
      this.departmentName &&
      this.locationName &&
      this.supervisorName &&
      this.assignedEmployeeCode &&
      this.expectedJoiningDate &&
      this.validateDates()
    );
  }

  // ✅ Pagination Data
  paginatedJoinings() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJoinings().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
                this.router.navigate(['/panel/selection/create-new-joining']);

  }

  createJoining() {
    if (!this.isFormValid()) return;

    this.joinings.push({
      attendantName: this.mobilizerName,
      date: this.date,
      departmentName: this.departmentName,
      locationName: this.locationName,
      employeeName: this.employeeName,
      joiningCode: this.joiningCode,
      supervisorName: this.supervisorName,
      isActive: this.isActive,
      joiningDescription: this.joiningDescription,
      mobilizerName: this.mobilizerName,
      assignedEmployeeCode: this.assignedEmployeeCode,
      expectedJoiningDate: this.expectedJoiningDate,
                    

    });

    this.hideForm();
  }

  // ✅ Edit
  editJoining(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const joining = this.joinings[index];
    this.joiningCode = joining.joiningCode;
    this.joiningDescription = joining.joiningDescription;
    this.date = joining.date;
    this.mobilizerName = joining.mobilizerName;
    this.employeeName = joining.employeeName;
    this.departmentName = joining.departmentName;
    this.locationName = joining.locationName;
    this.supervisorName = joining.supervisorName;
    this.assignedEmployeeCode = joining.assignedEmployeeCode;
    this.expectedJoiningDate = joining.expectedJoiningDate;
    this.isActive = joining.isActive;
      this.router.navigate(['/panel/selection/edit-joining']);
  }

  updateJoining() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.joinings[this.editIndex] = {
      attendantName: this.mobilizerName,
      date: this.date,
      departmentName: this.departmentName,
      locationName: this.locationName,
      employeeName: this.employeeName,
      joiningCode: this.joiningCode,
      supervisorName: this.supervisorName,
      isActive: this.isActive,
      joiningDescription: this.joiningDescription,
      mobilizerName: this.mobilizerName,
      assignedEmployeeCode: this.assignedEmployeeCode,
      expectedJoiningDate: this.expectedJoiningDate
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteJoining(index: number) {
    if (confirm('Are you sure you want to delete this joining record?')) {
      this.joinings.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
                    this.router.navigate(['/panel/selection/view-all-joining']);

  }

  resetForm() {
    this.joiningCode = '';
    this.joiningDescription = '';
    this.date = '';
    this.mobilizerName = '';
    this.employeeName = '';
    this.departmentName = '';
    this.locationName = '';
    this.supervisorName = '';
    this.assignedEmployeeCode = '';
    this.expectedJoiningDate = '';
    this.isActive = true;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredJoinings() {
    if (!this.searchText.trim()) return this.joinings;

    const searchLower = this.searchText.toLowerCase();
    return this.joinings.filter(join =>
      join.joiningCode.toLowerCase().includes(searchLower) ||
      join.attendantName.toLowerCase().includes(searchLower) ||
      join.employeeName.toLowerCase().includes(searchLower) ||
      join.departmentName.toLowerCase().includes(searchLower) ||
      join.locationName.toLowerCase().includes(searchLower) ||
      join.supervisorName.toLowerCase().includes(searchLower) ||
      join.assignedEmployeeCode.toLowerCase().includes(searchLower) ||
      join.joiningDescription.toLowerCase().includes(searchLower) ||
      join.mobilizerName.toLowerCase().includes(searchLower)
    );
  }
}