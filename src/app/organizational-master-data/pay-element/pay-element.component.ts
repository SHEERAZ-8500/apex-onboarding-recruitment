import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pay-element',
  templateUrl: './pay-element.component.html',
  styleUrls: ['./pay-element.component.scss'],
})
export class PayElementComponent {
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
        this.formTitle="Edit Pay Element"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Pay Element"


      }
    });
  }

  // ✅ Dropdown Options
  dropdownOptions = {
    types: [
      'Allowance',
      'Bonus',
      'Commission',
      'Deduction',
      'Incentive',
      'Overtime',
      'Reimbursement',
      'Salary',
      'Tax',
      'Other'
    ],
    
    elementTypes: [
      'Basic Pay',
      'House Rent Allowance',
      'Dearness Allowance',
      'Conveyance Allowance',
      'Medical Allowance',
      'Special Allowance',
      'Bonus',
      'Provident Fund',
      'Professional Tax',
      'Income Tax'
    ],
    
    statusOptions: [
      'Active',
      'InActive'
    ],
    
    baseElements: [
      'Basic Salary',
      'Gross Salary',
      'Net Salary',
      'Not Applicable',
      'Custom Base'
    ]
  };

  // ✅ Pay Elements Data
  payElements = [
    {
      code: 'PE001',
      description: 'Basic Salary',
      amount: 25000.00,
      baseElement: 'Not Applicable',
      percentage: 0,
      elementType: 'Basic Pay',
      type: 'Salary',
      fixed: true,
      status: 'Active'
    },
    {
      code: 'PE002',
      description: 'House Rent Allowance',
      amount: 10000.00,
      baseElement: 'Basic Salary',
      percentage: 40,
      elementType: 'House Rent Allowance',
      type: 'Allowance',
      fixed: false,
      status: 'Active'
    },
    {
      code: 'PE003',
      description: 'Medical Allowance',
      amount: 5000.00,
      baseElement: 'Not Applicable',
      percentage: 0,
      elementType: 'Medical Allowance',
      type: 'Allowance',
      fixed: true,
      status: 'Active'
    },
    {
      code: 'PE004',
      description: 'Provident Fund Deduction',
      amount: 3000.00,
      baseElement: 'Basic Salary',
      percentage: 12,
      elementType: 'Provident Fund',
      type: 'Deduction',
      fixed: false,
      status: 'Active'
    },
    {
      code: 'PE005',
      description: 'Performance Bonus',
      amount: 15000.00,
      baseElement: 'Gross Salary',
      percentage: 20,
      elementType: 'Bonus',
      type: 'Bonus',
      fixed: false,
      status: 'Active'
    },
    {
      code: 'PE006',
      description: 'Income Tax Deduction',
      amount: 8000.00,
      baseElement: 'Gross Salary',
      percentage: 10,
      elementType: 'Income Tax',
      type: 'Tax',
      fixed: false,
      status: 'Active'
    },
    {
      code: 'PE007',
      description: 'Travel Reimbursement',
      amount: 3000.00,
      baseElement: 'Not Applicable',
      percentage: 0,
      elementType: 'Conveyance Allowance',
      type: 'Reimbursement',
      fixed: false,
      status: 'InActive'
    }
  ];
 fetchPayElement() {
    return this.payElements;
  }
  // ✅ Form Fields
  payElementCode = '';
  payElementDescription = '';
  type = '';
  amount: number | null = null;
  elementType = '';
  status = '';
  baseElement = '';
  percentage: number | null = null;
  fixed: boolean = false;

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
    return Math.ceil(this.filteredPayElements().length / this.itemsPerPage);
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
  calculateAmountFromPercentage(): void {
    // This method could calculate amount based on percentage and base element
    // In a real application, you would fetch the base amount from the selected base element
    if (this.percentage && this.percentage > 0 && this.baseElement) {
      // Example calculation - in real app, fetch base amount from database
      const baseAmount = 25000; // Default base amount
      this.amount = (baseAmount * this.percentage) / 100;
    }
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.payElementCode &&
      this.payElementDescription &&
      this.type &&
      this.amount !== null && this.amount >= 0 &&
      this.elementType &&
      this.status
    );
    // Note: baseElement and percentage are optional
    // fixed has a default value (false)
  }

  // ✅ Pagination Data
  paginatedPayElements() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPayElements().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
            this.router.navigate(['/panel/organizational-master-data/create-new-pay-element']);

  }

  createPayElement() {
    if (!this.isFormValid()) return;

    this.payElements.push({
      code: this.payElementCode,
      description: this.payElementDescription,
      amount: this.amount || 0,
      baseElement: this.baseElement || 'Not Applicable',
      percentage: this.percentage || 0,
      elementType: this.elementType,
      type: this.type,
      fixed: this.fixed,
      status: this.status
    });

    this.hideForm();
  }

  // ✅ Edit
  editPayElement() {
                this.router.navigate(['/panel/organizational-master-data/edit-pay-element']);

  }

  updatePayElement() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.payElements[this.editIndex] = {
      code: this.payElementCode,
      description: this.payElementDescription,
      amount: this.amount || 0,
      baseElement: this.baseElement || 'Not Applicable',
      percentage: this.percentage || 0,
      elementType: this.elementType,
      type: this.type,
      fixed: this.fixed,
      status: this.status
    };

    this.hideForm();
  }

  // ✅ Delete
  deletePayElement(index: number) {
    if (confirm('Are you sure you want to delete this pay element?')) {
      this.payElements.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
                this.router.navigate(['/panel/organizational-master-data/view-all-pay-element']);

  }

  resetForm() {
    this.payElementCode = '';
    this.payElementDescription = '';
    this.type = '';
    this.amount = null;
    this.elementType = '';
    this.status = '';
    this.baseElement = '';
    this.percentage = null;
    this.fixed = false;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredPayElements() {
    if (!this.searchText.trim()) return this.payElements;

    const searchLower = this.searchText.toLowerCase();
    return this.payElements.filter(payElement =>
      payElement.code.toLowerCase().includes(searchLower) ||
      payElement.description.toLowerCase().includes(searchLower) ||
      payElement.type.toLowerCase().includes(searchLower) ||
      payElement.elementType.toLowerCase().includes(searchLower) ||
      payElement.status.toLowerCase().includes(searchLower) ||
      payElement.baseElement.toLowerCase().includes(searchLower)
    );
  }
}