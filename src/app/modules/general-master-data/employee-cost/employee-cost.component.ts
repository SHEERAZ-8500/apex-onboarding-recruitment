import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employee-cost',
  templateUrl: './employee-cost.component.html',
  styleUrls: ['./employee-cost.component.scss'],
})
export class EmployeeCostComponent {
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
        this.formTitle = "Edit Employee Cost"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Employee Cost"


      }
    });
  }

  // emloyee data
  employeeCosts = [
    { code: 'EC001', description: 'Basic Salary', fixed: true, amount: 50000 },
    { code: 'EC002', description: 'Transport Allowance', fixed: false, amount: 5000 },
    { code: 'EC003', description: 'Medical Allowance', fixed: true, amount: 3000 },
  ];



  showForm = false;
  code = '';
  description = '';
  fixed = true;
  amount: number | null = null;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  currentPage = 1;
  itemsPerPage = 7;
  paginatedEmployeeCostsList: any[] = [];



  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployeeCosts().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }



  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredEmployeeCosts();
    this.paginatedEmployeeCostsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }



  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/general-master-data/create-new-employee-cost']);

  }

  createEmployeeCost() {
    if (!this.code || !this.description || this.amount === null) return;
    this.employeeCosts.push({
      code: this.code,
      description: this.description,
      fixed: this.fixed,
      amount: this.amount,
    });
    this.hideForm();
  }

  editEmployeeCost() {
    this.router.navigate(['/panel/general-master-data/edit-employee-cost']);

  }

  updateEmployeeCost() {
    if (this.editIndex === null) return;
    this.employeeCosts[this.editIndex] = {
      code: this.code,
      description: this.description,
      fixed: this.fixed,
      amount: this.amount!,
    };
    this.hideForm();
  }

  deleteEmployeeCost(index: number) {
    this.employeeCosts.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }

    this.updatePagination();

  }

  cancelForm() {
    this.hideForm();
    this.router.navigate(['/panel/general-master-data/view-all-employee-cost']);

  }

  resetForm() {
    this.code = '';
    this.description = '';
    this.fixed = true;
    this.amount = null;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  filteredEmployeeCosts() {
    if (!this.searchText.trim()) return this.employeeCosts;
    return this.employeeCosts.filter(
      (s) =>
        s.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
