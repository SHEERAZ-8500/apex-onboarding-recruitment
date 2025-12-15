import { Component } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
})
export class LeavesComponent {

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

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredLeaves().length / this.itemsPerPage);
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
  paginatedLeaves() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLeaves().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
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
  editLeave(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const leave = this.leaves[index];
    this.leaveCode = leave.code;
    this.leaveDescription = leave.description;
    this.totalLeavesPerYear = leave.totalLeavesPerYear;
    this.leaveType = leave.leaveType;
    this.payableLeave = leave.payableLeave;
    this.encashableLeave = leave.encashableLeave;
    this.applicableEmployeeType = leave.applicableEmployeeType;
    this.status = leave.status;
    this.minLeaveForEncashment = leave.minLeaveForEncashment;
    this.maxLeaveForEncashment = leave.maxLeaveForEncashment;
    this.leavePaidInAdvance = leave.leavePaidInAdvance;
    this.carryForwardToNextYear = leave.carryForwardToNextYear;
    this.fromDate = leave.fromDate;
    this.toDate = leave.toDate;
    this.remarks = leave.remarks;
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

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
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