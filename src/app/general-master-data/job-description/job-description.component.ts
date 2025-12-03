import { Component } from '@angular/core';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss'],
})
export class JobDescriptionComponent {
  dummyValues = ['A', 'B', 'C', 'D', 'E'];

  jobDescs = [
    {
      code: 'A', name: 'John Doe', jobTitle: 'A', skillCode: 'A', skillDescription: 'Skill A',
      mandatory: true, qualificationCode: 'A', qualificationName: 'Qual A', department: 'A',
      location: 'A', createdBy: 'A'
    },
    {
      code: 'B', name: 'Jane Doe', jobTitle: 'B', skillCode: 'B', skillDescription: 'Skill B',
      mandatory: false, qualificationCode: 'B', qualificationName: 'Qual B', department: 'B',
      location: 'B', createdBy: 'B'
    }
  ];

  showForm = false;
  code = '';
  name = '';
  jobTitle = '';
  skillCode = '';
  skillDescription = '';
  mandatory = false;
  qualificationCode = '';
  qualificationName = '';
  department = '';
  location = '';
  createdBy = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  currentPage = 1;
  itemsPerPage = 7;

  get currentPageStart() { return (this.currentPage - 1) * this.itemsPerPage; }
  get totalPages() { return Math.ceil(this.filteredJobDescs().length / this.itemsPerPage); }
  get totalPagesArray() {
    const total = this.totalPages;
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    if (this.currentPage === 1) return [1, 2, 3];
    if (this.currentPage === total) return [total - 2, total - 1, total];
    return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
  }

  paginatedJobDescs() { return this.filteredJobDescs().slice(this.currentPageStart, this.currentPageStart + this.itemsPerPage); }

  changePage(page: number) { if (page < 1 || page > this.totalPages) return; this.currentPage = page; }

  onNew() { this.resetForm(); this.showForm = true; }

  createJobDesc() {
    if (!this.name || !this.skillDescription || !this.qualificationName) return;
    this.jobDescs.push({
      code: this.code, name: this.name, jobTitle: this.jobTitle, skillCode: this.skillCode, skillDescription: this.skillDescription,
      mandatory: this.mandatory, qualificationCode: this.qualificationCode, qualificationName: this.qualificationName,
      department: this.department, location: this.location, createdBy: this.createdBy
    });
    this.hideForm();
  }

  editJobDesc(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;
    const item = this.jobDescs[index];
    Object.assign(this, item);
  }

  updateJobDesc() {
    if (this.editIndex === null) return;
    this.jobDescs[this.editIndex] = {
      code: this.code, name: this.name, jobTitle: this.jobTitle, skillCode: this.skillCode, skillDescription: this.skillDescription,
      mandatory: this.mandatory, qualificationCode: this.qualificationCode, qualificationName: this.qualificationName,
      department: this.department, location: this.location, createdBy: this.createdBy
    };
    this.hideForm();
  }

  deleteJobDesc(index: number) {
    this.jobDescs.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() { this.hideForm(); }

  resetForm() {
    this.code = ''; this.name = ''; this.jobTitle = ''; this.skillCode = ''; this.skillDescription = '';
    this.mandatory = false; this.qualificationCode = ''; this.qualificationName = '';
    this.department = ''; this.location = ''; this.createdBy = '';
    this.isEdit = false; this.editIndex = null;
  }

  hideForm() { this.resetForm(); this.showForm = false; }

  filteredJobDescs() {
    if (!this.searchText.trim()) return this.jobDescs;
    return this.jobDescs.filter(s =>
      s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.skillDescription.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.qualificationName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
