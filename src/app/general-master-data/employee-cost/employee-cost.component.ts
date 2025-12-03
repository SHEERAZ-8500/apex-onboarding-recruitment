import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-cost',
  templateUrl: './employee-cost.component.html',
  styleUrls: ['./employee-cost.component.scss'],
})
export class EmployeeCostComponent {
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

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployeeCosts().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    const total = this.totalPages;
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    if (this.currentPage === 1) return [1, 2, 3];
    if (this.currentPage === total) return [total - 2, total - 1, total];
    return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
  }

  paginatedEmployeeCosts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployeeCosts().slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onNew() {
    this.resetForm();
    this.showForm = true;
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

  editEmployeeCost(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;
    const item = this.employeeCosts[index];
    this.code = item.code;
    this.description = item.description;
    this.fixed = item.fixed;
    this.amount = item.amount;
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
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() {
    this.hideForm();
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
