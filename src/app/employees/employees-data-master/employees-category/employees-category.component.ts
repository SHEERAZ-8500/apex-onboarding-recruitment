import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-category',
  templateUrl: './employees-category.component.html',
  styleUrls: ['./employees-category.component.scss'],
})
export class EmployeesCategoryComponent {

  // ✅ Employee Categories Data
  categories = [
    { code: 'EC001', name: 'Permanent Full-Time' },
    { code: 'EC002', name: 'Contractual' },
    { code: 'EC003', name: 'Part-Time' },
    { code: 'EC004', name: 'Temporary' },
    { code: 'EC005', name: 'Intern' },
    { code: 'EC006', name: 'Probationary' },
    { code: 'EC007', name: 'Consultant' },
    { code: 'EC008', name: 'Seasonal' },
    { code: 'EC009', name: 'Freelance' },
    { code: 'EC010', name: 'Executive' },
    { code: 'EC011', name: 'Managerial' },
    { code: 'EC012', name: 'Supervisory' },
    { code: 'EC013', name: 'Technical Staff' },
    { code: 'EC014', name: 'Administrative Staff' },
    { code: 'EC015', name: 'Support Staff' }
  ];

  // ✅ Form + State
  showForm = false;
  categoryCode = '';
  categoryName = '';
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
    return Math.ceil(this.filteredCategories().length / this.itemsPerPage);
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
  paginatedCategories() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCategories().slice(start, start + this.itemsPerPage);
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

  createCategory() {
    if (!this.categoryCode || !this.categoryName) {
      alert('Please fill all required fields');
      return;
    }

    // Check if category code already exists
    const existingCode = this.categories.find(cat => cat.code === this.categoryCode);
    if (existingCode) {
      alert('Category Code already exists. Please use a different code.');
      return;
    }

    // Check if category name already exists
    const existingName = this.categories.find(cat => cat.name.toLowerCase() === this.categoryName.toLowerCase());
    if (existingName) {
      alert('Category Name already exists. Please use a different name.');
      return;
    }

    this.categories.push({
      code: this.categoryCode,
      name: this.categoryName
    });

    this.hideForm();
  }

  // ✅ Edit
  editCategory(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const category = this.categories[index];
    this.categoryCode = category.code;
    this.categoryName = category.name;
  }

  updateCategory() {
    if (this.editIndex === null || !this.categoryCode || !this.categoryName) {
      alert('Please fill all required fields');
      return;
    }

    // Check if category name already exists (excluding current item)
    const existingName = this.categories.find((cat, idx) => 
      idx !== this.editIndex && cat.name.toLowerCase() === this.categoryName.toLowerCase()
    );
    if (existingName) {
      alert('Category Name already exists. Please use a different name.');
      return;
    }

    this.categories[this.editIndex] = {
      code: this.categoryCode,
      name: this.categoryName
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteCategory(index: number) {
    if (confirm('Are you sure you want to delete this employee category?')) {
      this.categories.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.categoryCode = '';
    this.categoryName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredCategories() {
    if (!this.searchText.trim()) return this.categories;

    const searchLower = this.searchText.toLowerCase();
    return this.categories.filter(category =>
      category.code.toLowerCase().includes(searchLower) ||
      category.name.toLowerCase().includes(searchLower)
    );
  }
}