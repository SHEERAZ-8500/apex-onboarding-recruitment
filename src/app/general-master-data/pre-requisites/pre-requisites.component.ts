import { Component } from '@angular/core';

@Component({
  selector: 'app-pre-requisites',
  templateUrl: './pre-requisites.component.html',
  styleUrls: ['./pre-requisites.component.scss']
})
export class PreRequisitesComponent {

  // ---------- Dummy Data ----------
  prereqList = [
    { name: 'Requirement A', isActive: true },
    { name: 'Requirement B', isActive: false },
    { name: 'Requirement C', isActive: true },
    { name: 'Requirement D', isActive: false },
    { name: 'Requirement E', isActive: true }
  ];

  // ---------- Form Fields ----------
  name: string = '';
  isActive: boolean = true;

  // ---------- UI State ----------
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;

  // ---------- Search ----------
  searchText: string = '';

  // ---------- Pagination ----------
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor() {}

  // -------------------------
  // Pagination Helpers
  // -------------------------
  get totalPages(): number {
    return Math.ceil(this.filteredPrereqs().length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  get currentPageStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  paginatedPrereqs() {
    const start = this.currentPageStart;
    return this.filteredPrereqs().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // -------------------------
  // SEARCH
  // -------------------------
  filteredPrereqs() {
    if (!this.searchText) return this.prereqList;

    return this.prereqList.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // -------------------------
  // CREATE NEW
  // -------------------------
  onNew() {
    this.showForm = true;
    this.isEdit = false;
    this.resetForm();
  }

  createPrereq() {
    const newItem = {
      name: this.name,
      isActive: this.isActive
    };

    this.prereqList.push(newItem);
    this.cancelForm();
  }

  // -------------------------
  // EDIT
  // -------------------------
  editPrereq(index: number) {
    this.editIndex = index;
    this.isEdit = true;
    this.showForm = true;

    const data = this.prereqList[index];
    this.name = data.name;
    this.isActive = data.isActive;
  }

  updatePrereq() {
    if (this.editIndex !== null) {
      this.prereqList[this.editIndex] = {
        name: this.name,
        isActive: this.isActive
      };
    }
    this.cancelForm();
  }

  // -------------------------
  // DELETE
  // -------------------------
  deletePrereq(index: number) {
    this.prereqList.splice(index, 1);
  }

  // -------------------------
  // FORM RESET & CANCEL
  // -------------------------
  cancelForm() {
    this.showForm = false;
    this.isEdit = false;
    this.editIndex = null;
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.isActive = true;
  }
}
