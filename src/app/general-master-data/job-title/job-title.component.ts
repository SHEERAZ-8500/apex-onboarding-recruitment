import { Component } from '@angular/core';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss'],
})
export class JobTitleComponent {

  // ✅ Job Titles Data (EXACT same structure as skills)
  jobTitles = [
    { code: 'JT001', title: 'Software Developer', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT002', title: 'Project Manager', workingHours: 9, trainingRequired: 'required' },
    { code: 'JT003', title: 'UI/UX Designer', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT004', title: 'Quality Analyst', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT005', title: 'System Administrator', workingHours: 9, trainingRequired: 'not required' },
    { code: 'JT006', title: 'Database Administrator', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT007', title: 'Network Engineer', workingHours: 9, trainingRequired: 'required' },
    { code: 'JT008', title: 'DevOps Engineer', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT009', title: 'Business Analyst', workingHours: 8, trainingRequired: 'not required' },
    { code: 'JT010', title: 'Technical Writer', workingHours: 7, trainingRequired: 'not required' },
  ];

  // ✅ Form + State (EXACT same structure as skills)
  showForm = false;
  jobTitleCode = '';
  jobTitle = '';
  workingHours = '';
  trainingRequired = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination (EXACT same structure as skills)
  currentPage = 1;
  itemsPerPage = 8;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredJobTitles().length / this.itemsPerPage);
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

  // ✅ Pagination Data (EXACT same method as skills)
  paginatedJobTitles() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJobTitles().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New (EXACT same method as skills)
  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createJobTitle() {
    if (!this.jobTitleCode || !this.jobTitle || !this.workingHours || !this.trainingRequired) return;

    this.jobTitles.push({
      code: this.jobTitleCode,
      title: this.jobTitle,
      workingHours: parseInt(this.workingHours),
      trainingRequired: this.trainingRequired
    });

    this.hideForm();
  }

  // ✅ Edit (EXACT same method as skills)
  editJobTitle(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    this.jobTitleCode = this.jobTitles[index].code;
    this.jobTitle = this.jobTitles[index].title;
    this.workingHours = this.jobTitles[index].workingHours.toString();
    this.trainingRequired = this.jobTitles[index].trainingRequired;
  }

  updateJobTitle() {
    if (this.editIndex === null) return;

    this.jobTitles[this.editIndex] = {
      code: this.jobTitleCode,
      title: this.jobTitle,
      workingHours: parseInt(this.workingHours),
      trainingRequired: this.trainingRequired
    };

    this.hideForm();
  }

  // ✅ Delete (EXACT same method as skills)
  deleteJobTitle(index: number) {
    this.jobTitles.splice(index, 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control (EXACT same methods as skills)
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.jobTitleCode = '';
    this.jobTitle = '';
    this.workingHours = '';
    this.trainingRequired = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter (EXACT same method as skills)
  filteredJobTitles() {
    if (!this.searchText.trim()) return this.jobTitles;

    return this.jobTitles.filter(jobTitle =>
      jobTitle.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jobTitle.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jobTitle.trainingRequired.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jobTitle.workingHours.toString().includes(this.searchText.toLowerCase())
    );
  }
}