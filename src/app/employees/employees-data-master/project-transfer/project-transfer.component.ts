import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-project',
  templateUrl: './project-transfer.component.html',
  styleUrls: ['./project-transfer.component.scss'],
})
export class ProjectTransferComponent {

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
        this.formTitle = "Edit Project Trasnfer"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Project Trasnfer"


      }
    });
  }

  // ✅ Projects dropdown options (a to e)
  projects = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 'Project Epsilon'];

  // ✅ Project Transfers Data
  transfers = [
    {
      code: 'PT001',
      legacyCode: 'LC-001',
      name: 'John Doe',
      jobTitle: 'Senior Developer',
      department: 'IT Department',
      fromProject: 'Project Alpha',
      toProject: 'Project Beta',
      transferDate: '2024-03-15',
      employeeCode: 'EMP001'
    },
    {
      code: 'PT002',
      legacyCode: 'LC-002',
      name: 'Jane Smith',
      jobTitle: 'Project Manager',
      department: 'Project Management',
      fromProject: 'Project Beta',
      toProject: 'Project Gamma',
      transferDate: '2024-02-28',
      employeeCode: 'EMP002'
    },
    {
      code: 'PT003',
      legacyCode: 'LC-003',
      name: 'Robert Johnson',
      jobTitle: 'QA Engineer',
      department: 'Quality Assurance',
      fromProject: 'Project Gamma',
      toProject: 'Project Delta',
      transferDate: '2024-04-10',
      employeeCode: 'EMP003'
    },
    {
      code: 'PT004',
      legacyCode: 'LC-004',
      name: 'Emily Davis',
      jobTitle: 'UX Designer',
      department: 'Design',
      fromProject: 'Project Delta',
      toProject: 'Project Epsilon',
      transferDate: '2024-03-22',
      employeeCode: 'EMP004'
    },
    {
      code: 'PT005',
      legacyCode: 'LC-005',
      name: 'Michael Wilson',
      jobTitle: 'DevOps Engineer',
      department: 'Operations',
      fromProject: 'Project Epsilon',
      toProject: 'Project Alpha',
      transferDate: '2024-04-05',
      employeeCode: 'EMP005'
    },
    {
      code: 'PT006',
      legacyCode: 'LC-006',
      name: 'Sarah Brown',
      jobTitle: 'Business Analyst',
      department: 'Business Analysis',
      fromProject: 'Project Alpha',
      toProject: 'Project Gamma',
      transferDate: '2024-03-30',
      employeeCode: 'EMP006'
    },
    {
      code: 'PT007',
      legacyCode: 'LC-007',
      name: 'David Miller',
      jobTitle: 'Database Administrator',
      department: 'IT Department',
      fromProject: 'Project Beta',
      toProject: 'Project Delta',
      transferDate: '2024-04-12',
      employeeCode: 'EMP007'
    },
    {
      code: 'PT008',
      legacyCode: 'LC-008',
      name: 'Lisa Anderson',
      jobTitle: 'Technical Lead',
      department: 'IT Department',
      fromProject: 'Project Gamma',
      toProject: 'Project Epsilon',
      transferDate: '2024-02-20',
      employeeCode: 'EMP008'
    },
    {
      code: 'PT009',
      legacyCode: 'LC-009',
      name: 'James Taylor',
      jobTitle: 'System Architect',
      department: 'Architecture',
      fromProject: 'Project Delta',
      toProject: 'Project Alpha',
      transferDate: '2024-03-18',
      employeeCode: 'EMP009'
    },
    {
      code: 'PT010',
      legacyCode: 'LC-010',
      name: 'Amanda Clark',
      jobTitle: 'Scrum Master',
      department: 'Project Management',
      fromProject: 'Project Epsilon',
      toProject: 'Project Beta',
      transferDate: '2024-04-01',
      employeeCode: 'EMP010'
    }
  ];

  fetchProjects() {
    return this.projects;
  }

  // ✅ Form + State
  showForm = false;
  fromProject = '';
  toProject = '';
  transferDate = '';
  employeeName = '';
  employeeCode = '';
  legacyCode = '';
  jobTitle = '';
  department = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredTransfers().length / this.itemsPerPage);
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

  // ✅ Pagination Data
  paginatedTransfers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTransfers().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/employees-master-data/create-new-project-transfer']);

  }

  createTransfer() {
    if (!this.validateForm()) {
      return;
    }

    // Auto-generate code if not provided in form (in real app, you might want this)
    const code = this.employeeCode ? `PT${this.employeeCode.substring(3)}` : `PT${String(this.transfers.length + 1).padStart(3, '0')}`;

    this.transfers.push({
      code: code,
      legacyCode: this.legacyCode || `LC-${String(this.transfers.length + 1).padStart(3, '0')}`,
      name: this.employeeName,
      jobTitle: this.jobTitle,
      department: this.department,
      fromProject: this.fromProject,
      toProject: this.toProject,
      transferDate: this.transferDate,
      employeeCode: this.employeeCode
    });

    this.hideForm();
  }

  // ✅ Edit
  editTransfer() {
    this.router.navigate(['/panel/employees-master-data/edit-project-transfer']);



  }

  updateTransfer() {
    if (this.editIndex === null || !this.validateForm()) {
      return;
    }

    this.transfers[this.editIndex] = {
      code: this.transfers[this.editIndex].code, // Keep existing code
      legacyCode: this.legacyCode || this.transfers[this.editIndex].legacyCode,
      name: this.employeeName,
      jobTitle: this.jobTitle,
      department: this.department,
      fromProject: this.fromProject,
      toProject: this.toProject,
      transferDate: this.transferDate,
      employeeCode: this.employeeCode
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteTransfer(index: number) {
    if (confirm('Are you sure you want to delete this project transfer record?')) {
      this.transfers.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Validation
  validateForm(): boolean {
    if (!this.fromProject || !this.toProject || !this.transferDate ||
      !this.employeeName || !this.employeeCode || !this.jobTitle || !this.department) {
      alert('Please fill all required fields');
      return false;
    }

    if (this.fromProject === this.toProject) {
      alert('From Project and To Project cannot be the same');
      return false;
    }

    // Check if transfer date is valid (not in the future for creation)
    if (!this.isEdit) {
      const transferDate = new Date(this.transferDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (transferDate > today) {
        alert('Transfer date cannot be in the future');
        return false;
      }
    }

    // Check if employee code already exists (except in edit mode)
    if (!this.isEdit) {
      const existingEmployee = this.transfers.find(t => t.employeeCode === this.employeeCode);
      if (existingEmployee) {
        alert('Employee Code already exists. Please use a different code.');
        return false;
      }
    }

    return true;
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
    this.router.navigate(['/panel/employees-master-data/view-all-project-transfer']);

  }

  resetForm() {
    this.fromProject = '';
    this.toProject = '';
    this.transferDate = '';
    this.employeeName = '';
    this.employeeCode = '';
    this.legacyCode = '';
    this.jobTitle = '';
    this.department = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredTransfers() {
    if (!this.searchText.trim()) return this.transfers;

    const searchLower = this.searchText.toLowerCase();
    return this.transfers.filter(transfer =>
      transfer.code.toLowerCase().includes(searchLower) ||
      transfer.legacyCode.toLowerCase().includes(searchLower) ||
      transfer.name.toLowerCase().includes(searchLower) ||
      transfer.jobTitle.toLowerCase().includes(searchLower) ||
      transfer.department.toLowerCase().includes(searchLower) ||
      transfer.fromProject.toLowerCase().includes(searchLower) ||
      transfer.toProject.toLowerCase().includes(searchLower) ||
      transfer.employeeCode.toLowerCase().includes(searchLower) ||
      transfer.transferDate.includes(searchLower)
    );
  }
}