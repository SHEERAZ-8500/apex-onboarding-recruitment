import { Component } from '@angular/core';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
})
export class TrainingsComponent {
  trainings = [
    { code: 'T001', name: 'Angular Basics', provider: 'ABC Training', duration: 3, createdBy: 'Admin' },
    { code: 'T002', name: 'React Advanced', provider: 'XYZ Training', duration: 5, createdBy: 'Admin' }
  ];

  showForm = false;
  code = '';
  name = '';
  provider = '';
  duration: number | null = null;
  createdBy = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  currentPage = 1;
  itemsPerPage = 7;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredTrainings().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    const total = this.totalPages;
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    if (this.currentPage === 1) return [1, 2, 3];
    if (this.currentPage === total) return [total - 2, total - 1, total];
    return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
  }

  paginatedTrainings() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredTrainings().slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createTraining() {
    if (!this.code || !this.name || !this.provider || this.duration === null || !this.createdBy) return;
    this.trainings.push({
      code: this.code,
      name: this.name,
      provider: this.provider,
      duration: this.duration,
      createdBy: this.createdBy,
    });
    this.hideForm();
  }

  editTraining(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;
    const item = this.trainings[index];
    this.code = item.code;
    this.name = item.name;
    this.provider = item.provider;
    this.duration = item.duration;
    this.createdBy = item.createdBy;
  }

  updateTraining() {
    if (this.editIndex === null) return;
    this.trainings[this.editIndex] = {
      code: this.code,
      name: this.name,
      provider: this.provider,
      duration: this.duration!,
      createdBy: this.createdBy,
    };
    this.hideForm();
  }

  deleteTraining(index: number) {
    this.trainings.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.code = '';
    this.name = '';
    this.provider = '';
    this.duration = null;
    this.createdBy = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  filteredTrainings() {
    if (!this.searchText.trim()) return this.trainings;
    return this.trainings.filter(
      s =>
        s.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
