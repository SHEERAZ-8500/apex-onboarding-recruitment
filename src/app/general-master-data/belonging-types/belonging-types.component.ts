import { Component } from '@angular/core';

@Component({
  selector: 'app-belonging-type',
  templateUrl: './belonging-types.component.html',
  styleUrls: ['./belonging-types.component.scss'],
})
export class BelongingTypesComponent {

  // ✅ Belonging Types Data (5 dummy values)
  belongingTypes = [
    { code: 'BT001', name: 'Personal Items' },
    { code: 'BT002', name: 'Office Equipment' },
    { code: 'BT003', name: 'Company Vehicle' },
    { code: 'BT004', name: 'IT Equipment' },
    { code: 'BT005', name: 'Furniture' }
  ];

  // ✅ Form + State
  showForm = false;
  belongingTypeCode = '';
  belongingTypeName = '';
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
    return Math.ceil(this.filteredBelongingTypes().length / this.itemsPerPage);
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
  paginatedBelongingTypes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBelongingTypes().slice(start, start + this.itemsPerPage);
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

  createBelongingType() {
    if (!this.belongingTypeCode || !this.belongingTypeName) return;

    this.belongingTypes.push({
      code: this.belongingTypeCode,
      name: this.belongingTypeName,
    });

    this.hideForm();
  }

  // ✅ Edit
  editBelongingType(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    this.belongingTypeCode = this.belongingTypes[index].code;
    this.belongingTypeName = this.belongingTypes[index].name;
  }

  updateBelongingType() {
    if (this.editIndex === null) return;

    this.belongingTypes[this.editIndex] = {
      code: this.belongingTypeCode,
      name: this.belongingTypeName,
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteBelongingType(index: number) {
    this.belongingTypes.splice(index, 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.belongingTypeCode = '';
    this.belongingTypeName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredBelongingTypes() {
    if (!this.searchText.trim()) return this.belongingTypes;

    return this.belongingTypes.filter(type =>
      type.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      type.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}