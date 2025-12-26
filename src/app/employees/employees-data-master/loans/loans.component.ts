import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
})
export class LoansComponent {

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
        this.formTitle = "Edit Loan"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Loan"


      }
    });
  }


  // ✅ Loans Data (5 dummy values)
  loans = [
    {
      code: 'LN001',
      description: 'Employee Personal Loan',
      maxAmount: 500000,
      loanType: 'Personal',
      minRepaymentAmount: 5000,
      maxNoOfInstallments: 60,
      status: 'Active',
      createdBy: 'Admin User'
    },
    {
      code: 'LN002',
      description: 'House Building Loan',
      maxAmount: 2000000,
      loanType: 'Housing',
      minRepaymentAmount: 15000,
      maxNoOfInstallments: 240,
      status: 'Active',
      createdBy: 'HR Manager'
    },
    {
      code: 'LN003',
      description: 'Vehicle Loan',
      maxAmount: 1000000,
      loanType: 'Vehicle',
      minRepaymentAmount: 10000,
      maxNoOfInstallments: 84,
      status: 'Active',
      createdBy: 'Finance Head'
    },
    {
      code: 'LN004',
      description: 'Education Loan',
      maxAmount: 800000,
      loanType: 'Education',
      minRepaymentAmount: 4000,
      maxNoOfInstallments: 120,
      status: 'Inactive',
      createdBy: 'Admin'
    },
    {
      code: 'LN005',
      description: 'Medical Emergency Loan',
      maxAmount: 300000,
      loanType: 'Medical',
      minRepaymentAmount: 3000,
      maxNoOfInstallments: 36,
      status: 'Active',
      createdBy: 'Operations Manager'
    }
  ];

  fetchLoans() {
    return this.loans;
  }

  // ✅ Form + State
  showForm = false;
  code = '';
  description = '';
  maxAmount: number | null = null;
  loanType = '';
  minRepaymentAmount: number | null = null;
  maxNoOfInstallments: number | null = null;
  status = 'Active';
  createdBy = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Dropdown Options
  loanTypeOptions = ['Personal', 'Housing', 'Vehicle', 'Education', 'Medical', 'Business'];
  statusOptions = ['Active', 'Inactive'];

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredLoans().length / this.itemsPerPage);
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
  paginatedLoans() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLoans().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/employees-master-data/create-new-loans']);

  }

  createLoan() {
    if (!this.code || !this.description || !this.maxAmount || !this.loanType ||
      !this.minRepaymentAmount || !this.maxNoOfInstallments || !this.createdBy) {
      return;
    }

    this.loans.push({
      code: this.code,
      description: this.description,
      maxAmount: this.maxAmount,
      loanType: this.loanType,
      minRepaymentAmount: this.minRepaymentAmount,
      maxNoOfInstallments: this.maxNoOfInstallments,
      status: this.status,
      createdBy: this.createdBy
    });

    this.hideForm();
  }

  // ✅ Edit
  editLoan(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const loan = this.loans[index];
    this.code = loan.code;
    this.description = loan.description;
    this.maxAmount = loan.maxAmount;
    this.loanType = loan.loanType;
    this.minRepaymentAmount = loan.minRepaymentAmount;
    this.maxNoOfInstallments = loan.maxNoOfInstallments;
    this.status = loan.status;
    this.createdBy = loan.createdBy;
    this.router.navigate(['/panel/employees-master-data/edit-loans']);

  }

  updateLoan() {
    if (this.editIndex === null) return;

    this.loans[this.editIndex] = {
      code: this.code,
      description: this.description,
      maxAmount: this.maxAmount || 0,
      loanType: this.loanType,
      minRepaymentAmount: this.minRepaymentAmount || 0,
      maxNoOfInstallments: this.maxNoOfInstallments || 0,
      status: this.status,
      createdBy: this.createdBy
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteLoan(index: number) {
    if (confirm('Are you sure you want to delete this loan?')) {
      this.loans.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
     this.router.navigate(['/panel/employees-master-data/view-all-loans']);

  }

  resetForm() {
    this.code = '';
    this.description = '';
    this.maxAmount = null;
    this.loanType = '';
    this.minRepaymentAmount = null;
    this.maxNoOfInstallments = null;
    this.status = 'Active';
    this.createdBy = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredLoans() {
    if (!this.searchText.trim()) return this.loans;

    const searchLower = this.searchText.toLowerCase();
    return this.loans.filter(loan =>
      loan.code.toLowerCase().includes(searchLower) ||
      loan.description.toLowerCase().includes(searchLower) ||
      loan.loanType.toLowerCase().includes(searchLower) ||
      loan.status.toLowerCase().includes(searchLower) ||
      loan.createdBy.toLowerCase().includes(searchLower)
    );
  }
}