import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-leave',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
})
export class LeavesComponent {
    title = 'view';
  formTitle=""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
        this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        
        // set view mode loigc
      //  this.fetchSkills()
      }
      if  (this.title === 'edit'){
        this.formTitle="Edit Leaves"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Leaves"


      }
    });
  }

  // ✅ Date Configuration
  today = new Date();
  minDate = '1900-01-01';
  maxDate = '2099-12-31';

  // ✅ Dropdown Options
  dropdownOptions = {
    leaveTypes: [
      'Casual Leave',
      'Sick Leave',
      'Earned Leave',
      'Maternity Leave',
      'Paternity Leave',
      'Study Leave',
      'Bereavement Leave',
      'Compensatory Leave',
      'Privilege Leave',
      'Annual Leave',
      'Half Pay Leave',
      'Quarantine Leave',
      'Special Leave'
    ],
    
    employeeTypes: [
      'Permanent Employee',
      'Contract Employee',
      'Temporary Employee',
      'Probation Employee',
      'Intern',
      'Consultant',
      'Part-time Employee',
      'Full-time Employee',
      'Executive',
      'Manager'
    ],
    
    statusOptions: [
      'Active',
      'InActive'
    ]
  };


  // ✅ Leaves Data
  leaves = [
    {
      code: 'LV001',
      description: 'Annual Leave',
      totalLeavesPerYear: 30,
      leaveType: 'Annual Leave',
      payableLeave: true,
      encashableLeave: true,
      applicableEmployeeType: 'Permanent Employee',
      status: 'Active',
      minLeaveForEncashment: 5,
      maxLeaveForEncashment: 15,
      leavePaidInAdvance: false,
      carryForwardToNextYear: true,
      fromDate: '2024-01-01',
      toDate: '2024-12-31',
      remarks: 'Can be carried forward up to 30 days'
    },
    {
      code: 'LV002',
      description: 'Sick Leave',
      totalLeavesPerYear: 12,
      leaveType: 'Sick Leave',
      payableLeave: true,
      encashableLeave: false,
      applicableEmployeeType: 'Permanent Employee',
      status: 'Active',
      minLeaveForEncashment: 0,
      maxLeaveForEncashment: 0,
      leavePaidInAdvance: true,
      carryForwardToNextYear: false,
      fromDate: '2024-01-01',
      toDate: '2024-12-31',
      remarks: 'Medical certificate required for more than 3 days'
    },
    {
      code: 'LV003',
      description: 'Casual Leave',
      totalLeavesPerYear: 8,
      leaveType: 'Casual Leave',
      payableLeave: true,
      encashableLeave: false,
      applicableEmployeeType: 'All Employees',
      status: 'Active',
      minLeaveForEncashment: 0,
      maxLeaveForEncashment: 0,
      leavePaidInAdvance: false,
      carryForwardToNextYear: false,
      fromDate: '2024-01-01',
      toDate: '2024-12-31',
      remarks: 'Maximum 2 days at a time'
    },
    {
      code: 'LV004',
      description: 'Maternity Leave',
      totalLeavesPerYear: 180,
      leaveType: 'Maternity Leave',
      payableLeave: true,
      encashableLeave: false,
      applicableEmployeeType: 'Permanent Employee',
      status: 'Active',
      minLeaveForEncashment: 0,
      maxLeaveForEncashment: 0,
      leavePaidInAdvance: true,
      carryForwardToNextYear: false,
      fromDate: '2024-01-01',
      toDate: '2024-12-31',
      remarks: 'For female employees only'
    },
    {
      code: 'LV005',
      description: 'Study Leave',
      totalLeavesPerYear: 10,
      leaveType: 'Study Leave',
      payableLeave: false,
      encashableLeave: false,
      applicableEmployeeType: 'Permanent Employee',
      status: 'InActive',
      minLeaveForEncashment: 0,
      maxLeaveForEncashment: 0,
      leavePaidInAdvance: false,
      carryForwardToNextYear: false,
      fromDate: '2024-01-01',
      toDate: '2024-12-31',
      remarks: 'Approval from HR required'
    }
  ];

  // ✅ Form Fields
  leaveCode = '';
  leaveDescription = '';
  totalLeavesPerYear: number | null = null;
  leaveType = '';
  applicableEmployeeType = '';
  minLeaveForEncashment: number | null = null;
  maxLeaveForEncashment: number | null = null;
  fromDate = '';
  toDate = '';
  status = '';
  remarks = '';
  
  // Checkbox Fields
  payableLeave: boolean = true;
  encashableLeave: boolean = true;
  carryForwardToNextYear: boolean = true;
  leavePaidInAdvance: boolean = true;

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;
     paginatedLeavesList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredLeaves().length / this.itemsPerPage);
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

  validateDates(): boolean {
    if (!this.fromDate || !this.toDate) return true;
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    return from <= to;
  }

  validateEncashmentLimits(): boolean {
    if (this.minLeaveForEncashment === null || this.maxLeaveForEncashment === null) {
      return true;
    }
    return this.minLeaveForEncashment <= this.maxLeaveForEncashment;
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.leaveCode &&
      this.leaveDescription &&
      this.totalLeavesPerYear !== null && this.totalLeavesPerYear > 0 &&
      this.leaveType &&
      this.applicableEmployeeType &&
      this.fromDate &&
      this.toDate &&
      this.status &&
      this.validateDates() &&
      this.validateEncashmentLimits()
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
    const filtered = this.filteredLeaves();
    this.paginatedLeavesList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/organizational-master-data/create-new-leaves']);

  }

  createLeave() {
    if (!this.isFormValid()) return;

    this.leaves.push({
      code: this.leaveCode,
      description: this.leaveDescription,
      totalLeavesPerYear: this.totalLeavesPerYear || 0,
      leaveType: this.leaveType,
      payableLeave: this.payableLeave,
      encashableLeave: this.encashableLeave,
      applicableEmployeeType: this.applicableEmployeeType,
      status: this.status,
      minLeaveForEncashment: this.minLeaveForEncashment || 0,
      maxLeaveForEncashment: this.maxLeaveForEncashment || 0,
      leavePaidInAdvance: this.leavePaidInAdvance,
      carryForwardToNextYear: this.carryForwardToNextYear,
      fromDate: this.fromDate,
      toDate: this.toDate,
      remarks: this.remarks
    });

    this.hideForm();
  }

  // ✅ Edit
  editLeave() {
    this.router.navigate(['/panel/organizational-master-data/edit-leaves']);

  }

  updateLeave() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.leaves[this.editIndex] = {
      code: this.leaveCode,
      description: this.leaveDescription,
      totalLeavesPerYear: this.totalLeavesPerYear || 0,
      leaveType: this.leaveType,
      payableLeave: this.payableLeave,
      encashableLeave: this.encashableLeave,
      applicableEmployeeType: this.applicableEmployeeType,
      status: this.status,
      minLeaveForEncashment: this.minLeaveForEncashment || 0,
      maxLeaveForEncashment: this.maxLeaveForEncashment || 0,
      leavePaidInAdvance: this.leavePaidInAdvance,
      carryForwardToNextYear: this.carryForwardToNextYear,
      fromDate: this.fromDate,
      toDate: this.toDate,
      remarks: this.remarks
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteLeave(index: number) {
    if (confirm('Are you sure you want to delete this leave?')) {
      this.leaves.splice(index, 1);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
            this.router.navigate(['/panel/organizational-master-data/view-all-leaves']);

  }

  resetForm() {
    this.leaveCode = '';
    this.leaveDescription = '';
    this.totalLeavesPerYear = null;
    this.leaveType = '';
    this.applicableEmployeeType = '';
    this.minLeaveForEncashment = null;
    this.maxLeaveForEncashment = null;
    this.fromDate = '';
    this.toDate = '';
    this.status = '';
    this.remarks = '';
    this.payableLeave = false;
    this.encashableLeave = false;
    this.carryForwardToNextYear = false;
    this.leavePaidInAdvance = false;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredLeaves() {
    if (!this.searchText.trim()) return this.leaves;

    const searchLower = this.searchText.toLowerCase();
    return this.leaves.filter(leave =>
      leave.code.toLowerCase().includes(searchLower) ||
      leave.description.toLowerCase().includes(searchLower) ||
      leave.leaveType.toLowerCase().includes(searchLower) ||
      leave.applicableEmployeeType.toLowerCase().includes(searchLower) ||
      leave.status.toLowerCase().includes(searchLower) ||
      leave.remarks.toLowerCase().includes(searchLower)
    );
  }
}