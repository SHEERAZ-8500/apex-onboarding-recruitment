import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {

  // ✅ Projects Data with Status field
  projects = [
    { code: 'PR001', name: 'E-commerce Website', status: 'active' },
    { code: 'PR002', name: 'Mobile Banking App', status: 'active' },
    { code: 'PR003', name: 'Inventory Management', status: 'active' },
    { code: 'PR004', name: 'HR Management System', status: 'inactive' },
    { code: 'PR005', name: 'School Management', status: 'active' },
    { code: 'PR006', name: 'Hospital Management', status: 'active' },
    { code: 'PR007', name: 'Real Estate Portal', status: 'inactive' },
    { code: 'PR008', name: 'Food Delivery App', status: 'active' },
    { code: 'PR009', name: 'Social Media Platform', status: 'active' },
    { code: 'PR010', name: 'Fitness Tracking App', status: 'inactive' },
    { code: 'PR011', name: 'Online Learning Portal', status: 'active' },
    { code: 'PR012', name: 'Travel Booking System', status: 'active' },
    { code: 'PR013', name: 'Car Rental System', status: 'inactive' },
    { code: 'PR014', name: 'Event Management', status: 'active' },
    { code: 'PR015', name: 'Blog Platform', status: 'active' }
  ];

  // ✅ Form + State
  showForm = false;
  projectCode = '';
  projectName = '';
  projectStatus = '';
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
    return Math.ceil(this.filteredProjects().length / this.itemsPerPage);
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
  paginatedProjects() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProjects().slice(start, start + this.itemsPerPage);
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

  createProject() {
    if (!this.projectCode || !this.projectName || !this.projectStatus) return;

    this.projects.push({
      code: this.projectCode,
      name: this.projectName,
      status: this.projectStatus
    });

    this.hideForm();
  }

  // ✅ Edit
  editProject(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const project = this.projects[index];
    this.projectCode = project.code;
    this.projectName = project.name;
    this.projectStatus = project.status;
  }

  updateProject() {
    if (this.editIndex === null) return;

    this.projects[this.editIndex] = {
      code: this.projectCode,
      name: this.projectName,
      status: this.projectStatus
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteProject(index: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.projectCode = '';
    this.projectName = '';
    this.projectStatus = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredProjects() {
    if (!this.searchText.trim()) return this.projects;

    const searchLower = this.searchText.toLowerCase();
    return this.projects.filter(project =>
      project.code.toLowerCase().includes(searchLower) ||
      project.name.toLowerCase().includes(searchLower)
    );
  }
}