import { Component } from '@angular/core';

@Component({
  selector: 'app-id-type',
  templateUrl: './id-type.component.html',
  styleUrls: ['./id-type.component.scss'],
})
export class IdTypeComponent {
  idTypes = [
    { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
    // add more dummy data as needed
  ];

  showForm = false;
  idTypeCode = '';
  idTypeName = '';
  alertDays: number | null = null;
  isActive = true;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // Pagination
  currentPage = 1;
  pageSize = 8;

  get currentPageStart() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get totalPages() {
    return Math.ceil(this.filteredIdTypes().length / this.pageSize);
  }

  paginatedIdTypes() {
    return this.filteredIdTypes().slice(
      this.currentPageStart,
      this.currentPageStart + this.pageSize
    );
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  visiblePages() {
    let pages = [];
    if (this.totalPages <= 2) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.currentPage === 1) pages = [1, 2];
      else pages = [this.currentPage, Math.min(this.currentPage + 1, this.totalPages)];
    }
    return pages;
  }

  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createIdType() {
    if (!this.idTypeCode || !this.idTypeName || this.alertDays === null) return;
    this.idTypes.push({
      code: this.idTypeCode,
      name: this.idTypeName,
      alertDays: this.alertDays,
      isActive: this.isActive,
    });
    this.hideForm();
  }

  editIdType(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;
    const item = this.idTypes[index];
    this.idTypeCode = item.code;
    this.idTypeName = item.name;
    this.alertDays = item.alertDays;
    this.isActive = item.isActive;
  }

  updateIdType() {
    if (this.editIndex === null) return;
    this.idTypes[this.editIndex] = {
      code: this.idTypeCode,
      name: this.idTypeName,
      alertDays: this.alertDays!,
      isActive: this.isActive,
    };
    this.hideForm();
  }

  deleteIdType(index: number) {
    this.idTypes.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.idTypeCode = '';
    this.idTypeName = '';
    this.alertDays = null;
    this.isActive = true;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  filteredIdTypes() {
    if (!this.searchText.trim()) return this.idTypes;
    return this.idTypes.filter(
      (s) =>
        s.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
