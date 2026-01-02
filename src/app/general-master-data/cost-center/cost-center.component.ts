import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss'],
})
export class CostCenterComponent {
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
        this.formTitle="Edit Cost Center"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Cost Center"


      }
    });
  }

  // ✅ Cost Centers Data (5 dummy values)
  costCenters = [
    { 
      code: 'CC001', 
      name: 'Administration', 
      effectiveDate: '2024-01-01',
      chargeableTo: 'Department A',
      includeInSalary: 'Yes',
      createdBy: 'Admin User'
    },
    { 
      code: 'CC002', 
      name: 'IT Department', 
      effectiveDate: '2024-02-15',
      chargeableTo: 'Department B',
      includeInSalary: 'No',
      createdBy: 'IT Manager'
    },
    { 
      code: 'CC003', 
      name: 'Human Resources', 
      effectiveDate: '2024-03-01',
      chargeableTo: 'Department C',
      includeInSalary: 'Yes',
      createdBy: 'HR Head'
    },

     { 
      code: 'CC002', 
      name: 'IT Department', 
      effectiveDate: '2024-02-15',
      chargeableTo: 'Department B',
      includeInSalary: 'No',
      createdBy: 'IT Manager'
    },
    { 
      code: 'CC003', 
      name: 'Human Resources', 
      effectiveDate: '2024-03-01',
      chargeableTo: 'Department C',
      includeInSalary: 'Yes',
      createdBy: 'HR Head'
    },
    { 
      code: 'CC004', 
      name: 'Finance', 
      effectiveDate: '2024-01-15',
      chargeableTo: 'Department D',
      includeInSalary: 'Yes',
      createdBy: 'Finance Director'
    },
    { 
      code: 'CC005', 
      name: 'Operations', 
      effectiveDate: '2024-04-01',
      chargeableTo: 'Department E',
      includeInSalary: 'No',
      createdBy: 'Operations Manager'
    }
  ];
 

  // ✅ Form + State
  showForm = false;
  code = '';
  name = '';
  effectiveDate = '';
  chargeableTo = '';
  includeInSalary = '';
  createdBy = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';


  // ✅ Dropdown Options
  chargeableToOptions = ['Department A', 'Department B', 'Department C', 'Department D', 'Department E'];
  includeInSalaryOptions = ['Yes', 'No'];

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
   paginatedCostCentersList: any[] = [];

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredCostCenters().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
    const filtered = this.filteredCostCenters();
    this.paginatedCostCentersList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }


  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-cost-center']);

  }

  createCostCenter() {
    if (!this.code || !this.name || !this.effectiveDate || !this.chargeableTo || !this.includeInSalary || !this.createdBy) return;

    this.costCenters.push({
      code: this.code,
      name: this.name,
      effectiveDate: this.effectiveDate,
      chargeableTo: this.chargeableTo,
      includeInSalary: this.includeInSalary,
      createdBy: this.createdBy
    });

    this.hideForm();
  }

  // ✅ Edit
  editCostCenter() {
  
        this.router.navigate(['/panel/general-master-data/edit-cost-center']);

  }

  updateCostCenter() {
    if (this.editIndex === null) return;

    this.costCenters[this.editIndex] = {
      code: this.code,
      name: this.name,
      effectiveDate: this.effectiveDate,
      chargeableTo: this.chargeableTo,
      includeInSalary: this.includeInSalary,
      createdBy: this.createdBy
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteCostCenter(index: number) {
    this.costCenters.splice(index, 1);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/general-master-data/view-all-cost-center']);

  }

  resetForm() {
    this.code = '';
    this.name = '';
    this.effectiveDate = '';
    this.chargeableTo = '';
    this.includeInSalary = '';
    this.createdBy = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredCostCenters() {
    if (!this.searchText.trim()) return this.costCenters;

    const searchLower = this.searchText.toLowerCase();
    return this.costCenters.filter(center =>
      center.code.toLowerCase().includes(searchLower) ||
      center.name.toLowerCase().includes(searchLower) ||
      center.chargeableTo.toLowerCase().includes(searchLower) ||
      center.createdBy.toLowerCase().includes(searchLower)
    );
  }
}