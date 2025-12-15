import { Component } from '@angular/core';

@Component({
  selector: 'app-gosiid',
  templateUrl: './gosiid.component.html',
  styleUrls: ['./gosiid.component.scss'],
})
export class GOSIIDComponent {

  // ✅ Data (with your required fields: code and name)
  items = [
    { code: 'GO001', name: 'Item One' },
    { code: 'GO002', name: 'Item Two' },
    { code: 'GO003', name: 'Item Three' },
    { code: 'GO004', name: 'Item Four' },
    { code: 'GO005', name: 'Item Five' },
    { code: 'GO006', name: 'Item Six' },
    { code: 'GO007', name: 'Item Seven' },
    { code: 'GO008', name: 'Item Eight' },
    { code: 'GO009', name: 'Item Nine' },
    { code: 'GO010', name: 'Item Ten' }
  ];

  // ✅ Form + State
  showForm = false;
  itemCode = '';
  itemName = '';
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
    return Math.ceil(this.filteredItems().length / this.itemsPerPage);
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
  paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems().slice(start, start + this.itemsPerPage);
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

  createItem() {
    if (!this.itemCode || !this.itemName) return;

    this.items.push({
      code: this.itemCode,
      name: this.itemName,
    });

    this.hideForm();
  }

  // ✅ Edit
  editItem(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    this.itemCode = this.items[index].code;
    this.itemName = this.items[index].name;
  }

  updateItem() {
    if (this.editIndex === null) return;

    this.items[this.editIndex] = {
      code: this.itemCode,
      name: this.itemName,
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteItem(index: number) {
    this.items.splice(index, 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.itemCode = '';
    this.itemName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredItems() {
    if (!this.searchText.trim()) return this.items;

    return this.items.filter(item =>
      item.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}